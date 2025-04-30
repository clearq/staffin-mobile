import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/contexts/authContext';
import { Avatar, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import pageStyle from '@/constants/Styles';
import { theme } from '@/constants/Theme';
import { generateCv, getUserById, getUserPostsAndShares } from '@/api/backend';
import { fetchImageFromCDN } from '@/utils/CDN-action';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hexToRgba } from '@/utils/rgba-to-hex';
import { MessageModal } from '@/components/Modal/MessageModal';
import { useToast } from 'react-native-toast-notifications';
import StaffProfileIndex from '@/components/Pages/TabsComponents/Profile/StaffProfile';
import AdminProfileIndex from '@/components/Pages/TabsComponents/Profile/AdminProfile';


const Page = () => {
  const [userInfoMessage, setUserInfoMessage] = useState(false)
  const [pending, setPending] = useState(false)
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  
  const { 
    authState:{ 
      userData, 
      userId,
    } ,
  } = useAuth();

  // Get User Info
  const { 
    data: user, 
    refetch: userRefetch, 
    isLoading: userIsLoading, 
    isPending,    
  } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response = await getUserById(userId!)      

      return response;
    },
    enabled: !!userId,
  });

  // Get Users Posts
  const {
    data: userPosts = [],
    refetch: userPostsRefetch,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      if (userId) {
        const response = await getUserPostsAndShares(userId)
        // console.log('kör i profile: getUserPostnaShare');
        
        return response
      }
      return []
    },
    enabled: !!userId,
  })

  useEffect(() => {
    // console.log('id:', userId);
    // console.log('user', userData?.id, userData?.roleId);    
  }, [userId])

  const handleCreateCv = async () => {
    if(user.firstName === "" && user.lastName === '' && user.phoneNumber === '') {
      setUserInfoMessage(true)
    }

    try {
      setPending(true)
      const response = await generateCv();
      
      if (response?.url) {
        // Open the URL in browser to download the CV
        // Linking.openURL(response.url);      
        toast.show(`${t("success-generate-cv-message")}`, {
          type: "success"
        });

        setPending(false)
      } else {
        throw new Error(`${t("no-url-message")}`);
      }
    } catch (error) {
      toast.show(`${"failed-generate-cv-message"}`, {
        type: "error"
      });
      setPending(false)
    }
  }
    
    // console.log('user', user);
    
  return (
    <View
      style={{
        backgroundColor: theme.colors.background
      }}
    >
      { isPending && userIsLoading && postIsLoading &&(
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      { user && !userIsLoading && !postIsLoading &&
        <ScrollView>       

          {/* staff profile */}
          
          { userData?.roleId === 3 && 
            <StaffProfileIndex
              user={user} 
              showEditButton={ user.id === userId }
              post={userPosts}
              refetch = {() => userRefetch()}
            />
          }

          {/* admim|company profile */}
          { userData?.roleId === 1 &&
            <AdminProfileIndex 
              user={user}
              showEditButton={ user.id === userId}
              post={userPosts}
              refetch={() => userRefetch()}
            />
          }

        </ScrollView>
      }

      {user?.roleId === 3 &&       
        <CreateCvButton 
          pending= {pending}
          onPress={handleCreateCv}
        />
      }

      { userInfoMessage && 
        <MessageModal  
          visible={userInfoMessage} 
          onClose={() => setUserInfoMessage(false)}
        />
      }
    </View>
  )
}

export default Page

interface props {
  onPress: () => void
  pending: boolean
}

const CreateCvButton = ({onPress, pending}:props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return(
    <TouchableOpacity
      style={{
        ...styles.cvButton,
        backgroundColor:(theme.colors.secondary),
      }}
      onPress={onPress}
    >
      {pending 
        ? (
          <ActivityIndicator color={theme.colors.white}/>
        ) : (
          <View style={{...styles.buttonItem}}>
            <MaterialCommunityIcons name='file-download-outline' size={36} color={theme.colors.white} />
            <Text style={{...pageStyle.button16, color: theme.colors.white}}>CV</Text>
          </View>
        )
      }
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  cvButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    position: 'absolute',
    right: theme.spacing?.xl,
    bottom: theme.spacing?.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonItem: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }
});