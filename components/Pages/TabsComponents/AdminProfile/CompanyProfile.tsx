import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import *as ImagePicker from 'expo-image-picker'
import { useToast } from "react-native-toast-notifications";
import { getItem, setItem } from '@/utils/asyncStorage';

import { fetchImageFromCDN, getImageUrl } from '@/utils/CDN-action';

import { IExperience, IUser } from '@/types/UserTypes'
import { ICompany, IPost } from '@/types/'
import { Avatar, Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import pageStyle from '@/constants/Styles';
import { CDN_TOKEN, CDN_USERNAME } from '@/constants/key';

import { autoLoginToCDN, deleteStaffSkill, updateUserProfileImage, uploadContentFile } from '@/api/backend';
import CompanyInformation from './Company/information';
import ProfileItemContainer from '../ProfileListContainer';
import { useAuth } from '@/contexts/authContext';
import CompanyAbout from './Company/about';
import CompanyActivity from './Company/activity';



interface props {
  company: ICompany;
  showEditButton: boolean;
  post: IPost[];
  refetch : () => void
}

const CompanyProfile = ({company, showEditButton, post, refetch}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const { authState, setAuthState,} = useAuth()
  const [avatar, setAvatar] = useState("")

  const [openEditInfoDialog, setOpenEditInfoDialog] = useState<boolean>(false)
  const [openEditAboutDialog, setOpenEditAboutDialog] = useState<boolean>(false)
  const [openAllActivityDialog, setOpenAllActivityDialog] = useState<boolean>(false)

  
  // Update Image file as Base64 (Don't use CDN)
  const handleImageUpdate = async () => {
    
  }
  
  useEffect(() => {
    const fetchUrl = async () =>{
      if(company && company.image !== "") {

      }
      return setAvatar("")
    }
    fetchUrl()
  },[])
  
  return (
    <View
      style={{
        flexDirection:'column',
        gap: theme.spacing.md,
      }}
    >
    
      {/* header */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: theme.colors.secondary
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
            {`${company.companyName}`}
          </Text>


        </View>
      
        <View
          style={{
            ...styles.avatarContainer,
            backgroundColor: theme.colors.background
          }}
        >
          {avatar !== "" 
            ? <Avatar size={80} rounded source={{uri: avatar }} />      
            : <Avatar size={80} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
          }

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
                color={ theme.mode === 'light'
                  ? theme.colors.grey3
                  : theme.colors.white
                }
              />
            </TouchableOpacity>)}
        </View>
      </View>

      {/* Main */}
      <ProfileItemContainer
        title={t("information")}
        children={<CompanyInformation company={company} showEditButton={showEditButton} />}
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
        title={t("about")}
        children={<CompanyAbout company={company} showEditButton={showEditButton}/>}
        showFooter={false}
        showEditButton={showEditButton}
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenEditAboutDialog(true)}
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
        children={<CompanyActivity post={post} />}
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
                    setOpenAllActivityDialog(true)
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
      
    </View>
  )
}

export default CompanyProfile


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