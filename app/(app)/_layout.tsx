import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store/store';
import Colors from '@/constants/Colors';

export default function Layout() {
  const { userData } = useSelector((state: RootState) => state.auth);
  console.log('userData:', userData)
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  

  return (
    <>
      {/* Call Staff Page */}
      {userData && !isAdmin &&              
        <Stack.Screen name="staff/(tabs)/" options={{ headerShown: true }} />   
      } 

      {/* Call Admin Page */}
      {userData && isAdmin && 
        <Stack.Screen name="admin/(tabs)/" options={{ headerShown: true }} />
      }    
       
        <>
          <Stack.Screen name="(app)/index" options={{ headerShown: false }} />
        </>
      
    </>

  );
}