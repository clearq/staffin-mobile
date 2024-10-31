import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store/store';

export default function Layout() {
  const { userData } = useSelector((state: RootState) => state.auth);
  console.log('userData:', userData)
  

  return (
    <Stack>
      {userData ? (      
        <Stack.Screen name="(tabs)/" options={{ headerShown: false }} />         
        ) : (
        <>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)/index" options={{ headerShown: false }} />
        </>
      )}
    </Stack>

  );
}