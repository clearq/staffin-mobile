import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User } from '@/api/user'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/Colors'
import { globalStyles } from '@/constants/globalStyles'
import { CardBody, CardFooter, CardHeader } from '@/components/Screen/ProfileUI/ProfileCard'
import { useAppSelector } from '@/store/reduxHooks'
import { getExperience, ExpData } from '@/api/staff'
import AddExperience from '../modal/addExperience'
import { PaperProvider, Portal } from 'react-native-paper'

type experienceProps = {
  user: User
}

const StaffExperience = ({user}: experienceProps) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exp, setExp] = useState<ExpData[]>([])

  const token = authUser?.token

  useEffect (() => {
    const fetchExp = async () => {
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const exp = await getExperience(token)
        setExp([exp])
      } catch (err) {
        setError("Failed to get experience.");
        Alert.alert("Error", error || "An error occurred.");  
      }
    }
  }, [])


  const handleAddExperience = () => {
    setOpenModal(true)
    // console.log('open modal', openModal);
  }

  const handleEdit = () => {
    console.log('edit experience'); 
  }
  
  return (
    <>
      {openModal &&
        <AddExperience  
          onClose={() => setOpenModal(false)} 
        />

      }

      <View style={[styles.cardContainer]}>
        <CardHeader 
          title='Experience'
          isCurrentUser={authUser?.id === user.id}
          handlePress={handleAddExperience}
          headerIcon='plus'
        />
        <CardBody>
          <View style={[{flexDirection:'column', gap:8}]}>
            {user?.experience && user?.experience.map(exp => (
              <View key={exp.id}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={[globalStyles.subTitleText]}>
                    {exp.position}                 
                  </Text>

                  <TouchableOpacity
                    onPress={handleEdit}
                  >
                    <MaterialCommunityIcons name='pencil-outline' color={colors.gray} size={24} />
                  </TouchableOpacity>
                </View>

                  <Text style={[styles.item]}>
                    {exp.companyName}
                  </Text>

                  <Text style={[styles.item, {color:colors.gray}]}>
                    {exp.startDate} - {exp.endDate ? exp.endDate : 'Ongoing'}
                  </Text>
                  
                  <Text style={[styles.item, {color:colors.gray}]}>
                  {exp.location}
                </Text>

              <Text style={[styles.item]}>
                {exp.description}
              </Text>

              <View style={[styles.divider, {marginVertical:8}]}/>
            </View>
          ))}
        </View>
      </CardBody>

    </View>
    </>
  )
}

export default StaffExperience


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