import { View, Image, Button } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '@/constants/Colors';


const StaffTabsLayout = () => {

  return (
    <Tabs
      screenOptions={{ 
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.tintColor,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.tintColor,
          height: 84,
        },
        headerStyle:{
          backgroundColor: colors.primaryDark,
          height: 64,
        }, headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // headerRight: () =>  <Button onPress={handleLogout } title="Log Out" />,
        // headerLeft:() => ;
      }} 
    >
        <Tabs.Screen 
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home-outline" color={color} />,
            headerShown: false
          }}
        />
        <Tabs.Screen 
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="chat-outline" color={color} />,
            headerShown: false
          }}
        />
        <Tabs.Screen 
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account-circle-outline" color={color} />,
            headerShown: false
          }}
        />
        <Tabs.Screen 
          name="jobs"
          options={{
            title: "Jobs",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="briefcase-outline" color={color} />,
            headerShown: false
          }}
        />
        <Tabs.Screen 
          name="network"
          options={{
            title: "Network",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account-group-outline" color={color} />,
            headerShown: false
          }}
        />
      </Tabs>
  )
}

export default StaffTabsLayout