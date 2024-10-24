import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import { useState } from 'react';


const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const api = axios.create({
  baseURL,
  timeout: 30000,
});



export default function Tab() {
  const [data, setData] = useState('')

  axios.get('https://staffin.clearq.se/api/User/GetUser-id?userId=1', { 
    
}) 
    .then(function (response) { 
        console.log(response); 
        setData(response.data.firstName)
    }) 
    .catch(function (error) { 
        console.log(error) ; 
    }) 
    


  
  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
}


