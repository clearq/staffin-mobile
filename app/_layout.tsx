
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from "expo-status-bar";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import { useEffect } from 'react';
import { useRouter } from "expo-router"; 
import React from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { colors } from '@/constants/colors';


SplashScreen.preventAutoHideAsync();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log('ProtectedRoute:', isAuthenticated);
    
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter_24pt-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_24pt-Medium.ttf"),
    "Inter-Regular":require("../assets/fonts/Inter_24pt-Regular.ttf"),
    "Inter-SemiBold":require("../assets/fonts/Inter_24pt-SemiBold.ttf"),
  });

  // It loads custom fonts asynchronously during the app's startup.
  useEffect(() => {
    if (error) throw error;
    // Indicates whether the fonts have been successfully loaded.
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false, title: "Onboarding"}} />
          <Stack.Screen name="(auth)" options={{headerShown: false}} />

          <ProtectedRoute>
            <Stack.Screen name="(staff)" options={{headerShown: false}} />
            <Stack.Screen name="(admin)" options={{headerShown: false}} />
            <Stack.Screen name="(employer)" options={{headerShown: false}} />
            {/* <Stack.Screen name="/search/[query]" options={{headerShown: false}} />
            <Stack.Screen name="/user/[id]" options={{headerShown: false}} /> */}
          </ProtectedRoute>
        </Stack>
      </Provider>
    </>
  );
}
