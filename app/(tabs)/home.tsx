import { View, Text, StyleSheet, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import UserService from '@/api/user';


export default function Tab() {
  const [user, setUser] = useState('')
  const userId = 1

  //const data = UserService.getUserById(userId)

  

  return (
    <View>
      <Text>Hello {user}!</Text>
    </View>
  );
}


