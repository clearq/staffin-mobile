import { View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native'
import React, { useState } from 'react'

import { IAuthInfo, IAuthState, useAuth } from "@/contexts/authContext";
import { Fonts, Sizes, theme } from '@/constants/Theme'
import { Avatar, ListItem, useTheme } from '@rneui/themed'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyStatusBar from '@/components/StatusBar';
import { ActivityIndicator } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/api/backend';
import UserPreferences from './UserPreferences';



const PageHeader = () => {
  const { theme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false)

  const {
    authState: { userData, userId },
    session,
    isLoading,
  } = useAuth();

  const { 
    data: user, 
    refetch: userRefetch, 
    isLoading: userIsLoading, 
    isPending,    
  } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response = await getUserById(userId!)      

      return response;
    },
    enabled: !!userId,
  }); 
  
  
  return (
    <View
      style={{
        width: "auto",
        backgroundColor: theme.colors.primary,
        paddingHorizontal: Sizes.fixPadding * 1.5,
        paddingVertical: Sizes.fixPadding,
      }}
    >
      <MyStatusBar />
      {isLoading && (
        <ActivityIndicator color={theme.colors.primary} />
      )}
      {user &&
        <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
          }}
        >
          <Text>Search</Text>

          <View
            style={{
              flexDirection:'row',
              alignItems:'center',
              gap: theme.spacing.lg,
            }}
          >

            <TouchableOpacity>
              <MaterialCommunityIcons name='bell-badge-outline' size={24} color={theme.colors.white}/>
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons name='chat-outline' size={24} color={theme.colors.white}/>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setShowDropdown(true)}
            >
              <MaterialCommunityIcons 
                name={showDropdown ? 'account-settings': 'account-settings-outline'} 
                size={24} 
                color={showDropdown ? theme.colors.secondary : theme.colors.white}
              />
            </TouchableOpacity>

          </View>
        </View>
        }

        { showDropdown && userData?.roleId === 3 &&
          <UserPreferences 
            visible={showDropdown}
            onClose={() => setShowDropdown(!showDropdown)}
            user={user}
            refetch={userRefetch}
          />
        }
    </View>
  )
}

export default PageHeader
