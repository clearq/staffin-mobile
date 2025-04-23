import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import pageStyle from '@/constants/Styles'
import { theme } from '@/constants/Theme'
import { Divider, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import page from '@/app/(app)/(tabs)/application'

const PostTemplate = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <View 
      style={{
        ...styles.postContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      
      {/* Header */}
      <View style={{...styles.headerContainer}}>

        <View style={{...styles.userContainer}}>
          <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: theme.colors.disabled}}/>

          <View style={{...styles.headerTextGroup}}>
            <Text 
              style={{
                ...pageStyle.headline03, 
                color: theme.colors.grey0
              }}
            >
              Auther Name
            </Text>

            <Text
              style={{
                ...pageStyle.xsText, 
                color: theme.colors.grey0
              }}
            >
              Job title
            </Text>

            <Text
              style={{
                ...pageStyle.xsText, 
                color: theme.colors.grey0,
              }}
            >
              1w
            </Text>
          </View>
        </View>

        <View style={{...styles.headerButtonGroup}}>
          <TouchableOpacity
            style={{
              ...styles.followButton,
              borderColor: theme.colors.primary,
            }}
          >
            <Text
              style={{
                ...pageStyle.button16,
                color: theme.colors.primary,
              }}
            >
              Follow
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name='dots-vertical' size={24} color={theme.colors.grey0} />
          </TouchableOpacity>
        </View>
      </View>

      <Divider />

      {/* Body */}
      <View style={{...styles.bodyContainer}}>  

        <View style={{...styles.contentContainer}}>
          
          {/* Text content */}
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quae possimus nisi porro reiciendis ipsam voluptate veritatis aspernatur dignissimos aliquam non enim ducimus assumenda, iure nam, optio impedit voluptatibus at?
          </Text>

          {/* Image content */}
          <View style={{width: '100%', height: 250, backgroundColor: theme.colors.disabled}}/>

          {/* Reactions */}
          <View style={{...styles.reactionGroup}}>
            <Text>0 Likes</Text>
            
            <Text>
              <Text>0 Comments</Text>
              <Text>0 Reposts</Text>
            </Text>
          </View>

        </View>


             
      </View>

      <Divider />

      {/* Footer */}
      <View style={{...styles.footerContainer}}>
        <View style={{width:24, height:24, backgroundColor: theme.colors.disabled}}/>
        <View style={{width:24, height:24, backgroundColor: theme.colors.disabled}}/>
        <View style={{width:24, height:24, backgroundColor: theme.colors.disabled}}/>
        <View style={{width:24, height:24, backgroundColor: theme.colors.disabled}}/>
      </View> 
    </View>
  )
}

export default PostTemplate

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    padding: theme.spacing?.md,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing?.sm,
  },
  bodyContainer: {
    paddingVertical: theme.spacing?.sm
  },
  contentContainer: {
    flexDirection: 'column',
    gap: theme.spacing?.sm,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing?.sm
  },
  headerTextGroup: {
    flexDirection: 'column',
  },
  userContainer: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerButtonGroup: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  reactionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  followButton: {
    paddingHorizontal: theme.spacing?.lg,
    height: 36,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})