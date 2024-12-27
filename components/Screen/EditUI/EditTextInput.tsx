import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

import { colors } from '@/constants/Colors'


type props = {
  label: string
  value: string
  handleChange: (e:string)=> void
  formStyle?: {}
  multilineText: boolean
  placholderColor?: string
}

const EditTextInput = ({label, value, handleChange,formStyle, multilineText, placholderColor}:props) => {
  const [onFocus, setOnFocus] = useState<boolean>(false)

  return ( 
    <View style={[styles.textInputContainer, formStyle]}>
      <View style={{flex:1, justifyContent:'space-around'}}>
        <Text style={[onFocus? styles.onLabelText : styles.labelText]}>
          {label}:
        </Text>
        <TextInput
          style={[onFocus? styles.onTextInputStyle : styles.textInputStyle,]}
          placeholder={label}
          placeholderTextColor={placholderColor}
          value={value}
          onFocus={()=> setOnFocus(true)}
          onBlur={()=> setOnFocus(false)}
          onChangeText={handleChange}
          multiline={multilineText}       
        />
      </View>
    </View>
        
  )
}

export default EditTextInput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap:24,
  },
  titleContainer:{
    alignItems:'center',
    width:'100%',
    gap:8,
  },
  formContainer:{
    width:'100%',
    gap:8,
  },
  btnWhite:{
    backgroundColor:colors.secondary
  },
  btnBlack:{
    backgroundColor:colors.black
  },
  link:{
    fontFamily:'Inter-Regular',
    fontSize:16,
    color:colors.secondary,
    textDecorationLine:'underline'
  },
  textInputContainer:{
    width:'100%',
    flexDirection:'column',
    gap:4,
    justifyContent:'flex-start'
  },
  textInputStyle:{
    width:'100%',
    borderColor:colors.gray,
    borderWidth:0.5,
    padding:8,
    borderRadius:4,
  },
  onTextInputStyle:{
    width:'100%',
    borderColor:colors.secondary,
    borderWidth:1,
    padding:8,
    borderRadius:8
  },
  labelText:{
    fontFamily: 'Inter-Regular',
    fontSize:12,
    color:colors.gray,
  },
  onLabelText:{
    fontFamily: 'Inter-Regular',
    fontSize:12,
    color:colors.secondary,
  },
});