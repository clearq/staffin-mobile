import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useAppSelector } from "@/store/reduxHooks";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { getUserPostsAndShares, Post } from '@/api/community';
import { generateCV } from '@/api/staff';

import ProfileHeader from '@/components/Screen/ProfileUI/ProfileHeader';

import { ActivityIndicator } from 'react-native-paper';
import { colors } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { globalStyles } from '@/constants/globalStyles';
import StaffOverview from '../(profile)/overview';
import StaffActivity from '../(profile)/activity';
import StaffDocuments from '../(profile)/documents';
import StaffProfileEdit from '../(profile)/edit';

type Menu = {
  id: number;
  title: string;
  screen: 'overview'|'activity'|'document'|'edit'
}

const staffProfileMenu:Menu []= [
  {
    id:1,
    title:'Overview',
    screen:'overview'
  },
  {
    id:2,
    title:'Activitiy',
    screen:'activity',
  },
  {
    id:3,
    title:'Document',
    screen:'document'
  },
  {
    id:4,
    title:'Edit',
    screen:'edit',
  },
]

const StaffProfile = () => {
  const { authUser, user, isLoading:userLoading, error:userError } = useAppSelector((state) => state.auth);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [screen, setScreen] = useState<Menu["screen"]>('overview')
  const [editSubScreen, setEditSubScreen] = useState<'information' | 'experience' | 'education'>('information');

  const token = authUser?.token

  const handleInfo = () => {
    setScreen('edit');
    setEditSubScreen('information'); 
  };

  const handleExperience = () => {
    setScreen('edit');
    setEditSubScreen('experience'); 
  };

  const handleEducation = () => {
    setScreen('edit');
    setEditSubScreen('education'); 
  };

  const handleGenerateCV = async () => {
    if (!token) {
      Alert.alert("Error", "No token found.");
      return;
    }
    try {
      const url = await generateCV(token);
      Alert.alert("Success", "CV generated successfully! You can download it from the link below.", [
        { text: "OK", onPress: () => console.log(url) }
      ]);
    } catch (err) {
      setError("Failed to generate CV.");
      Alert.alert("Error", error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Redux state - user Id:", user?.id)
  },[user, userLoading, userError])

  useEffect(() => {
    if (authUser && authUser.id && token) {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          setError(null);
          const fetchedPosts = await getUserPostsAndShares(authUser.id, token);
          setPosts(fetchedPosts);
        } catch (err) {
          console.error("Failed to fetch posts", err);
          setError("Failed to load posts.");
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [authUser, token]);
  
  if (userLoading || loading) {
    return <ActivityIndicator size="large" color={colors.primaryLight} />;
  }

  if (userError || error) {
    return <Text style={{color:colors.errorText}}>{userError || error}</Text>
  }

  if (!user) {
    return <Text>No user data available</Text>;
  }
  
  return (
    <View style={{flex:1}}>
      <ScrollView>
      
      { user !== null && !userLoading && !loading &&  (
  
        <View style={{flex:1}}>

          <ProfileHeader
            username={`${user.firstName} ${user.lastName}`}
            title={user.title}
            image={user.profileImage || null}
            isCurrentUser={true}
          />

          {/* Menu */}
          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:16, marginBottom:8 }}>
            {staffProfileMenu.map(menu => (
              <TouchableOpacity 
                key={menu.id}
                onPress={() => setScreen(menu.screen)}
                style={{
                  flex:1/4,
                  backgroundColor:colors.white, 
                  paddingTop:8,
                  justifyContent:'space-between',
                  flexDirection:'column',
                  alignItems:'center'
                }}
              >
                <Text style={{
                  marginVertical:8,
                  color: menu.screen === screen 
                    ? colors.secondary
                    : colors.gray,
                  fontSize:14,
                  fontFamily: menu.screen === screen
                    ? 'Inter-Medium'
                    : 'Inter-Regular'
                }}>
                  {menu.title}
                </Text>
                {menu.screen === screen &&
                  <View 
                    style={{
                      borderWidth:2, 
                      borderColor:colors.secondary,
                      width:'100%'
                    }}
                  />
                }
              </TouchableOpacity>
            ))}
          </View>

          <View style={{paddingVertical:8, flex:1}}>
            {screen === 'overview' &&
              <StaffOverview 
                user={user}
                posts={posts}
                handleInfo={handleInfo}
                handleExperience={handleExperience}
                handleEducation={handleEducation}
              />
            }
            {screen === 'activity' &&
              <StaffActivity
                posts={posts} 
              />
            }
            {screen === 'document' &&
              <StaffDocuments
                token={token} 
              />
            }
            {screen === 'edit' && token &&
              <StaffProfileEdit 
                user={user}
                initialScreen={editSubScreen} 
                token={token}
              />
            }
          </View>

        </View>
      )}
      </ScrollView>

      {screen === 'overview' &&
        <TouchableOpacity 
          style={[styles.cvBtn]}
          onPress={handleGenerateCV}
        >
          <MaterialCommunityIcons name='file-download-outline' size={24} color={colors.white} />
          <Text style={[globalStyles.subTitleText, {color:colors.white}]}>CV</Text>
        </TouchableOpacity>
      }

    </View>
  )
}

export default StaffProfile

const styles = StyleSheet.create({
  cvBtn:{
    width:64,
    height:64,
    backgroundColor:colors.black,
    borderRadius:'100%',
    position:'absolute',
    bottom:32,
    right:16,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  }
})