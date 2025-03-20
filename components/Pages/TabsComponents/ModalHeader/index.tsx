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
        style={{...styles.container, backgroundColor:theme.colors.secondary}}
      >
        <Text 
          style={{
            ...pageStyle.headline01,
            ...styles.titleText,
            color: theme.colors.grey0
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
    borderEndStartRadius: theme.spacing?.xl,
    borderEndEndRadius: theme.spacing?.xl,
    justifyContent:'flex-end',
    alignItems: 'center',
    paddingBottom: theme.spacing?.xl
  },
  titleText:{
    textAlign: 'center',
    
  }
})