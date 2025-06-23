import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import *as ImagePicker from 'expo-image-picker'
import { useToast } from "react-native-toast-notifications";
import { getItem, setItem } from '@/utils/asyncStorage';

import { fetchImageFromCDN, getImageUrl } from '@/utils/CDN-action';

import { IExperience, IUser } from '@/types/UserTypes'
import { IPost } from '@/types/PostTypes'
import { Avatar, Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import pageStyle from '@/constants/Styles';
import { CDN_TOKEN, CDN_USERNAME } from '@/constants/key';

import { autoLoginToCDN, deleteStaffSkill, updateUserProfileImage, uploadContentFile } from '@/api/backend';

import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'expo-router';
import CreatePostModal from '../Activity/CreatePostModal';
import { ProfileAvatar } from '@/components/UI/ProfileAvatar';

interface props {
  user: IUser;
  showEditButton: boolean;
  refetch : () => void
}


const ProfileHeader = ({user, showEditButton, refetch}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()
  const { authState, setAuthState } = useAuth()
  const [avatar, setAvatar] = useState("")

  const handleImageUpdate = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images'],
      allowsEditing: true,
      quality: 1,
    });  
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      
      const file = result.assets[0];
      const userId = user.id;
      const contentFolder = "profile";
      const key = `${userId}_${file.fileName}`;
      
      try {  
        let token = await getItem(CDN_TOKEN) || (await autoLoginToCDN());
            
        // CDN
        await uploadContentFile(key, file, token, userId, contentFolder)
        console.log("File uploaded successfully.");
        
        // databse
        await updateUserProfileImage({imageData:key, userId:user.id});

        setAuthState((prev) => ({
          ...prev,
          profileImage: key,
        }))
        
        toast.show(`${t("success-update-message")}`, {
          type: "success"
        })

        refetch()
        
      } catch (error) {
        toast.show(`${t("failed-update-message")}`, {
          type: "error",
        });
      } 
    }
  }


  return (
    <View
      style={{
        ...styles.headerContainer,
        backgroundColor: theme.colors.primary
      }}
    >

      <View
        style={{
          ...styles.headerTextContainer,
          backgroundColor: theme.colors.searchBg,
        }}
      >
        <Text
          style={{
            ...styles.headerText,
            ...pageStyle.headline01,
            color: theme.colors.grey0
          }}
        >
          {`${user?.firstName} ${user?.lastName}`}
        </Text>

        <Text
          style={{
            ...styles.headerText,
            ...pageStyle.headline03,
            color: theme.colors.grey0
          }}
        >
          {`${user?.title}`}
        </Text>

      </View>
    
      <View
        style={{
          ...styles.avatarContainer,
          backgroundColor: theme.colors.background
        }}
      >
        <ProfileAvatar 
          userId={user.id}
          image={user.profileImage}
          size={80}
          handleUpdate={() => refetch()}
        />

        {/* {avatar !== "" 
          ? <Avatar size={80} rounded source={{uri: avatar }} />      
          :<Avatar size={80} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
        } */}

        {showEditButton && (
          <TouchableOpacity
            style={{
              ...styles.imageEditButton,
              backgroundColor: theme.colors.searchBg
            }}
            onPress={handleImageUpdate}
          >
            <MaterialCommunityIcons 
              name='pencil' 
              size={24}
              color={theme.colors.grey3}
            />
          </TouchableOpacity>)}
      </View>
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 150,
    position: 'relative'
  },
  avatarContainer: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    width: 92,
    height: 92,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTextContainer: {
    position:'absolute',
    bottom: 0,
    width: '100%',
    height: 64,
  },
  headerText: {
    left: 128,
  },
  imageEditButton: {
    borderRadius: 100,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    bottom: 4,
  },
  
  itemEditButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});