import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ModalCard from '@/components/Modal/ModalCard'
import EditTextInput from '@/components/Screen/EditUI/EditTextInput'
import { colors } from '@/constants/Colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

type props = {
  onClose: () => void
}

const AddExperience = ({onClose}:props) => {
  const [title, setTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = () => {
    console.log('submit');  
  }

  return (
    <ModalCard 
      modalclose={onClose} 
      children={(
        <View style={styles.formContainer}>
          <EditTextInput 
            label={'Title'} 
            value={title} 
            handleChange={(text)=> setTitle(text)} 
            multilineText={false} 
            formStyle={styles.inputStyle}
            placholderColor={colors.tintColor}      
          />

          <EditTextInput 
            label={'Company name'} 
            value={companyName} 
            handleChange={(text)=> setCompanyName(text)} 
            multilineText={false}  
            formStyle={styles.inputStyle} 
            placholderColor={colors.tintColor}     
          />

          <View style={styles.row}>
            <EditTextInput 
              label={'Start date'} 
              value={startDate} 
              handleChange={(text)=> setStartDate(text)} 
              multilineText={false}  
              formStyle={[styles.inputStyle, {width:'90%'}]}
              placholderColor={colors.tintColor}      
            />
            <TouchableOpacity>
              <MaterialCommunityIcons name='calendar-month-outline' size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <EditTextInput 
              label={'End date'} 
              value={endDate} 
              handleChange={(text)=> setEndDate(text)} 
              multilineText={false}  
              formStyle={[styles.inputStyle, {width:'90%'}]} 
              placholderColor={colors.tintColor}     
            />
            <TouchableOpacity>
              <MaterialCommunityIcons name='calendar-month-outline' size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <EditTextInput 
            label={'Description'} 
            value={description} 
            handleChange={(text)=> setDescription(text)} 
            multilineText={true} 
            formStyle={styles.inputStyle} 
            placholderColor={colors.tintColor}       
          />
        </View>
      )} 
      onSubmit={handleSubmit}      
    />
  )
}

export default AddExperience

const styles = StyleSheet.create({
  formContainer:{
    flexDirection:'column',
    height:'auto',
    width:'100%',
    gap:16,
    marginBottom:24,
  },
  inputStyle:{
    minHeight:40,
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    gap:8,
    width:'auto',
  },
})