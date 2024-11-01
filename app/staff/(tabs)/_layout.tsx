import { Button } from 'react-native';
import { Tabs, useRouter } from 'expo-router';

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import CustomHeader from '@/components/CustomHeader';

import { logout } from '@/store/slice/authSlice';
import { useAppDispatch } from '@/store/reduxHooks';


export default function TabLayout() {

  //Logout
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async() => {
    try {
      await dispatch(logout()).unwrap(); 
      router.push('/(auth)/sign-in');
      console.log('logout')
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <Tabs
      screenOptions={{ 
        tabBarActiveTintColor: "#ED8F59",
        tabBarInactiveTintColor: "#B4BEC0",
        tabBarStyle: {
          backgroundColor: "#FCFCFC",
          borderTopWidth: 1,
          borderTopColor: "#B4BEC0",
          height: 84,
        },
        headerStyle:{
          backgroundColor:`${Colors.dark}`,
          height: 120,
        }, headerTintColor: `${Colors.white}`,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <Button onPress={handleLogout } title="Log Out" />,
        headerLeft: () => <CustomHeader />
      }} 
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home" color={color} />,
          headerShown: true
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="chat-processing-outline" color={color} />,
          headerShown: true
        }}
      />   
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: (
            { color }) => <MaterialCommunityIcons size={28} name="account-circle-outline" color={color} />,
          headerShown: true
        }}
      />   
      
      <Tabs.Screen
        name="jobs"
        options={{
          title:'Jobs',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="briefcase-outline" color={color} />,
          headerShown: true
        }}
      />   
      <Tabs.Screen
        name="network"
        options={{
          title: 'Network',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account-group-outline" color={color} />,
          headerShown: true
        }}
      />  
    </Tabs>  
  );
}


