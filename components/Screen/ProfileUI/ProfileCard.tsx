import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'

const styles = StyleSheet.create({
  cardContainer:{
    width:'100%',
    flexDirection:'column',
    backgroundColor:colors.white,
    padding:16,
    gap:16,
  },
  cardHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  cardBody:{
    flexDirection:'column',
    gap:4,
  },
  cardFooter:{
    flexDirection:'column',
  },
  cardTitle:{
    fontFamily:'Inter-SemiBold',
    fontSize:20,
  },
  infoItem:{
    flexDirection:'row',
    gap:8,
  },
  itemTitle:{
    fontFamily:'Inter-SemiBold',
    fontSize:14,
  },
  item:{
    fontFamily:'Inter-Regular',
    fontSize:14,
  },
  divider:{
    borderColor:colors.tintColor,
    borderWidth: 0.5,
  },
})


// Card Header
type headerProps ={
  title: string
  isCurrentUser:boolean
  handlePress?:()=>void
}
const CardHeader = ({title, isCurrentUser, handlePress}:headerProps) => {

  return(
    <View style={[styles.cardHeader]}>

      <Text style={[styles.cardTitle]}>{title}</Text>
      { isCurrentUser && title !== 'Activity' && (
        <TouchableOpacity
         onPress={handlePress}
        >
          <MaterialCommunityIcons name='pencil-outline' size={20} color={colors.gray} />
        </TouchableOpacity>
      )}
   </View>
  )
}

// Card Body
const CardBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={[styles.cardBody]}>
      {children}
    </View>
  )
}


// Card Footer
type props = {
  text:string
  showIcon:boolean
  icon?:keyof typeof MaterialCommunityIcons.glyphMap
}
const CardFooter = ({text, showIcon, icon}:props) => {
  return (
    <View style={[styles.cardFooter]}>
      <View style={[styles.divider]} />

      <View style={{flexDirection:'row', alignItems:'center', alignContent:'center', marginVertical:8,}}>
        <Text style={{flex:1, color:colors.gray, fontFamily:'Inter-Regular', fontSize:16, textAlign:'center'}}>
          {text}
        </Text>
        {showIcon && 
          <TouchableOpacity style={{alignSelf:'flex-end',}}>
            <MaterialCommunityIcons name={icon} size={20} color={colors.gray} />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}



export {CardHeader, CardBody, CardFooter}
