import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export { ErrorBoundary } from "expo-router"; // Catch any errors thrown by the Layout component.
import * as Updates from "expo-updates";


import "@/i18n.config"
import { useFonts } from 'expo-font';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from 'expo-splash-screen';

import { Switch, ThemeMode, ThemeProvider as ThemeProviderUI, useThemeMode } from "@rneui/themed";
import { theme } from "@/constants/Theme";

import { getItem, setItem } from "@/utils/asyncStorage";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthProvider } from "@/contexts/authContext";
import { UserTypeProvider } from "@/contexts/userTypeContext";

export const unstable_settings = {
  initialRouteName: "/",
};

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  // 🚧 Add Staffin font 'Coolvetica' 🚧
  const [loaded, error] = useFonts({
    Coolvetica: require("@/assets/fonts/CoolveticaRg.ttf"),
    InterRegular: require("@/assets/fonts/InterRegular.ttf"),
    InterMedium: require("@/assets/fonts/InterMedium.ttf"),
    InterSemibold: require("@/assets/fonts/InterSemibold.ttf"),
    // Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
    // PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    // PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync();
      const time = setTimeout(() => {
        setAppIsReady(true);
      }, 2000);
      return () => clearTimeout(time);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return ( 
    <ToastProvider
      placement="top"
      swipeEnabled={true}
      style={{ marginVertical: 5 }}
      animationType="slide-in"
      duration={5000}
      animationDuration={250}
      offsetTop={50}
      offsetBottom={50}
      dangerColor="#ef4444"
      warningColor="#f59e0b"
      successColor="#22c55e"
      normalColor="#a3a3a3"
      successIcon={<MaterialIcons name="check-circle" color={"white"} size={25} />}
    >
      <AuthProvider>               
        <UserTypeProvider>
          <RootLayoutNav />
        </UserTypeProvider>
      </AuthProvider>   
    </ToastProvider> 
  );
};

export default RootLayout

const development = process.env.NODE_ENV === "development";


function RootLayoutNav() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });
  const { mode, setMode } = useThemeMode();
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!development) {
      onFetchUpdateAsync();
    }
  }, []);

  useEffect(() => {
    const fetchTheme = async () => {
      const theme = (await getItem("theme")) as ThemeMode;
      if (!theme) {
        await setItem("theme", "light");
      } else {
        setMode(theme)
      }
      
      setThemeMode(theme);
    };
    fetchTheme();
  }, []);

  
  theme.mode = themeMode;

  return (
    <ThemeProviderUI theme={theme} >
      <QueryClientProvider client={queryClient} >     
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="onBoarding" options={{headerShown: false}} />
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            <Stack.Screen name="(app)/(tabs)" options={{headerShown: false}} />
          </Stack>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ThemeProviderUI>
  )}