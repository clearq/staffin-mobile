import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import MachingJobsTemplate from '@/components/UI/MachingJobsTemplate'
import { useQuery } from '@tanstack/react-query'
import { follow, getFeed, getFollower, getFollowing, getMatchingJobs, getSuggestedUsers, unfollow } from '@/api/backend'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { IMatchingJob, IPost, IUser } from '@/types'
import { theme } from '@/constants/Theme'
import pageStyle from '@/constants/Styles'
import SuggestedUserTemplate from '@/components/UI/SuggestedUserTemplate'
import { useRefreshControl } from '@/hooks/useRefreshControl'
import { checkOnBoardingStatus } from '@/api/backend/user'
import { useRouter } from 'expo-router'
import Onboarding from './Onboarding'
import { useUserData } from '@/hooks/useUserData'
import { usePostLike } from '@/hooks/usePostLike'
import { useFollow } from '@/hooks/useFollow'
import PostCard from '@/components/PostComponent/PostCard'

export interface ISuggestedUser {
  userId: number;
  fullName: string;
  location: string;
  title: string;
  profileImage: string;
}

interface props {
  currentUser: IUser;
  currentUserId: number;
  token: string;
  isLoading: boolean;
}

const StaffHome = ({currentUser, currentUserId, token, isLoading}: props) => {
  // const [openIntroduction, setOpenIntroduction] = useState(false)
  const [loading, setLoading] = useState(false)
  const { refreshing, onRefresh } = useRefreshControl();
  const [openPostDetail, setOpenPostDetail] = useState(false)
  
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()
  

  // const { data: onBoarding } = useQuery({
  //   queryKey: ['check-onboarding', currentUserId],
  //   queryFn: async () => {
  //     const response = await checkOnBoardingStatus(currentUserId)
  //     return response
  //   },
  //   enabled: !! currentUserId,
  // })

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

      if(!isLoading && currentUserId) {
        const response = await getFeed({page:1, pageSize: 5})
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


  // useEffect(() => {
  //   if (onBoarding) {
  //     //console.log('Onboarding complete?', onBoarding.isCompleted);
  //     setOpenIntroduction(!onBoarding.isCompleted)
  //   }
  // },[token])

  return (
    <View>
      {isLoading || loading &&  <ActivityIndicator color={theme.colors.primary} /> }     
        

        
          <ScrollView 
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          > 

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
                    matchJob
                      .sort((a: IMatchingJob, b: IMatchingJob) => b.matchScore - a.matchScore)
                      .slice(0, 5)
                      .map((job: IMatchingJob) => (
                        <View key={job.jobId}>
                          <MachingJobsTemplate job={job} refetch={matchJobRefetch} />
                        </View>
                    ))}
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
                    suggestedUsers
                    .slice(0, 5)
                    .map((user: ISuggestedUser) => (
                      <View key={user.userId}>
                        <SuggestedUserTemplate user={user} />
                      </View>
                    ))}
                  <View style={{width: 36,  backgroundColor: 'transparent'}} />
                </ScrollView>
              </View>
              
            </View>

             {/* Posts */}
              <View style={{ flexDirection: "column", gap: theme.spacing.md }}>
                {postsLoading && (
                  <ActivityIndicator color={theme.colors.primary} />
                )}
                {feed &&
                  !postsLoading &&
                  feed
                    .sort(
                      (a: IPost, b: IPost) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((post: IPost) => (
                      <View key={post.postId}>
                        <PostCard
                          post={post}
                          isCurrentUser={post.userId === currentUserId}
                        />
                      </View>
                    ))}
              </View>

          </ScrollView>
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