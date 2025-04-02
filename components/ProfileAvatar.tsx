import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserById, getUserPostsAndShares } from '@/api/backend';
import { fetchImageFromCDN } from '@/utils/CDN-action';
import { theme } from '@/constants/Theme';
import { IUser } from '@/types/UserTypes';
import { Avatar, useTheme } from '@rneui/themed';
import { DrawerActions } from '@react-navigation/native';

interface props {
  user: IUser,
  size: number
}

const ProfileAvatar = ({user, size}:props) => {
 

  return (
    <>
    
    </>
  )
}

export default ProfileAvatar