import { Text, StyleSheet, TouchableOpacity } from 'react-native'
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
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
  },
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    position:'relative',
  },
  btnTextLg:{
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
})

// Large Buttn Filled
const FilledButtonLg = ({title, color, onPress, textColor}: props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.btn, { backgroundColor:`${color}`, borderColor:`${color}` }]}
    > 
      <Text style={[styles.btnTextLg, { color:`${textColor}` }]}>{title}</Text>
    </TouchableOpacity>
  )
}

// Large Button Outline
const OutlineButtonLg = ({title, color, onPress, textColor}: props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.btn, { borderColor:`${color}` }]}
    > 
      <Text style={[styles.btnTextLg, { color:`${textColor}` }]}>{title}</Text>
    </TouchableOpacity>
  )
}

// Large Button Filled with Icon(right)
const FilledButtonIconRLg = ({title, color, onPress, textColor, icon}: props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.iconBtn, { backgroundColor:`${color}`, borderColor:`${color}` }]}
    > 
      <Text style={[styles.btnTextLg, { color:`${textColor}` }]}>{title}</Text>
      <MaterialCommunityIcons name={icon} size={24} color={textColor} style={{marginLeft:8, right:16, position: 'absolute'}} />

    </TouchableOpacity>
  )
}

// Large Button Outline with Icon(right)
const OutlineButtonIconRLg = ({title, color, onPress, textColor, icon}: props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.iconBtn, { borderColor:`${color}` }]}
    > 
      <Text style={[styles.btnTextLg, { color:`${textColor}` }]}>{title}</Text>
      <MaterialCommunityIcons name={icon} size={24} color={textColor} style={{marginLeft:8, right:16, position: 'absolute'}} />

    </TouchableOpacity>
  )
}
// Large Button Filled with Icon(left)
const FilledButtonIconLLg = ({title, color, onPress, textColor, icon}: props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.iconBtn, { backgroundColor:`${color}`, borderColor:`${color}` }]}
    > 
      <MaterialCommunityIcons name={icon} size={24} color={textColor} style={{marginRight:8,left:16, position: 'absolute'}} />
      <Text style={[styles.btnTextLg, { color:`${textColor}`,}]}>{title}</Text>

    </TouchableOpacity>
  )
}

// Large Button Outline with Icon(left)
const OutlineButtonIconLLg = ({title, color, onPress, textColor, icon}: props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.iconBtn, { borderColor:`${color}` }]}
    > 
      <MaterialCommunityIcons name={icon} size={24} color={textColor} style={{marginRight:8, left:16, position: 'absolute'}} />
      <Text style={[styles.btnTextLg, { color:`${textColor}`,}]}>{title}</Text>

    </TouchableOpacity>
  )
}

export {
  FilledButtonLg, 
  OutlineButtonLg, 
  FilledButtonIconRLg,
  OutlineButtonIconRLg,
  FilledButtonIconLLg,
  OutlineButtonIconLLg,
}