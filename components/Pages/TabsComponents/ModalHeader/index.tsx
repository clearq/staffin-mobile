import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import pageStyle from '@/constants/Styles'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'

interface props {
  title: string
}


const index = ({title,}:props) => {
  const { theme } = useTheme()

  return (
    <View
      style={{backgroundColor: theme.colors.background}}
    >
      <View
        style={{...styles.container, backgroundColor:theme.colors.primary}}
      >
        <Text 
          style={{
            ...pageStyle.headline01,
            ...styles.titleText,
            color: theme.colors.white
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    height: 150,
    borderBottomLeftRadius: theme.spacing?.xl,
    borderBottomRightRadius: theme.spacing?.xl,
    justifyContent:'flex-end',
    alignItems: 'center',
    paddingBottom: theme.spacing?.xl,
    overflow: 'hidden',
  },
  titleText:{
    textAlign: 'center',
    
  }
})