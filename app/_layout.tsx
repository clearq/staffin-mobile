import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { Slot, SplashScreen } from 'expo-router';

import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store/store';
import Layout from './(app)/_layout';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter_24pt-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_24pt-Medium.ttf"),
    "Inter-Regular":require("../assets/fonts/Inter_24pt-Regular.ttf"),
    "Inter-SemiBold":require("../assets/fonts/Inter_24pt-SemiBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}

