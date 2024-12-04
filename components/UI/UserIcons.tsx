import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Colors from '@/constants/Colors';
import { fetchUser } from '@/store/slice/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { Post } from '@/store/slice/communitySlice';

interface UserIconProfileProps {
  userId: number
}


// User Icon for Header in profile-page
const UserIconProfile = ({userId}:UserIconProfileProps) => {
  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));    
    }
  }, [userId]);

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
      { userData?.profileImage 
        ? <Image 
            source={{uri :userData.profileImage}} 
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
}

const UserIcon = ({color}:props) => {
  const { userData, isLoading, isError } = useSelector((state: RootState) => state.user);

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
      { userData?.profileImage 
        ? <Image 
            source={{uri :userData.profileImage}} 
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