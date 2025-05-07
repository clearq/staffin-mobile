import { View, Text } from 'react-native'
import React from 'react'
import Jobsindex from '@/components/Pages/Jobs'
import { useQuery } from '@tanstack/react-query';
import { getAllJobs } from '@/api/backend';
import { useTheme } from '@rneui/themed';
import { useAuth } from '@/contexts/authContext';
// import { IJob } from '@/types/JobTypes';

const Page = () => {
  const { theme } = useTheme();
  const { authState: { userData, userId }, isLoading, } = useAuth();

  // Get User Info
  const { 
    data = [], 
    refetch: jobRefetch, 
    isLoading: jobIsLoading, 
    isPending,    
  } = useQuery({
    queryKey: ["jobs-data"],
    queryFn: async () => {
      const response = await getAllJobs()
      return response;
    },      
    
  });


  
  return (
    <View>
      {userData?.roleId === 3 && 
        <Jobsindex job={data} refetch={jobRefetch}/>
      }
      {userData?.roleId === 1 &&
        <Text>Job Application Management</Text>
      }
    </View>
  )
}

export default Page