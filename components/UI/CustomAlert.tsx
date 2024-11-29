import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyle';

interface props {
  title: string,
  msg: string | null,
}

const styles = StyleSheet.create({
  container:{
    padding:8,
    width:'100%',
    borderRadius:8,
    borderWidth:2,
  },
  containerLayout:{
    flexDirection: 'row',
    gap:4,
  },
  textContainer:{
    flex: 1, 
    paddingHorizontal: 8, 
    paddingVertical: 4
  },
  titleText:{
    fontSize: 16,
  },
  description:{
    fontSize: 14, 
    paddingHorizontal: 4
  }
})


const ErrorAlert = ({title, msg,}:props) => {
  return (
    <View style={[styles.container, {borderColor: `${Colors.error}`, backgroundColor: `${Colors.errorBg}`}]} >
      <View style={[styles.containerLayout]}>
        <MaterialCommunityIcons name="close-circle" size={24} color={Colors.error} />
        <View style={[styles.textContainer]}>
          <Text style={[globalStyles.fontSemibold, styles.titleText, {color: `${Colors.errorTitle}`}]}>{title}</Text>
          {msg && (
            <Text style={[styles.description,{color: `${Colors.errorText}`}]}>{msg}</Text>
          )}
        </View>
      </View>
    </View>
  )
}

const SuccessAlert = ({title, msg,}:props) => {
  return (
    <View style={[styles.container, {borderColor: `${Colors.success}`, backgroundColor: `${Colors.successBg}`}]} >
      <View style={[styles.containerLayout]}>
        <MaterialCommunityIcons name="check-circle" size={24} color={Colors.success} />
        <View style={[styles.textContainer]}>
          <Text style={[globalStyles.fontSemibold, styles.titleText, {color: `${Colors.successTitle}`}]}>{title}</Text>
          {msg && (
            <Text style={[styles.description,{color: `${Colors.successText}`}]}>{msg}</Text>
          )}
        </View>
      </View>     
    </View>
  )
}


const WarningAlert = ({title, msg,}:props) => {
  return (
    <View style={[styles.container, {borderColor: `${Colors.warning}`, backgroundColor: `${Colors.warningBg}`}]} >
    <View style={[styles.containerLayout]}>
      <MaterialCommunityIcons name="check-circle" size={24} color={Colors.warning} />
      <View style={[styles.textContainer]}>
        <Text style={[globalStyles.fontSemibold, styles.titleText, {color: `${Colors.warningTitle}`}]}>{title}</Text>
        {msg && (
          <Text style={[styles.description,{color: `${Colors.warningText}`}]}>{msg}</Text>
        )}
      </View>
    </View>     
  </View>
  )
}

export  {ErrorAlert, SuccessAlert, WarningAlert }