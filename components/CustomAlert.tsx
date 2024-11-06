import { View, Text } from 'react-native'
import React from 'react'
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyle';

interface props {
  title: string,
  msg: string | null,
}


const ErrorAlert = ({title, msg,}:props) => {
  return (
    <View className= 'p-4 w-full border border-error rounded-md bg-errorBg' >
      <View className='flex flex-row gap-2'>
        <MaterialCommunityIcons name="close-circle" size={24} color={Colors.error} />
        <View className='w-fit'>
          <Text className='text-base font-semibold text-errorTitle'>{title}</Text>
          {msg && (
            <Text className='text-sm font-normal text-errorText'>{msg}</Text>
          )}         
        </View>
      </View>     
    </View>
  )
}

const SuccessAlert = ({title, msg,}:props) => {
  return (
    <View className= 'p-4 w-full border border-success rounded-md bg-successBg' >
      <View className='flex flex-row gap-2'>
        <MaterialCommunityIcons name="check-circle" size={24} color={Colors.success} />
        <View className='w-fit'>
          <Text className='text-base font-semibold text-successTitle'>{title}</Text>
          {msg && (
            <Text className='text-sm font-normal text-successText'>{msg}</Text>
          )}         
        </View>
      </View>     
    </View>
  )
}


const WarningAlert = ({title, msg,}:props) => {
  return (
    <View className= 'p-4 w-full border border-warning rounded-md bg-warningBg' >
      <View className='flex flex-row gap-2'>
        <MaterialCommunityIcons name="alert" size={24} color={Colors.warning} />
        <View className='w-fit'>
          <Text className='text-base font-semibold text-warningTitle'>{title}</Text>
          {msg && (
            <Text className='text-sm font-normal text-warningText'>{msg}</Text>
          )}         
        </View>
      </View>     
    </View>
  )
}

export  {ErrorAlert, SuccessAlert, WarningAlert }