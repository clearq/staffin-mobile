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
    <Stack>
      {/* Call Staff Page */}
      {userData && !isAdmin &&              
        <Stack.Screen name="staff" options={{ headerShown: true }} />   
      } 

      {/* Call Admin Page */}
      {userData && isAdmin && 
        <Stack.Screen name="admin" options={{ headerShown: true }} />
      }    
            
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name='(auth)' options={{ headerShown: false}} />
        
      
    </Stack>

  );
}