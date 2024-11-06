import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

interface props {
  onPress:() => void
  onChangeText: (text:string) => void
}

const InputMessage = ({onPress, onChangeText}:props) => {
  return (
    <View className='bg-slate-300 w-full h-12 flex flex-row items-center justify-between px-4'>
      <TextInput 
        className='p-2 bg-slate-50 w-5/6' 
        multiline={true}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        className=''
        onPress={onPress}
      >
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InputMessage