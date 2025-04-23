import { View, Text, ScrollView } from 'react-native'
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
  const [openIntroduction, setOpenIntroduction] = useState(true)
  const { theme } = useTheme()
  const { t } = useTranslation();
  
  const { authState:{ userData, userId } } = useAuth();

  const {} = useQuery({
    queryKey: ["user-prefere"],
    queryFn: async () => {
      const response = await getUserPreferences()

      return response
    }
  })

  const closeIntroduction = () => {
    console.log('close introduction');
    
  }
  
  const {data: matchingJobs = [], refetch, isLoading } = useQuery({
    queryKey: ["matching-job"],
    queryFn: async () => {
      const response = await getMatchingJobs()
      
      return response
    }
  })

  useEffect(() => {
    
  },[])

  return (
    <View>
      <Introduction 
        onClose={closeIntroduction}
      />

      <ScrollView>  
        <PostTemplate />
        <MachingJobsTemplate />
      </ScrollView>
    </View>
  )
}

export default StaffHome