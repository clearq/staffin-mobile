import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import logo from '../../assets/Images/favicon.png'
import { colors } from '@/constants/colors'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

type props={
  handlePress: () => void
}

const CustomHeader = ({handlePress}:props) => {

  return (
    <View style={[styles.container]}>
      <View style={[styles.buttonGroup]}>
        <Image source={logo} width={40} height={40} resizeMode='cover'/>

        <TextInput
          placeholder='Search'
          placeholderTextColor={colors.gray}       
          style={{
            height:32,
            backgroundColor:colors.white40,
            borderRadius:4,
            minWidth:150,
            padding:8
          }}
        />
          {/* <MaterialCommunityIcons name='magnify' />
          <Text>Search</Text>
        </TextInput> */}
      </View>     
     
     <View style={[styles.buttonGroup,]}>
      <TouchableOpacity
          onPress={()=>{}}
        >
          <MaterialCommunityIcons name='bell-outline' size={24} color={colors.gray} />
          {/* <Text>Logout</Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePress}
        >
          <MaterialCommunityIcons name='cog-outline' size={24} color={colors.gray} />
        </TouchableOpacity>
     </View>

      
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  container:{ 
    flexDirection:'row', 
    backgroundColor:colors.primaryLight, 
    justifyContent:'space-between',
    height:70, 
    paddingHorizontal:16, 
    alignItems:'center',  
    position: 'relative'
  },
  buttonGroup: {
    flexDirection:'row',
    alignItems:'center',
    gap:8,
  }
})