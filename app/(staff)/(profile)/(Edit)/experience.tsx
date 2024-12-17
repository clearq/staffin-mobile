import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/api/user'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { globalStyles } from '@/constants/globalStyles'
import { CardBody, CardFooter, CardHeader } from '@/components/Screen/ProfileUI/ProfileCard'

type experienceProps = {
  user: User
}

const StaffExperience = ({user}: experienceProps) => {
  return (
    <View>
      {user.experience && user.experience.map(exp => (
        <View key={exp.id}>
            <Text style={[globalStyles.subTitleText]}>
              {exp.position}                 
            </Text>

            <Text>
              {exp.companyName}
            </Text>

            <Text>
              {exp.startDate} - {exp.endDate ? exp.endDate : 'Ongoing'}
            </Text>
            
            <Text>
              {exp.location}
            </Text>

            <Text>
              {exp.description}
            </Text>
          
          </View>
      ))}
  
    </View>
  )
}

export default StaffExperience