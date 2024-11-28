import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface props {
  title: string,
  color: string,
  onPress: ()=> void,
  icon?: keyof typeof MaterialCommunityIcons.glyphMap,
  textColor: string,
}

const styles = StyleSheet.create({
  
})


// Form Single line text
const textForm = () => {
  return (
    <View></View>
  )
}




export {
  textForm,
  
}