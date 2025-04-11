import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllBranches } from '@/api/backend'
import Branches from '@/components/Pages/Branch/branches'

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
      <Branches />
    </View>
  )
}

export default page