import { View, Text, StyleSheet, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import axios from "axios";

const BASE_URL = "https://staffin.clearq.se/api";

const Staffin_API = {
  BASE_URL,
}

export default function Tab() {


  const [user, setuser] = useState('')
  const userId = 1

  const data = axios(`${Staffin_API.BASE_URL}/User/GetUser-id?userId=${userId}`)
  .then((res) => setuser(res.data.firstName) )

  console.log(data)

  return (
    <View>
      <Text>Hello {user}!</Text>
    </View>
  );
}


