import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
  background: {
    borderRadius: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})


const CardGradient = () => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['rgba(255,255,255,0.4)', 'rgba(0,0,0,0.4)']}
      style={styles.background}
      start={{ x: 0, y: 0}}
      end={{x: 1, y: 1}}
    />
  )
}

export default CardGradient