import Colors from '@/constants/Colors'
import React, { useState, useRef } from 'react'
import { TextInput, View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CustomFormProps {
  value: string
  inputMode: 'email' | 'none' | 'text' | 'tel' 
  formStyles?: string
  onChangeText: (text:string) => void
  placeholder?: string
  label?: string
  showIcon: boolean
}

function CustomForm({
  value,
  inputMode,
  formStyles,
  onChangeText,
  placeholder,
  showIcon,
}: CustomFormProps) {
    const [showPassword, setShowPassword] = useState(false)

    showIcon === false

  return (
    <View
      className='h-12 px-2 my-1 border-2 border-borderColor flex flex-row justify-between items-center'
    >

    <TextInput
      value={`${value}`}
      inputMode={inputMode}
      className={`grow ${formStyles}`}
      onChangeText={onChangeText}
      placeholder = {`${placeholder}`}
      secureTextEntry = {!showIcon? false: (showPassword? true : false)}
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