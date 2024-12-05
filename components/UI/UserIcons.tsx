import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Colors from '@/constants/Colors';

import { User } from '@/constants/types/UserType';

interface UserIconProfileProps {
  data:User
}


// User Icon for Header in profile-page
const UserIconProfile = ({data}:UserIconProfileProps) => {

  return (
    <View 
      style={{
        justifyContent:'center',
        alignItems:'center',
        width: 84,
        height: 84,
        backgroundColor: 'white',
        borderRadius: '100%'
      }}
    >
      { data?.profileImage 
        ? <Image 
            source={{uri :data.profileImage}} 
            style={{
              width: 76,
              height: 76,
              borderRadius: '100%'
            }}
          />
          
        : (
          <View
            style={{
              backgroundColor:`${Colors.primaryLight}`,
              width: 76,
              height: 76,
              borderRadius: '100%',
              justifyContent:'center',
              alignItems:'center',
            }}
          >
            <MaterialCommunityIcons name="account" size={36} color="gray" />
          </View>
        )
      }
      
    </View>
  )
}



// User Icon for Menu-button
interface props {
  color: string
  data:User | null
}

const UserIcon = ({color, data}:props) => {

  return (
    <View 
      style={{
        justifyContent:'center',
        alignItems:'center',
        width: 32,
        height: 32,
        backgroundColor: `${color}` ,
        borderRadius: '100%'
      }}
    >
      { data && data?.profileImage 
        ? <Image 
            source={{uri :data.profileImage}} 
            style={{
              width: 28,
              height: 28,
              borderRadius: '100%'
            }}
          />
          
        : (
          <View
            style={{
              backgroundColor:`${Colors.primaryLight}`,
              width: 28,
              height: 28,
              borderRadius: '100%',
              justifyContent:'center',
              alignItems:'center',
            }}
          >
            <MaterialCommunityIcons name="account" size={20} color="gray" />
          </View>
        )
      }
      
    </View>
  )
}

export { UserIconProfile, UserIcon }