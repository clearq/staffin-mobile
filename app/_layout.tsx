import { Button, Text, Image, StyleSheet } from 'react-native';
import { Stack } from 'expo-router/stack';
import { Header } from 'react-native/Libraries/NewAppScreen';


export default function Layout() {
  return (
    <Stack>      
      <Stack.Screen name="(tabs)" 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}