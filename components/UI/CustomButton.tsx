import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

type Props = {
  title: string
  handlePress: ()=>void
  containerStyles: {}
  textColor: string
  isLoading:boolean
}

const ButtonLg = ({title, handlePress, containerStyles, textColor, isLoading}: Props) => {

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[containerStyles, styles.btnContainer, isLoading ? { opacity: 0.6 }: {}]}
    >
      <Text
        style={[{color:textColor,}, styles.btnTextLg]}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator 
          animating={isLoading}
          color={textColor}
        />
      )}

    </TouchableOpacity>
  )
}

export {
  ButtonLg,
}

const styles = StyleSheet.create({
  btnContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
  },
  btnTextLg:{
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
})