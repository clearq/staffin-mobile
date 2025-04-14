import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllBranches } from '@/api/backend'

const page = () => {
  

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-branches"],
    queryFn: async () => {
      const response = getAllBranches()

      return response
    }
  })


  return (
    <View>
      {/* Branch component */}
    </View>
  )
}

export default page