import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchUser } from '@/store/slice/userSlice';
import { useAppDispatch } from '@/store/reduxHooks';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from 'dayjs';

import { LinearGradient } from 'expo-linear-gradient'
import {ProfileCard, ProfileCardFotter, ProfileCardAdd} from '../../../components/UI/profileCards';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyle';
import { fetchUserPosts } from '@/store/slice/communitySlice';
import { StarRatingReadOnly } from '@/components/UI/StarRating';
import { UserIconProfile } from '@/components/UI/UserIcons';

interface UserProfileProps {
  userId: number
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    gap:8,
    width: '100%',
  },
  col:{
    flex:1,
    flexDirection:'column',
    gap:8,
    width:'100%'
  },
  rowWrap:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    gap:8,
  },
  skillButton:{
    backgroundColor:`${Colors.primaryLight}`,
    padding:8,
    borderRadius:4
  },
  headerCcontainer:{
    width:'100%',
    margin:0,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  layout:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:16,
  },
  menuContainer:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    padding:16, 
    marginTop: 16,
  },
})


const UserProfile = ({userId}: UserProfileProps) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError } = useSelector((state: RootState) => state.user);
  const authData = useSelector((state: RootState) => state.auth); 
  const { userPosts } = useSelector((state: RootState) => state.feed)

  const menus = [  
    {
      id:1,
      title: 'Overview',
      link: '/'
    },
    {
      id:2,
      title: 'Activity',
      link: '/'
    },
    {
      id:3,
      title: 'Document',
      link: '/'
    },
    {
      id:4,
      title: 'Edit',
      link: '/'
    },    
  ]

  
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
      dispatch(fetchUserPosts(userId)); 
    }
  }, [userId, dispatch]);
  
  return (
    <>
      {userData && 
        <>
          {/* Header and menu */}
          <ProfileHeader 
            name= {`${userData?.firstName} ${userData?.lastName}`}
            title={userData?.title}
            menus= {menus}
            userId={userId}
          />

          {/* User Information */}
          <ProfileCard
            title='User Information' 
            cardBody= {(
              <View style={styles.col}>
                <View style={styles.row}>
                  <MaterialCommunityIcons name='account-outline' size={16} color={Colors.textGray}/>
                  <Text style={globalStyles.fontSemibold}>Full Name:</Text>
                  <Text>{userData?.firstName} {userData?.lastName}</Text>
                </View>

                <View style={styles.row}>
                  <MaterialCommunityIcons name='map-marker' size={16} color={Colors.textGray}/>
                 <Text style={globalStyles.fontSemibold}>Location:</Text>
                 <Text>{userData?.city}</Text>
                </View>

                <View style={styles.row}>
                  <MaterialCommunityIcons name='email-outline' size={16} color={Colors.textGray}/>
                  <Text style={globalStyles.fontSemibold}>Email:</Text>
                  <Text>{userData?.email}</Text>
                </View>

              </View>
            )}
            handleEdit={() => {}}
          />

          {/* About */}
          <ProfileCard 
            title='About'
            cardBody={(
              <View>
                <Text>{userData?.about}</Text>
              </View>
            )}
            handleEdit={() => {}}
          />

          {/* Activity */}
          <ProfileCardFotter 
            title='Activity'
            cardBody={(
              <View style={styles.col}>
                {userPosts && userPosts
                .slice(0, 3)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(post => (
                  <View 
                    key={post.postId} 
                    style={[styles.row, {alignItems: 'flex-start' }]} 
                  >
                    <View style={[{flex:1, gap:8}]}>
                      <Text 
                        numberOfLines={expanded ? undefined : 2} 
                        style={{ width:'100%'}}
                      >
                        {post.content} 
                      </Text>

                      {!expanded && post.content.length > 0 && (
                        <TouchableOpacity onPress={() => setExpanded(true)}>
                          <Text 
                            style={{
                              color: Colors.primary, 
                              textDecorationLine: 'underline', 
                              textDecorationColor: Colors.primary
                            }}
                          >
                            ...Read more
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {post.image && (
                      <View>
                        <Image 
                          source={{ uri: post.image }} 
                          style={{ width: 80, height: 80, marginLeft: 8 }} 
                        />
                      </View>
                    )}
                    
                  </View>
                ))}
              </View>
            )}
            footerText='See All Activities'
          />


          {/* Experience */}
          <ProfileCardAdd
            title='Experience'
            cardBody={(
              <View style={styles.col}>
                {userData.experience.map(exp => 
                  <View key={exp.id} style={styles.col}>

                    <View style={{flexDirection:'column', gap:0,}}>
                      <Text style={[globalStyles.fontSemibold, {fontSize:16}]}>
                        {exp.position}
                      </Text>
                  
                      <Text style={[globalStyles.textSm,]}>
                        {exp.companyName}
                      </Text>

                      <Text style={[globalStyles.textSm, {color:`${Colors.textGray}`}]}>
                        {exp.location}
                      </Text> 

                    </View>

                    <Text>{exp.description}</Text>
                    <Text style={[globalStyles.textSm, {color:`${Colors.textGray}`}]}>
                      {dayjs(exp.startDate).format('YYYY-MM-DD')} - {dayjs(exp.endDate).format('YYYY-MM-DD')}
                    </Text>

                    <View style={[globalStyles.divider]} />
                  </View>
                )}

              </View>
            )}
            handleEdit={() => {console.log('edit Experience');
            }}
            handleAdd={() => {console.log('add Experience');
            }}
          />

          {/* Education */}
          <ProfileCardAdd
            title='Education'
            cardBody={(
              <View>
                 {userData.educations.map(education => 
                    <View key={education.id}>
                      <Text>Institution: {education.institution}</Text>
                      <Text>Name:{education.name}</Text>
                      <Text>Date: {dayjs(education.startDate).format('YYYY-MM-DD')} - {dayjs(education.endDate).format('YYYY-MM-DD')}</Text>
                    </View>
                  )}

              </View>
            )}
            handleEdit={() => {console.log('edit Education');
            }}
            handleAdd={() => {console.log('add Education');
            }}
          />
        
          {/* Skills */}
          <ProfileCardAdd
            title='Skills'
            cardBody={(
              <View style={styles.rowWrap}>
                {userData.skills.map(skill => 
                  <View key={skill.id} style={styles.skillButton}>
                    <Text>{skill.name}</Text>
                  </View>
                )}
              </View>
            )}
            handleEdit={() => {console.log('edit Skills');
            }}
            handleAdd={() => {console.log('add Skills');
            }}
          />

          {/* Languages */}
          <ProfileCardAdd
            title='Languages'
            cardBody={(
              <View style={styles.col}>
                {userData.languages
                .slice() // 配列をコピー
                .sort((a, b) => b.rating - a.rating) // コピーした配列をソート
                .map((language) => (
                  <View key={language.id} style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Text>{language.name}</Text>
                    <StarRatingReadOnly rating={language.rating} />
                  </View>
                ))}
              </View>
            )}
            handleEdit={() => {console.log('edit Skills');
            }}
            handleAdd={() => {console.log('add Skills');
            }}
          />
        </>
      }
    </>
  )
}

export default UserProfile



// Header
interface MenuItem {
  id: number;
  title: string;
  link: string;
}

interface prorps {
  name: string
  title?: string 
  menus:MenuItem[]
  userId:number
}

const ProfileHeader = ({name, title, menus, userId}: prorps) => {
  return (
    <View style={{flexDirection:'column',}}>
      <View
        style={[styles.headerCcontainer, {height:120}]}
      >
        <LinearGradient 
          colors={[`${Colors.primaryLight}`, `${Colors.secondary}`]}
          style={styles.background}
          start={{ x: 0, y: 0}}
          end={{x: 1, y: 1}}
        >
          <View style={[styles.layout]}>

            <View style={{flexDirection:'row', alignItems:'flex-end', gap:16}}>
              <UserIconProfile userId={userId}/>

              <View style={{flexDirection:'column', alignItems:'baseline'}}>
                <Text style={[globalStyles.titleText]}>
                  {name}
                </Text>
                {title &&
                  <Text style={[globalStyles.textSm,]}>
                    {title}
                  </Text>
                }
              </View>

            </View>
          </View>
        </LinearGradient>
      </View>

    
      {/* Menu */}
      <View style={[styles.headerCcontainer, styles.menuContainer]}>
        {menus && menus.map(menu => 
          <Text key={menu.id}>{menu.title}</Text>
        )}
       
      </View>
    </View>
  )
}