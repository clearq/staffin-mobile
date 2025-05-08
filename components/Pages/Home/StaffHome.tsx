import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostTemplate from '@/components/UI/PostTemplate'
import MachingJobsTemplate from '@/components/UI/MachingJobsTemplate'
import { useQuery } from '@tanstack/react-query'
import { follow, getFeed, getFollower, getFollowing, getMatchingJobs, getSuggestedUsers, unfollow } from '@/api/backend'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { IPost } from '@/types'
import { theme } from '@/constants/Theme'
import { IMatchingJob } from '@/types/JobTypes'
import pageStyle from '@/constants/Styles'
import SuggestedUserTemplate from '@/components/UI/SuggestedUserTemplate'
import { useRefreshControl } from '@/hooks/useRefreshControl'
import { checkOnBoardingStatus } from '@/api/backend/user'
import { useRouter } from 'expo-router'
import Onboarding from './Onboarding'
import { useUserData } from '@/hooks/useUserData'

export interface ISuggestedUser {
  userId: number;
  fullName: string;
  location: string;
  title: string;
  profileImage: string;
}

const StaffHome = () => {
  const [openIntroduction, setOpenIntroduction] = useState(false)
  const [loading, setLoading] = useState(false)
  const [followed, setFollowed] = useState(false)
  const { refreshing, onRefresh } = useRefreshControl();

  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()
  
  
  const { authState:{ userData, userId, token }, isLoading } = useAuth();

  const {
      data: user,
      refetch: userRefetch,
      isLoading: userIsLoading,
      isPending,
    } = useUserData(Number(userId));

  const { data: onBoarding } = useQuery({
    queryKey: ['check-onboarding', userId],
    queryFn: async () => {
      const response = await checkOnBoardingStatus(Number(userId))
      return response
    },
    enabled: !! userId,
  })

  const {data: matchJob = [], refetch: matchJobRefetch} = useQuery({
    queryKey: ["matching-jobs"],
    queryFn: async () => {
      return await getMatchingJobs()
    }
  })

  const {data: feed = [], isLoading: postsLoading, refetch: postsRefetch } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      if (isLoading) { 
        return(
          <ActivityIndicator color={theme.colors.primary} size={24} />
        )
      }

      if(!isLoading && userId) {
        const response = await getFeed()
        return response
      }
    }
  })

  const {data: suggestedUsers = [], isLoading: suggestedUsersLoading, refetch:suggestedUsersRefetch} = useQuery({
    queryKey: ["suggested-users"],
    queryFn: async () => {
      const response = await getSuggestedUsers()
      // console.log(response);
      return response
    }
  })

  const {data: following = []} = useQuery({
    queryKey: ["follow", userId],
    queryFn: async () => {
      const id = Number(userId)
      return await getFollowing(id)
    }
  })

  const handleFollowAction = async (id: number) => {
    if(followed === true) {
      await unfollow(id)
      setFollowed(false)
      postsRefetch()
    } else {
      await follow(id)
      setFollowed(true)
      postsRefetch()
    }
  }  


  useEffect(() => {
    if (onBoarding) {
      //console.log('Onboarding complete?', onBoarding.isCompleted);
      setOpenIntroduction(!onBoarding.isCompleted)
    }
        
  },[onBoarding])

  return (
    <View>
      {isLoading || loading &&  <ActivityIndicator color={theme.colors.primary} /> }     
        {openIntroduction && 
          <View style={{backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black}}>

            <Onboarding
              user={user}
              refetch= {userRefetch}
              visible={openIntroduction}
              onClose={() => setOpenIntroduction(!openIntroduction)}
            />
            
          </View>
        }
        {!openIntroduction && 
          <ScrollView 
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          > 
            {/* Posts  */}
            <View style={{flexDirection: 'column', gap: theme.spacing.md}}>
              {postsLoading && <ActivityIndicator color={theme.colors.primary} /> }
              {feed && !postsLoading && 
                [...feed]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // sort newest first
                .slice(0, 10) // take only the first 10
                .map((post: IPost, index) => (

                  <View key={`${post.postId}${index}`}>
                    <PostTemplate 
                      post={post}
                      postsRefetch={postsRefetch}
                      postIsLoading={postsLoading}
                      handleFollowAction={() => handleFollowAction(post.userId)}
                      following={following}
                    />
                  </View>
                ))
              } 
            </View>

            {/* Jobs */}
            <View style={{marginVertical: theme.spacing.lg}}>
              <View style={{...styles.titleContainer}}>
                <Text style={{...pageStyle.headline02, color: theme.colors.grey0}}>
                  {t("job-picks-for-you")}
                </Text>

                <TouchableOpacity
                  onPress={() => router.replace('/jobs')}
                >
                  <Text
                    style={{...styles.linkText, color: theme.colors.secondary, textDecorationColor: theme.colors.secondary}}
                  >
                    {t("see-more")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <ScrollView
                  style={{
                    ...styles.row,
                    paddingVertical: theme.spacing.md,
                    paddingHorizontal: theme.spacing.md,
                  }}
                  horizontal={true}
                  snapToInterval={1}
                >
                  {matchJob && 
                    [...matchJob]
                    .sort((a, b) => (b.matchScore) - (a.matchScore))
                    .slice(0, 5)
                    .map ((job: IMatchingJob) => (
                      <View key={job.jobId}>
                        <MachingJobsTemplate 
                          job={job}
                          refetch={matchJobRefetch}
                        />
                      </View>
                    ))
                  }
                  <View style={{width: 36,  backgroundColor: 'transparent'}} />
                </ScrollView>
              </View>
            </View>
            
            {/* People */}
            <View>
              <View style={{...styles.titleContainer}}>
                <Text style={{...pageStyle.headline02, color: theme.colors.grey0}}>
                  {t("suggest-network")}
                </Text>

                <TouchableOpacity>
                  <Text
                    style={{...styles.linkText, color: theme.colors.secondary, textDecorationColor: theme.colors.secondary}}
                  >
                    {t("see-more")}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <View>
                <ScrollView
                  style={{
                    ...styles.row,
                    paddingVertical: theme.spacing.md,
                    paddingHorizontal: theme.spacing.md,
                  }}
                  horizontal={true}
                  snapToInterval={1}
                >
                  {suggestedUsers && 
                    [...suggestedUsers]
                    .slice(0, 5)
                    .map ((user: ISuggestedUser) => (
                      <View key={user.userId}>
                        <SuggestedUserTemplate 
                          user={user}
                          following={following}
                        />
                      </View>
                    ))
                  }
                  <View style={{width: 36,  backgroundColor: 'transparent'}} />
                </ScrollView>
              </View>
              
            </View>

          </ScrollView>
        }
    </View>
  )
}

export default StaffHome

const styles = StyleSheet.create({
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md
  },
  titleContainer: {
    marginTop: theme.spacing?.lg,
    marginBottom: theme.spacing?.sm,
    paddingHorizontal: theme.spacing?.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    textDecorationLine: "underline"
  }
})