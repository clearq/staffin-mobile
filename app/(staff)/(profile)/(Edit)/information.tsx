import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { User } from '@/api/user'
import { colors } from '@/constants/Colors'
import { ButtonLg } from '@/components/UI/CustomButton'
import {EditTextInput} from '@/components/Screen/EditUI/EditTextInput'
import { globalStyles } from '@/constants/globalStyles'


type infoProps = {
  user: User
  onSubmit: (uppdatedUser: User)=>void
  isSaving:boolean
}

const StaffInformation = ({user, onSubmit, isSaving}: infoProps) => {
  
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [title, setTitle] = useState(user.title)
  const [street, setStreet] = useState(user.street)
  const [city, setCity] = useState(user.city)
  const [postalCode, setPostalCode] = useState(user.postalCode)
  const [country, setCountry] = useState(user.country)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [email, setEmail] = useState(user.email)
  const [about, setAbout] = useState(user?.about)

  const handleSave = () => {
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      title,
      street,
      city,
      postalCode,
      country,
      phoneNumber,
      email,
      about,
    };
    console.log('updateUser:', updatedUser);
    
    onSubmit(updatedUser); 
  };


  return ( 
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[{flex:1}, globalStyles.paddingX]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, justifyContent:'space-around'}}> 
    
          <View style={[styles.formContainer]}>
            <EditTextInput
              label='First name'
              value={firstName ? firstName : ''}
              handleChange={(text) => setFirstName(text)}
              multilineText={false}      
            />
            
            <EditTextInput
              label='Last name'
              value={lastName ? lastName : ''}
              handleChange={(text) => setLastName(text)}
              multilineText={false}
            />

            <EditTextInput
              label='Title'
              value={title ? title : ''}
              handleChange={(text) => setTitle(text)}
              multilineText={false}
            />
          
            <EditTextInput
              label='Address'
              value={street ? street : ''}
              handleChange={(text) => setStreet(text)}
              multilineText={false}
            />

            <View style={{flexDirection:'row', gap:8, flex:1, width:'100%',}}>
              <EditTextInput
                label='City'
                value={city ? city : ''}
                handleChange={(text) => setCity(text)}
                multilineText={false}
                formStyle={{flexShrink:2}}
              />
            
              <EditTextInput
                label='Zip code'
                value={postalCode ? postalCode : ''}
                handleChange={(text) => setPostalCode(text)}
                multilineText={false}
                formStyle={{flexShrink:2}}
              />
            </View>
          
            <EditTextInput
              label='Country'
              value={country ? country : ''}
              handleChange={(text) => setCountry(text)}
              multilineText={false}
            />
          
            <EditTextInput
              label='Phone number'
              value={phoneNumber ? phoneNumber : ''}
              handleChange={(text) => setPhoneNumber(text)}
              multilineText={false}
            />
          
            <EditTextInput
              label='Email'
              value={email}
              handleChange={(text) => setEmail(text)}
              multilineText={false}
            />

            <EditTextInput
              label='About'
              value={about? about: ''}
              handleChange={(text) => setAbout(text)}
              multilineText={true}
            />

          </View>
            <ButtonLg 
              title={isSaving ? "Saving... " : "Save"}
              containerStyles={globalStyles.btnBlack}
              textColor={colors.white}
              isLoading={isSaving}
              handlePress={handleSave}
            />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
        
  )
}

export default StaffInformation


const styles = StyleSheet.create({
  formContainer:{
    width:'100%',
    gap:8,
    marginBottom:24,
  },
});

