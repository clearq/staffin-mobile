import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostTemplate from '@/components/UI/PostTemplate'
import MachingJobsTemplate from '@/components/UI/MachingJobsTemplate'
import { useQuery } from '@tanstack/react-query'
import { getMatchingJobs, getUserPreferences } from '@/api/backend'
import Introduction from '@/components/Viewpager/Introduction'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'

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
            <PostTemplate />
            <MachingJobsTemplate />
          </ScrollView>
        </>  
    </View>
  )
}

export default StaffHome