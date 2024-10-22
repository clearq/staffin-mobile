import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import { StatusBar } from 'expo-status-bar'

const App = () => {
  return (
    <View className='flex-1'>   
    
      <SafeAreaView className='flex-1 mx-5 my-12 justify-between'>
        <View>
        
        </View>

        <StatusBar style='light' />
      </SafeAreaView>
        
    </View>
  )
}

export default App
