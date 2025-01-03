import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'

import ModalCard from '@/components/Modal/ModalCard'
import {EditTextInput, EditTextInputDate} from '@/components/Screen/EditUI/EditTextInput'
import { colors } from '@/constants/Colors'
import { addEducation } from '@/api/staff'
import dayjs from 'dayjs'


type props = {
  onClose: () => void
  token?: string
  handleSuccess: ()=> void
}

const AddEducation = ({onClose, token, handleSuccess}:props) => {
  const [name, setName] = useState('')
  const [institution, setInstitution] = useState('')
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartDateChange = (newDate:string) => {
    setStartDate(newDate)
  }

  const handleEndDateChange = (newDate:string) => {
    setEndDate(newDate)
  }

  const handleSubmit = async () => {
    if (token) {
      const eduData = {
        name,
        institution,
        startDate,
        endDate
      }

      try {
        setIsSubmitting(true);

        await addEducation(eduData, token);

        Alert.alert('Success', 'Education added successfully!');
        onClose(); // Close modal after successful submission
        handleSuccess()
      } catch (error:any) {
        // Enhanced error alert
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to add education. Please try again.";
        Alert.alert('Error', errorMessage);
      } finally {
        setIsSubmitting(false); 
      }
    }
  }

  return (
    <ModalCard 
      title={'Add Education'}
      modalclose={onClose} 
      children={(
        <View style={styles.formContainer}>
          <EditTextInput 
            label={'Name'} 
            value={name} 
            handleChange={(text)=> setName(text)} 
            multilineText={false} 
            placholderColor={colors.tintColor}      
          />

          <EditTextInput 
            label={'Institution'} 
            value={institution} 
            handleChange={(text)=> setInstitution(text)} 
            multilineText={false}   
            placholderColor={colors.tintColor}     
          />

          <View style={styles.row}>
            <EditTextInputDate
              label={'Start date'}
              value={startDate}
              handleChange={handleStartDateChange}
              multilineText={false}
              formStyle={[styles.resize]}
              placholderColor={colors.tintColor}
            />
            
            <EditTextInputDate
              label={'End date'}
              value={endDate}
              handleChange={handleEndDateChange}
              multilineText={false}
              formStyle={[styles.resize]}
              placholderColor={colors.tintColor}
            />     
          </View>
        </View>
      )} 
      onSubmit={handleSubmit}      
    />
  )
}

export default AddEducation

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
  resize:{
    flexShrink:0.5
  },
})