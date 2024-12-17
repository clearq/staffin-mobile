import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/api/user'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { globalStyles } from '@/constants/globalStyles'
import { CardBody, CardFooter, CardHeader } from '@/components/Screen/ProfileUI/ProfileCard'

type educationProps = {
  user: User
}

const StaffEducations = ({user}:educationProps) => {
  return (
    <View>
      {user.educations && user.educations.map(edu => [
        <View key={edu.id}>
          <Text>
            {edu.name}                 
          </Text>

          <Text>
            {edu.institution}
          </Text>

          <Text>
            {edu.startDate} - {edu.endDate ? edu.endDate : 'Ongoing'}
          </Text>

        </View>
      ])}
    </View>
  )
}

export default StaffEducations