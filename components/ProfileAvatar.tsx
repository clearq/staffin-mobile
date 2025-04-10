import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserById, getUserPostsAndShares } from '@/api/backend';
import { fetchImageFromCDN } from '@/utils/CDN-action';
import { theme } from '@/constants/Theme';

import { Avatar, useTheme } from '@rneui/themed';
import { DrawerActions } from '@react-navigation/native';
import { ICompany, IUser } from '@/types';
import { useAuth } from '@/contexts/authContext';

interface userProps {
  user: IUser
  size: number
  handleUpdate: () => void
}

interface companyProps {
  company: ICompany,
  size: number
  handleUpdate: () => void
}

export const ProfileAvatar = ({user, size, handleUpdate}:userProps) => {
  const { theme } = useTheme();
  const { authState, setAuthState } = useAuth()
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    const fetchUrl = async () =>{
      // console.log('staff image:', user.profileImage, user.id);
      const url = await fetchImageFromCDN(user)
      setAvatar(url)
    }
    if(user?.profileImage) {
      fetchUrl()
    }
  },[user?.profileImage])


  return (
    <>  
      {avatar !== ""
        ? <Avatar size={size} rounded source={{uri: avatar}} />      
        :<Avatar size={size} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
      }
    </>
  )
}

export const companyAvatar = () => {
  const [avatar, setAvatar] = useState("")


  return (
    <>
    </>
  )
}