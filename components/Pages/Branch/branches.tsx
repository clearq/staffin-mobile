import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllBranches } from '@/api/backend'

const Branches = () => {

  return (
    <View>
      <Text>Branches</Text>
    </View>
  )
}

export default Branches