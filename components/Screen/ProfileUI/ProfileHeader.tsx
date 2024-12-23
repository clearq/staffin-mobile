import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/Colors'
import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { globalStyles } from '@/constants/globalStyles';
import *as ImagePicker from 'expo-image-picker'
import { updateStaff } from '@/api/staff';
import { getUser, User } from '@/api/user';
import { useAppSelector } from '@/store/reduxHooks';

type props = {
  user:Partial<User>
  username?: string
  title?:string | null
  image?:string | null
  isCurrentUser:boolean
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const ProfileHeader = ({username, title, image, isCurrentUser, user, setUser}:props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(image);
  const { authUser } = useAppSelector((state) => state.auth);
  const token = authUser?.token

  const handleImageUpdate = async () => {
    if(!token || !authUser?.id) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        setIsUploading(true);
        const selectedImageUri = result.assets[0].uri;
  
        const updatedUserData: Partial<User> = { ...user, profileImage: selectedImageUri };
  
        await updateStaff(updatedUserData, token);

        const updatedUser = await getUser(authUser.id);
        
        setUser(updatedUser);
        Alert.alert("Success", "Profile image updated successfully!");
      } catch (error) {
        console.error("Error updating profile image:", error);
        Alert.alert("Error", "Failed to update profile image.");
      } finally {
        setIsUploading(false);
      }
    }
  }


  return (
    <View style={[styles.container]}>
      <View style={styles.textAreaContainer}>
        
        <View style={[styles.avatar,]}>
          {image 
          ?(
            <View style={[styles.borderCircle,{ width: 64, height: 64, borderRadius: '100%' }]}>
              <Image source={{ uri: image }} style={[{ width: 56, height: 56, borderRadius: '100%', bottom: 0, left:0, }]} />
            </View>
          ):(
            <Avatar.Icon 
              style={styles.borderCircle}
              size={64}
              icon = {() => 
                <MaterialCommunityIcons 
                  name='account'
                  size={36}
                  color={colors.white}
                />
              }
            />
          )}

          {isCurrentUser && (
            <TouchableOpacity 
              style={[styles.avatarEditBtn]}
              onPress={handleImageUpdate}
              disabled={isUploading}
            >
              <MaterialCommunityIcons name='camera' size={16} color={colors.gray}/>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.textGroup}>
          <Text style={[globalStyles.subTitleText]}>
            {username? username : 'UserName'}
          </Text>
          <Text style={[globalStyles.smText, {color: colors.gray}]}>
            {title? title : 'Title'}
          </Text>
        </View>
    
      </View>
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  container:{
    width:'100%', 
    height:120, 
    backgroundColor:colors.primary,
    position: 'relative',
  },
  textAreaContainer:{
    position:'absolute',
    bottom:0,
    width:'100%',
    height:48,
    backgroundColor:colors.white,
  },
  avatar:{
    position:'absolute',
    bottom: 4,
    left:16,
  },
  borderCircle:{
    borderWidth:4,
    borderColor:colors.white,
  },
  textGroup:{
    position:'absolute',
    bottom:8,
    left:96,
  },
  avatarEditBtn:{
    width:32, 
    height:32, 
    backgroundColor:colors.tintColor, 
    borderRadius:'100%', 
    justifyContent:'center', 
    alignItems:'center',
    position:'absolute',
    right:-8,
    bottom:0,
    borderColor:colors.white,
    borderWidth:2
  },
})