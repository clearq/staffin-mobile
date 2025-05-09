import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@/constants/Theme'
import pageStyle from '@/constants/Styles'

interface bubbleProps {
  children: React.ReactNode
}

const TalkBubble = ({children}: bubbleProps) => {

  return (
    <View style={{...styles.bubbleContainer}}>
      <View style={{...styles.bubbleSquare, ...pageStyle.cardPrimaryColor}}>
        
        {children}  

      </View>
      <View style={{...styles.bubbleTriangle}} />
    </View>
  )
}

export default TalkBubble

const styles = StyleSheet.create({
  bubbleContainer: {
      backgroundColor: "transparent",
    },
    bubbleSquare: {
      width: '100%',
      padding: theme.spacing?.lg,
      borderRadius: 10,
    },
    bubbleTriangle: {
      position: "absolute",
      right: "50%",
      bottom: -38,
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderRightWidth: 40,
      borderTopWidth: 40,
      borderRightColor: "transparent",
      borderTopColor: "rgb(213, 213, 235)",
      transform: [{ rotate: "90deg" }],
    },
})