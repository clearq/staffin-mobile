import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { router, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { User } from '@/api/user'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { globalStyles } from '@/constants/globalStyles'
import { CardBody, CardFooter, CardHeader } from '@/components/Screen/ProfileUI/ProfileCard'
import { updateStaff } from '@/api/staff'
import { ButtonLg } from '@/components/UI/CustomButton'
import { getCurrentUser } from '@/store/Slice/authSlice'
import { useAppDispatch } from '@/store/reduxHooks'


type infoProps = {
  user: User
  token: string
}

const StaffInformation = ({user, token}: infoProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch(); 
  
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
  const [profileImage, setProfileImage] = useState(user?.profileImage)
  const [isSaving, setIsSaving] = useState(false); 

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updateResult = await updateStaff(
        {
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
          profileImage
        },
        token
      );
      
      const userId = user.id;
      console.log('userId:', userId);

      console.log('updateResult:' , updateResult)

      const currentUserResult = await dispatch(getCurrentUser(userId));

      if (getCurrentUser.fulfilled.match(currentUserResult)) {
        console.log("Fetched updated user:", currentUserResult.payload);
        alert("Profile updated successfully!");
      } else {
        console.error("Failed to fetch updated user:", currentUserResult.payload);
        alert("Profile updated, but failed to refresh user data.");
      }

      setIsSaving(false);
    } catch (error: any) {
    console.log('Error during profile update:', error);
    alert(error.message || "Unexpected error occurred.");
    setIsSaving(false);
    } finally {
    setIsSaving(false);
    }
    
  }


  return (   
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, justifyContent:'space-around'}}>
          <View style={[styles.formContainer]}>
            <EditTextInput
              label='First name'
              value={firstName}
              handleChange={(text) => setFirstName(text)}
              multilineText={false}      
            />
            
            <EditTextInput
              label='Last name'
              value={lastName}
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
              value={street}
              handleChange={(text) => setStreet(text)}
              multilineText={false}
            />

            <View style={{flexDirection:'row', gap:8, flex:1, width:'100%',}}>
              <EditTextInput
                label='City'
                value={city}
                handleChange={(text) => setCity(text)}
                multilineText={false}
                formStyle={{flexShrink:2}}
              />
            
              <EditTextInput
                label='Zip code'
                value={postalCode}
                handleChange={(text) => setPostalCode(text)}
                multilineText={false}
                formStyle={{flexShrink:2}}
              />
            </View>
          
            <EditTextInput
              label='Country'
              value={country}
              handleChange={(text) => setCountry(text)}
              multilineText={false}
            />
          
            <EditTextInput
              label='Phone number'
              value={phoneNumber}
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

            <ButtonLg 
              title={isSaving ? "Saving... " : "Save"}
              containerStyles={styles.btnBlack}
              textColor={colors.white}
              isLoading={isSaving}
              handlePress={handleSave}
            />

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default StaffInformation


type props = {
  label: string
  value: string
  handleChange: (e:string)=> void
  formStyle?: {}
  multilineText: boolean
}

const EditTextInput = ({label, value, handleChange,formStyle, multilineText}:props) => {
  const [onFocus, setOnFocus] = useState<boolean>(false)

  return (
    
          <View style={[styles.textInputContainer, formStyle]}>
            <View style={{flex:1, justifyContent:'space-around'}}>
              <Text style={[onFocus? styles.onLabelText : styles.labelText]}>
                {label}:
              </Text>
              <TextInput
                style={[onFocus? styles.onTextInputStyle : styles.textInputStyle,]}
                placeholder={label}
                value={value}
                onFocus={()=> setOnFocus(true)}
                onBlur={()=> setOnFocus(false)}
                onChangeText={handleChange}
                multiline={multilineText}
              />
            </View>
          </View>
        
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap:24,
  },
  titleContainer:{
    alignItems:'center',
    width:'100%',
    gap:8,
  },
  formContainer:{
    width:'100%',
    gap:8,
  },
  btnWhite:{
    backgroundColor:colors.secondary
  },
  btnBlack:{
    backgroundColor:colors.black
  },
  link:{
    fontFamily:'Inter-Regular',
    fontSize:16,
    color:colors.secondary,
    textDecorationLine:'underline'
  },
  textInputContainer:{
    width:'100%',
    flexDirection:'column',
    gap:4,
    justifyContent:'flex-start'
  },
  textInputStyle:{
    width:'100%',
    borderColor:colors.gray,
    borderWidth:0.5,
    padding:8,
    borderRadius:4,
  },
  onTextInputStyle:{
    width:'100%',
    borderColor:colors.secondary,
    borderWidth:1,
    padding:8,
    borderRadius:8
  },
  labelText:{
    fontFamily: 'Inter-Regular',
    fontSize:12,
    color:colors.gray,
  },
  onLabelText:{
    fontFamily: 'Inter-Regular',
    fontSize:12,
    color:colors.secondary,
  },
});

function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}

