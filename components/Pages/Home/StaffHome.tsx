import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostTemplate from '@/components/UI/PostTemplate'
import MachingJobsTemplate from '@/components/UI/MachingJobsTemplate'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts, getMatchingJobs, getUserById, getUserPreferences } from '@/api/backend'
import Introduction from '@/components/Viewpager/Introduction'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { IPost } from '@/types'
import { theme } from '@/constants/Theme'

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
      console.log('posts:', response.length);
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
            <View
            >
              {postsLoading && <ActivityIndicator color={theme.colors.primary} /> }
              {allPosts && !postsLoading && 
                allPosts.map((post: IPost) => (
                  <View key={post.postId}>
                    <PostTemplate 
                      postId={post.postId}
                      authorId={post.userId}
                    />
                  </View>
                ))
              } 
            </View>
           
            <MachingJobsTemplate />
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
  }
})