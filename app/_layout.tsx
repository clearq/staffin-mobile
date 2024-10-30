import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
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
      <Layout />
    </Provider>
  );
}

function Layout() {
  const { userData } = useSelector((state: RootState) => state.auth);
  console.log('userData in from signin-page', userData)
 

  return (
    <Stack>
      {userData ? (
        <>
        <Stack.Screen name="(tabs)/" options={{ headerShown: false }} />
          {/* {userData.role === 1 && (
            <Stack.Screen name="(auth)/staff" options={{ headerShown: false }} />
          )}
          {userData.role === 2 && (
            <Stack.Screen name="(auth)/admin" options={{ headerShown: false }} />
          )} */}
        </>
        ) : (
        <>
          <Stack.Screen name="(auth)" options={{ headerShown: true }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}