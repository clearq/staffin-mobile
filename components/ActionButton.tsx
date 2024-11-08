import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

interface props {
  title: string;
  icon: 'cards-heart-outline'| 'cards-heart' | 'comment-text-outline' | 'repeat' | 'share-variant-outline';
  size: number;
  color: string;
  onPress: () => void;
}


// ActionButtonComponent
function ActionButton ({title, icon, size, color, onPress}: props) {
  return(
    <>
      <TouchableOpacity
        className='flex flex-col justify-center items-center'
        onPress={onPress}
      >
        <MaterialCommunityIcons name={icon} size={size} color={color} /> 
        <Text className={'text-xs text-gray-500 text-center'}>{title}</Text>
      </TouchableOpacity>
    </>
  )
}

export default ActionButton