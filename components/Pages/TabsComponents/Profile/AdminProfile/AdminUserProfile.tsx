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

import { autoLoginToCDN, deleteStaffSkill, updateUserProfileImage, uploadContentFile } from '@/api/backend';

import ProfileItemContainer from '../ProfileListContainer';

import { useAuth } from '@/contexts/authContext';

import AdminInformation from './Admin/information';
import AdminActivity from './Admin/activity';
import AdminInfoModal from './Admin/Edit/AdminInfoModal';
import { useRouter } from 'expo-router';
import CreatePostModal from '../Activity/CreatePostModal';
import ProfileHeader from '../ProfileHeader';



interface props {
  user: IUser;
  showEditButton: boolean;
  post: IPost[];
  refetch : () => void
}

const AdminUserProfile = ({user, showEditButton, post, refetch}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()
  const { authState: {userData}, setAuthState } = useAuth()
  const [avatar, setAvatar] = useState("")

  const [openEditInfoDialog, setOpenEditInfoDialog] = useState<boolean>(false)
  const [openCreateActivityDialog, setOpenCreateActivityDialog] = useState<boolean>(false)


  return (
    <View
      style={{
        flexDirection:'column',
        gap: theme.spacing.md,
      }}
    >
    
      {/* header */}
      <ProfileHeader 
        user={user}
        showEditButton={showEditButton}
        refetch={refetch}
      />


      {/* Main */}
      <ProfileItemContainer
        title={t("information")}
        children={<AdminInformation user={user} showEditButton={showEditButton} />}
        showFooter={false}
        showEditButton={showEditButton}
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenEditInfoDialog(!openEditInfoDialog)}
          >
            <MaterialCommunityIcons 
              name='pencil' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
      />

      <ProfileItemContainer
        title={t("activity")}
        children={<AdminActivity post={post} />}
        showFooter={post.length > 0}
        showEditButton={showEditButton}
        btnChildren={
          <TouchableOpacity
            style={{
              borderRadius: theme.spacing.sm,
              borderColor: theme.colors.primary,
              borderWidth: 2,
              padding: theme.spacing.sm,
            }}
            onPress={() => setOpenCreateActivityDialog(true)}
          >
            <Text
              style={{
                ...pageStyle.button16,
                color: theme.colors.primary
              }}
            >
              {`${t("create-post")}`}
            </Text>
          </TouchableOpacity>
        }
        footerChildren={
          <>
            {post.length
              ? (
                <TouchableOpacity
                  onPress={() => {
                    router.push("/activity")
                  }}
                >
                  <Text
                    style={{
                      ...pageStyle.button16,
                      color: theme.colors.grey0
                    }}
                  >
                    {`${t("see-all-posts")}`}
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )
            }            
          </>
        }
      />


      {/* Dialog */}
      <AdminInfoModal 
        visible={openEditInfoDialog}
        user={user}
        onClose={() => setOpenEditInfoDialog(!openEditInfoDialog)}
        handleSuccess={() => refetch()}
      />

      <CreatePostModal 
        visible={openCreateActivityDialog}
        onClose={() => setOpenCreateActivityDialog(!openCreateActivityDialog)}
      />
    </View>
  )
}

export default AdminUserProfile

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