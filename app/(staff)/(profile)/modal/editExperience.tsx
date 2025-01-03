import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import ModalCard from '@/components/Modal/ModalCard'
import {EditTextInput, EditTextInputDate, EditTextInputMultiline} from '@/components/Screen/EditUI/EditTextInput'
import { colors } from '@/constants/Colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import dayjs from 'dayjs'
import { ExpData, updateExperience } from '@/api/staff'

type props = {
  onClose: () => void
  token?: string
  exp:ExpData
  handleSuccess: ()=> void
}

const EditExperience = ({onClose, token, exp, handleSuccess}:props) => {
  const [position, setPosition] = useState(exp.position)
  const [companyName, setCompanyName] = useState(exp.companyName)
  const [location, setLocation] = useState(exp.location)
  const [description, setDescription] = useState(exp?.description)
  const [startDate, setStartDate] = useState(exp.startDate)
  const [endDate, setEndDate] = useState(exp.endDate)
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
        ...exp,
        position,
        companyName,
        location,
        description,
        startDate,
        endDate,    
      }
      
      try {
        setIsSubmitting(true); 
        // console.log("Submitting data:", expData);
        const response = await updateExperience(exp.id, expData, token);
        console.log("API Response:", response, exp.id);
        Alert.alert('Success', 'Experience updated successfully!');
        onClose(); // Close modal after successful submission
        handleSuccess()
      } catch (error: any) {
        console.error('Error updating experience:', error);
    
        // Enhanced error alert
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to update experience. Please try again.";
        Alert.alert('Error', errorMessage);
      } finally {
        setIsSubmitting(false);
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
            value={description ? description : ''} 
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

export default EditExperience

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