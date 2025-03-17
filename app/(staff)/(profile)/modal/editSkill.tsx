import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import ModalCard from '@/components/Modal/ModalCard'
import {EditTextInput, EditTextInputDate} from '@/components/Screen/EditUI/EditTextInput'
import { User } from '@/api/user'
import { deleteStaffSkill, getStaffSkills } from '@/api/staff'
import { SkillData } from '@/api/skill'
import { useAppSelector } from '@/store/reduxHooks'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/Colors'
import { globalStyles } from '@/constants/globalStyles'


type props = {
  onClose: () => void
  handleSuccess: ()=> void
  id: User['id']
}

const EditSkill = ({onClose, handleSuccess, id}:props) => {
  const { authUser, isLoading, error:userError } = useAppSelector((state) => state.auth);
  const [skills, setSkills] = useState<SkillData[]>([])
  const [skill, setSkill] = useState({
    id: null,
    namn:''
  })
  const token = authUser?.token

  console.log('token:', token);
  

  const fetchStaffSkills =  async () => {
    if (!token) {
      console.error("Token is missing.");
      Alert.alert("Error", "Authorization token is missing.");
      return;
    }
    try {
      const skills = await getStaffSkills(id, token)      
      setSkills(skills)
    } catch (error:any){
      console.log('error:', error.data?.message);      
    }
  }

  useEffect(() => {
    fetchStaffSkills()
  },[])

  const handleDeleteSkill = (id:number, token:string) => {
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
              await deleteStaffSkill(id, token);
              Alert.alert('Success', 'Item deleted successfully!');
              fetchStaffSkills(); // Refresh experiences
            } catch (error:any) {
              console.error(error)
            }
          }, 
        }
      ])
  }

  const handleSubmit = () => {}


  return (
    <ModalCard 
      title={'Skills'}
      modalclose={onClose} 
      children={(
        <View style={[styles.col]}>
          <EditTextInput 
            label='Skill'
            value=''
            handleChange={() => {}}
            multilineText={false}
          />

          <View style={[styles.row, {flexWrap:'wrap'}]}>
            {token && skills && skills.map(skill => (
              <View key={skill.id} style={{padding:8, backgroundColor:colors.primary, borderRadius:8, flexDirection:'row', gap:8,}}>
                <Text style={[styles.item, {color:colors.white}]}>{skill.name}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteSkill(skill.id, token)}
                >
                  <MaterialCommunityIcons name='close-circle' color={colors.white} size={20} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
      onSubmit={handleSubmit}
    />
    
  )
}

export default EditSkill

const styles = StyleSheet.create({
  formContainer:{
    height:'auto',
    width:'100%',
    gap:16,
  },
  row:{
    flexDirection:'row',
    gap:8,
    width:'auto',
  },
  col:{
    flexDirection:'column',
    gap:8,
  },
  resize:{
    flexShrink:0.5
  },
  item:{
    fontFamily:'Inter-Regular',
    fontSize:14,
  },
})