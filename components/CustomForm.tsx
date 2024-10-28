import Colors from '@/constants/Colors'
import React, { useState } from 'react'
import { TextInput, View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CustomFormProps {
  inputMode: 'email' | 'none' | 'text' | 'tel' 
  formStyles?: string
  onChangeText: () => void
  placeholder?: string
  label?:'string'
  showIcon: boolean
}

function CustomForm({
  inputMode,
  formStyles,
  onChangeText,
  placeholder,
  showIcon,
}: CustomFormProps) {
    const [showPassword, setShowPassword] = useState(true)

    showIcon === false

  return (
    <View
      className='h-12 px-2 my-1 border-2 border-borderColor flex flex-row justify-between items-center'
    >
    
    <TextInput
      inputMode={inputMode}
      className={`grow ${formStyles}`}
      onChangeText={onChangeText}
      placeholder = {`${placeholder}`}
      secureTextEntry = {!showPassword ? true : false }
      placeholderTextColor ={`${Colors.borderColor}`}
    />
    { showIcon &&
      <MaterialCommunityIcons
        name={showPassword ? 'eye-off' : 'eye'}
        size={24}
        color={Colors.gray}
        onPress={()=> (showPassword? setShowPassword(false): setShowPassword(true))}
      />
    }
    
  </View>

  )
}

export default CustomForm