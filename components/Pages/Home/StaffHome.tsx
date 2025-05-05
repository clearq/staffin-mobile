import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostTemplate from '@/components/UI/PostTemplate'
import MachingJobsTemplate from '@/components/UI/MachingJobsTemplate'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts, getCompanyById, getMatchingJobs, getUserById, getUserPreferences } from '@/api/backend'
import Introduction from '@/components/Viewpager/Introduction'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { IPost } from '@/types'
import { theme } from '@/constants/Theme'
import { IMatchingJob } from '@/types/JobTypes'
import pageStyle from '@/constants/Styles'

const StaffHome = () => {
  const [openIntroduction, setOpenIntroduction] = useState(false)
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()
  const { t } = useTranslation();
  
  const { authState:{ userData, userId, token }, isLoading } = useAuth();

  const {data: matchJob = [], refetch: matchJobRefetch} = useQuery({
    queryKey: ["matching-jobs"],
    queryFn: async () => {
      return await getMatchingJobs()
    }
  })

  const {data: allPosts = [], isLoading: postsLoading, refetch: postsRefetch } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const response = await getAllPosts()
      // console.log('posts:', response.length);
      return response
    }
  })


  useEffect(() => {
    if(!userData) {
      setLoading(true)
    }

    if(
      userData?.firstName === "" ||
      userData?.lastName === "" ||
      matchJob?.length < 0
    ) {
      setOpenIntroduction(true)
    }

  },[])

  return (
    <View>
      {isLoading || loading &&  <ActivityIndicator color={theme.colors.primary} /> }     
        <>
        {openIntroduction && 
          <Introduction 
            onClose={() => setOpenIntroduction(!openIntroduction)}
          />
        }

        <ScrollView>  
          <View style={{flexDirection: 'column', gap: theme.spacing.md}}>
            {postsLoading && <ActivityIndicator color={theme.colors.primary} /> }
            {allPosts && !postsLoading && 
              [...allPosts]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // sort newest first
              .slice(0, 10) // take only the first 10
              .map((post: IPost) => (

                <View key={post.postId}>
                  <PostTemplate 
                    postId={post.postId}
                    authorId={post.userId}
                    post={post}
                    postsRefetch={postsRefetch}
                    postIsLoading={postsLoading}
                  />
                </View>
              ))
            } 
          </View>
          
          <View style={{...styles.titleContainer}}>
            <Text style={{...pageStyle.headline02, color: theme.colors.grey0}}>
              Title
            </Text>

            <TouchableOpacity>
              <Text
                style={{...styles.linkText, color: theme.colors.secondary, textDecorationColor: theme.colors.secondary}}
              >
                {t("see-more")}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{
              ...styles.row,
              paddingHorizontal: theme.spacing.md,
              flex: 1,
            }}
            horizontal={true}
          >
            {matchJob && 
              [...matchJob]
              .sort((a, b) => (b.matchScore) - (a.matchScore))
              .slice(0, 5)
              .map ((job: IMatchingJob) => (
                <View key={job.jobId}>
                  <MachingJobsTemplate 
                    job={job}
                  />
                </View>
              ))
            }
          </ScrollView>
        </ScrollView>
      </>  
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