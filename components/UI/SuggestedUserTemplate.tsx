import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import pageStyle from '@/constants/Styles'
import { IMatchingJob } from '@/types/JobTypes'
import { useQuery } from '@tanstack/react-query'
import { ISuggestedUser } from '../Pages/Home/StaffHome'
import { ProfileAvatar } from './ProfileAvatar'

interface props {
  user: ISuggestedUser
  following: boolean
} 

const SuggestedUserTemplate = ({user, following}: props ) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <View
      style={{
        ...styles.cardContainer,
        ...pageStyle.cardShadow,
        backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black
      }}
    >
      <ProfileAvatar
        userId={user.userId}
        image={user.profileImage}
        size={40}
        handleUpdate={() => {}}
      />

      <View
        style={{...styles.textGroup}}
      >
        <Text 
          style={{
            ...pageStyle.headline03, 
            color: theme.colors.grey0,
            flexWrap: 'wrap'
          }}>
            {user.fullName}
        </Text>

        <Text style={{...pageStyle.xsText, color: theme.colors.grey0}}>
          {user?.location ? user?.location : ""}
        </Text>
        
        <Text 
          style={{...pageStyle.xsText, color: theme.colors.grey0}}
          ellipsizeMode='clip'
          numberOfLines={2}
        >
          {user?.title? user.title : ""}
        </Text>

      </View>
      
      <View style={{flexDirection: 'column', gap: theme.spacing.sm, marginTop: theme.spacing.sm}}>  
        <TouchableOpacity
          style={{...styles.smButton, backgroundColor: theme.colors.secondary}}
        >
          <Text style={{...pageStyle.button16, color: theme.colors.white}}>
            {following ? t("unfollow") : t("follow")}
          </Text>
        </TouchableOpacity>
      </View>    
    </View>
  )
}

export default SuggestedUserTemplate

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
    padding: theme.spacing?.md,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 150,
    borderRadius: 10,
    marginLeft: theme.spacing?.md,
  },
  textGroup : {
    flexDirection: 'column',
    // gap: theme.spacing?.sm
  },
  smButton: {
    paddingVertical: theme.spacing?.xs,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})