import { View, Text } from 'react-native'
import React from 'react'
import { EducationData } from '@/api/staff'

type props = {
  onClose: () => void
  token?: string
  edu:EducationData
  handleSuccess: ()=> void
}

const EditEducation = ({onClose, token, edu, handleSuccess}:props) => {
  return (
    <View>
      <Text>EditEducation</Text>
    </View>
  )
}

export default EditEducation