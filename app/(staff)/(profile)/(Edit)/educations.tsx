import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User } from '@/api/user'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/Colors'
import { globalStyles } from '@/constants/globalStyles'
import { CardBody, CardFooter, CardHeader } from '@/components/Screen/ProfileUI/ProfileCard'
import { useAppSelector } from '@/store/reduxHooks'
import { deleteEducation, EducationData, getEducation } from '@/api/staff'
import AddEducation from '../modal/addEducation'
import EditEducation from '../modal/editEducation'
import dayjs from 'dayjs'

type educationProps = {
  user: User
}

const StaffEducations = ({user}:educationProps) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [edu, setEdu] = useState<EducationData[]>([])
  const [eduById, setEduById] = useState<EducationData>()

  const token = authUser?.token

  const fetchEducations = async () => {
    if (token) {
      try {
        setLoading(true)
        const educations = await getEducation(token)
        setEdu(educations)
      } catch (error:any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchEducations()
  },[])
  
    const handleAddEducation = () => {
      setOpenAddModal(true)
    }
  
    const handleEditEducation = (edu:EducationData) => {
      setOpenEditModal(true)
      setEduById(edu)
    }

    const handleDeleteEducation = (id:number, token:string) => {
      Alert.alert('Delete item', 'Are you sure you want to delete this item?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel'
          },{
            text: 'Delete',
            onPress: async () => {
              try {
                await deleteEducation(id, token);
                Alert.alert('Success', 'Experience deleted successfully!');
                fetchEducations(); // Refresh experiences
              } catch (error:any) {
                Alert.alert('Error', error.message || 'Failed to delete experience');
              }
            }, 
          }
        ])
    }

    
  return (
    <>
      {openAddModal &&
        <AddEducation 
          token={token} 
          onClose={() => setOpenAddModal(false)} 
          handleSuccess={fetchEducations}
        />
      }

      {eduById && openEditModal &&
        <EditEducation 
          token={token}
          onClose={() => setOpenEditModal(false)} 
          handleSuccess={fetchEducations}
          edu={eduById} // get expData by experienceId
        />
      }

      <View style={[styles.cardContainer]}>
        <CardHeader 
          title='Educations'
          isCurrentUser={authUser?.id === user.id}
          handlePress={handleAddEducation}
          headerIcon='plus'
        />
        <CardBody>
          <View style={[{flexDirection:'column', gap:8}]}>
            {token && edu && edu.map(edu => (
              <View key={edu.id}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={[globalStyles.subTitleText]}>
                    {edu.name}                 
                  </Text>

                  <View
                    style={[styles.iconBtnGroup]}
                  >
                    {/* <TouchableOpacity
                      onPress={() => handleEditEducation(edu)}
                    >
                      <MaterialCommunityIcons name='pencil-outline' color={colors.gray} size={24} />
                    </TouchableOpacity> */}

                    <TouchableOpacity
                      onPress={() => handleDeleteEducation(edu.id, token)}
                    >
                      <MaterialCommunityIcons name='delete-outline' color={colors.gray} size={24} />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={[styles.item]}>
                  {edu.institution}
                </Text>

                <Text style={[styles.item, {color:colors.gray}]}>
                  {dayjs(edu.startDate).format('YYYY-MM-DD')} - {edu.endDate ? dayjs(edu.endDate).format('YYYY-MM-DD') : 'Ongoing'}
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
  iconBtnGroup:{
    flexDirection:'row',
    gap:24,
  }
  
})