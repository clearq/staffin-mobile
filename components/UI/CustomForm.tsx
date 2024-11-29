import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface props {
  value: string
  Placeholder: string
  color: string
  onChangeText: (text: string)=> void
  onBlur?: () => void
  textColor: string
  placeholderTextColor: string
  inputError: boolean
  inputMode: 'none'|'text'|'email'|'tel'|'numeric'|'url'
}

const styles = StyleSheet.create({
  inputLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,  
    borderRadius:8, 
    position: 'relative'
  },
  border: {
    borderBottomWidth: 0.5,
  },
  inputText:{
    width:'100%',
    paddingVertical:4,
    fontFamily:'Inter-Regular',
    fontSize:16,
  },
  errorMessage: {
    color: Colors.error,
    fontSize: 14, 
    marginTop: 4, 
  },
})

const validateInput = (value: string, inputMode: string): string | null => {

  if (value.trim() === '') {
    return 'This field cannot be empty';
  }

  if (inputMode === 'email') {
    if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return 'Please enter a valid email address';
    }
  }

  if (inputMode === 'tel') {
    if (!/^\d{10,15}$/.test(value)) {
      return 'Please enter a valid phone number';
    }
  }


  return null; 
};


// Validate Form for Single line text
const ValidateTextForm = ({
  value, 
  Placeholder, 
  color, 
  onChangeText, 
  textColor, 
  placeholderTextColor, 
  inputMode
}: props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBlur = () => {
    const error = validateInput(value, inputMode)
    setErrorMessage(error)
  };

  return (
    <View>
      <View 
        style={[
          styles.inputLine, 
          styles.border, 
          { borderColor: errorMessage ? `${Colors.error}` : `${color}` ,
            backgroundColor: errorMessage ? `${Colors.errorBg}` : 'transparent'
          }
        ]}
      >
        <TextInput
          value={value}
          style={[styles.inputText, { color: errorMessage ? `${Colors.errorText}` : `${textColor}`}]
          } 
          keyboardType='default'
          inputMode={inputMode}
          placeholder={Placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          onBlur={handleBlur}
        />
         
      </View>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
    </View>
  )
}


// Password Form
const PaasswordTextForm = ({
  value, 
  Placeholder, 
  color, 
  onChangeText, 
  textColor, 
  placeholderTextColor, 
  inputMode
}: props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBlur = () => {
    const error = validateInput(value, inputMode)
    setErrorMessage(error)
  };

  return (
    <View>
      <View 
        style={[
          styles.inputLine, 
          styles.border, 
          { borderColor: errorMessage ? `${Colors.error}` : `${color}` ,
            backgroundColor: errorMessage ? `${Colors.errorBg}` : 'transparent'
          }
        ]}
      >
        <TextInput
          value={value}
          style={[styles.inputText, { color: errorMessage ? `${Colors.errorText}` : `${textColor}`}]
          } 
          keyboardType='default'
          inputMode={inputMode}
          placeholder={Placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          secureTextEntry={!showPassword}    
        />
        <TouchableOpacity 
          onPress={togglePasswordVisibility}
          style={{position: 'absolute', right:8}}
        >
          <MaterialCommunityIcons 
            name={showPassword ? 'eye-off' : 'eye' }
            size={24} 
            color={Colors.white70} 
            
          />
        </TouchableOpacity>
        
      </View>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
    </View>
  )
}


export {
  ValidateTextForm,
  PaasswordTextForm
}