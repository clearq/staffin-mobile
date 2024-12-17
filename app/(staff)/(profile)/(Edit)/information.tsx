import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/api/user'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { globalStyles } from '@/constants/globalStyles'
import { CardBody, CardFooter, CardHeader } from '@/components/Screen/ProfileUI/ProfileCard'

type infoProps = {
  user: User
}

const StaffInformation = ({user}: infoProps) => {
  return (
    <View>
      <Text>First name</Text>
      <Text>{user.firstName}</Text>

      <Text>Last name</Text>
      <Text>{user.lastName}</Text>
      
      <Text>Address</Text>
      <Text>{user.street}</Text>
      
      <Text>City</Text>
      <Text>{user.city}</Text>
      
      <Text>Zip code</Text>
      <Text>{user.postalCode}</Text>
      
      <Text>Country</Text>
      <Text>{user.country}</Text>

      <Text>Phone number</Text>
      <Text>{user.phoneNumber}</Text>

      <Text>Email</Text>
      <Text>{user.email}</Text>
      
      <Text>About</Text>
      <Text>{user.about}</Text>

    </View>
  )
}

export default StaffInformation