import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors'
import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { globalStyles } from '@/constants/globalStyles';

type props = {
  username?: string
  title?:string | null
  image?:string | null
  isCurrentUser:boolean
}

const ProfileHeader = ({username, title, image, isCurrentUser}:props) => {
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
            <TouchableOpacity style={[styles.avatarEditBtn]}>
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