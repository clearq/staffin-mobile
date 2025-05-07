import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchImageFromCDN } from '@/utils/CDN-action';
import { theme } from '@/constants/Theme';

import { Avatar, useTheme } from '@rneui/themed';
import { DrawerActions } from '@react-navigation/native';
import { ICompany, IUser } from '@/types';
import { useAuth } from '@/contexts/authContext';

interface userProps {
  //user: IUser
  userId: number;
  image: string
  size: number
  handleUpdate: () => void
}

interface companyProps {
  company: ICompany,
  size: number
  handleUpdate: () => void
}

export const ProfileAvatar = ({userId, image, size, handleUpdate}:userProps) => {
  const { theme } = useTheme();
  const { authState, setAuthState } = useAuth()
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    const fetchUrl = async () =>{
      // console.log('staff image:', user.profileImage, user.id);

      const url = await fetchImageFromCDN({
        userId: userId,
        contentFolder: "profile",
        key: image  
      })
      setAvatar(url)
    }
    if(image) {
      fetchUrl()
    }
  },[image, userId])


  return (
    <>  
      {avatar !== ""
        ? <Avatar size={size} rounded source={{uri: avatar}} />      
        :<Avatar size={size} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
      }
    </>
  )
}

export const CompanyAvatar = ({company, size, handleUpdate}: companyProps) => {
  const { theme } = useTheme();
  const { authState, setAuthState } = useAuth()
  const [avatar, setAvatar] = useState("")


  return (
    <>
      {avatar !== ""
        ? <Avatar size={size} rounded source={{uri: avatar}} />      
        :<Avatar size={size} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
      }
    </>
  )
}