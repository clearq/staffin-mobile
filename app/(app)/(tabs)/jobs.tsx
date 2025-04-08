import { View, Text } from 'react-native'
import React from 'react'
import Jobsindex from '@/components/Pages/Jobs'
import { useQuery } from '@tanstack/react-query';
import { getAllJobs } from '@/api/backend';
// import { IJob } from '@/types/JobTypes';

const Page = () => {
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
      {/* {data && data.map((item:IJob) => <Text key={item.id}>{item.title}</Text>)} */}
      <Jobsindex job={data}/>
    </View>
  )
}

export default Page