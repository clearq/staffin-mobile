import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { User } from '@/api/user'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/Colors'
import { globalStyles } from '@/constants/globalStyles'
import { CardBody, CardFooter, CardHeader } from '@/components/Screen/ProfileUI/ProfileCard'
import { useAppSelector } from '@/store/reduxHooks'

type educationProps = {
  user: User
}

const StaffEducations = ({user}:educationProps) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState<boolean>(false)
  
    const handleAddEducation = () => {
      setOpenModal(true)
      console.log('open modal');
    }
  
    const handleEdit = () => {
      console.log('edit education'); 
    }

    
  return (
    <View style={[styles.cardContainer]}>
      <CardHeader 
        title='Educations'
        isCurrentUser={authUser?.id === user.id}
        handlePress={handleAddEducation}
        headerIcon='plus'
      />
      <CardBody>
        <View style={[{flexDirection:'column', gap:8}]}>
          {user?.educations && user.educations.map(edu => [
            <View key={edu.id}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={[globalStyles.subTitleText]}>
                  {edu.name}                 
                </Text>

                <TouchableOpacity
                  onPress={handleEdit}
                >
                  <MaterialCommunityIcons name='pencil-outline' color={colors.gray} size={24} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.item]}>
                {edu.institution}
              </Text>

              <Text style={[styles.item, {color:colors.gray}]}>
                {edu.startDate} - {edu.endDate ? edu.endDate : 'Ongoing'}
              </Text>

              <View style={[styles.divider, {marginVertical:8}]}/>
            </View>
          ])}
        </View>
      </CardBody>
    </View>
  )
}

export default StaffEducations

const styles = StyleSheet.create({
  cardContainer:{
    width:'100%',
    flexDirection:'column',
    backgroundColor:colors.white,
    padding:16,
    gap:16,
  },
  cardHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  cardBody:{
    flexDirection:'column',
    gap:4,
  },
  cardFooter:{
    paddingHorizontal:16,
  },
  cardTitle:{
    fontFamily:'Inter-SemiBold',
    fontSize:20,
  },
  infoItem:{
    flexDirection:'row',
    gap:8,
  },
  itemTitle:{
    fontFamily:'Inter-SemiBold',
    fontSize:14,
  },
  item:{
    fontFamily:'Inter-Regular',
    fontSize:14,
  },
  linkText:{
    textDecorationLine:'underline', 
    textDecorationColor:colors.primary, 
    color:colors.primary
  },
  divider:{
    borderColor:colors.tintColor,
    borderWidth: 0.5,
  },
  
})