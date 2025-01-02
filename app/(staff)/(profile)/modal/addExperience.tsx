import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'


import DateTimePicker from 'react-native-ui-datepicker'
import ModalCard from '@/components/Modal/ModalCard'
import {EditTextInput, EditTextInputDate, EditTextInputMultiline} from '@/components/Screen/EditUI/EditTextInput'
import { colors } from '@/constants/Colors'
import { addExperience, getExperience } from '@/api/staff'
import { User } from '@/api/user'
import dayjs from 'dayjs'


type props = {
  onClose: () => void
  token?: string
}

const AddExperience = ({onClose, token}:props) => {
  const [position, setPosition] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(dayjs().format('YYYY_MM-DD'))
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleStartDateChange = (newDate:string) => {
    setStartDate(newDate)
    console.log('start date:', startDate);  
  }

  const handleEndDateChange = (newDate:string) => {
    setEndDate(newDate)
    console.log('end date:', endDate);
    
  }

  const handleSubmit = async () => {
    if (token) {
      const expData = {
        position,
        companyName,
        location,
        description,
        startDate,
        endDate,    
      }
      
      try {
        setIsSubmitting(true); // Show loading state
        console.log("Submitting data:", expData);
        const response = await addExperience(expData, token);
        console.log("API Response:", response);
        Alert.alert('Success', 'Experience added successfully!');
        onClose(); // Close modal after successful submission
      } catch (error: any) {
        console.error('Error adding experience:', error);
    
        // Enhanced error alert
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to add experience. Please try again.";
        Alert.alert('Error', errorMessage);
      } finally {
        setIsSubmitting(false); // Hide loading state
      }
    }
  
  }

  return (
    <ModalCard 
      title={'Add Experience'}
      modalclose={onClose} 
      children={(
        <View style={styles.formContainer}>
          <EditTextInput 
            label={'Position'} 
            value={position} 
            handleChange={(text)=> setPosition(text)} 
            multilineText={false} 
            placholderColor={colors.tintColor}      
          />

          <EditTextInput 
            label={'Company name'} 
            value={companyName} 
            handleChange={(text)=> setCompanyName(text)} 
            multilineText={false}   
            placholderColor={colors.tintColor}     
          />
          
          <EditTextInput 
            label={'Location'} 
            value={location} 
            handleChange={(text)=> setLocation(text)} 
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

          <EditTextInputMultiline 
            label={'Description'} 
            value={description} 
            handleChange={(text)=> setDescription(text)} 
            multilineText={true} 
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
    height:320,
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