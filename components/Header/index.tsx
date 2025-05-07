import { View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native'
import React, { useState } from 'react'

import { IAuthInfo, IAuthState, useAuth } from "@/contexts/authContext";
import { Fonts, Sizes, theme } from '@/constants/Theme'
import { Avatar, Divider, ListItem, useTheme } from '@rneui/themed'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyStatusBar from '@/components/StatusBar';
import { ActivityIndicator } from 'react-native';

import { ProfileAvatar } from '../UI/ProfileAvatar';
import { useUserData } from '@/hooks/useUserData';



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
  } = useUserData(Number(userId));
  
  
  return (
    <View
      style={{
        width: "auto",
        backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black,
        //paddingHorizontal: Sizes.fixPadding * 1.5,
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
            paddingHorizontal: Sizes.fixPadding,
            paddingVertical: theme.spacing.md,
            borderColor: theme.colors.divider,
            borderBottomWidth: 0.5,
          }}
        >
          <View
            style={{flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center'}}
          >

            <View
              style={{
                flexDirection:'row',
                alignItems:'center',
                gap: theme.spacing.lg,
              }}
            >
              <ProfileAvatar 
                userId={user.id}
                image={user.profileImage}
                size={50}
                handleUpdate={() => {}}
              />
  
              <TouchableOpacity
                style={{...styles.searchContainer, backgroundColor: theme.colors.searchBg}}
              >
                <Text style={{color: theme.colors.grey0}}>Search</Text>
                <MaterialCommunityIcons name='magnify' size={20} color={theme.colors.grey0} />
              </TouchableOpacity>

            </View>

            {/* <TouchableOpacity>
              <MaterialCommunityIcons name='bell-badge-outline' size={24} color={theme.colors.grey0}/>
            </TouchableOpacity> */}  
          </View>
          <View>
            <TouchableOpacity>
              <MaterialCommunityIcons name='chat-outline' size={24} color={theme.colors.grey0}/>
            </TouchableOpacity>
          </View>
        </View>
      }

    </View>
  )
}

export default PageHeader

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: theme.spacing?.xs,
    paddingHorizontal: theme.spacing?.md,
    borderRadius: 10,
    flexDirection: 'row',
    gap: theme.spacing?.xl,
  }
})
