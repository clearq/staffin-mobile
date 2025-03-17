import { View, Text, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import pageStyle from '@/constants/Styles';
import { Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { commonStyles, Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { getEducation, getExperience } from '@/api/backend';
import dayjs from 'dayjs';
import { useAuth } from '@/contexts/authContext';
import { IEducation, IExperience, IUser } from '@/types/UserTypes';
import Button from '@/components/UI/Button';

interface props {
  title: string;
  visible: boolean;
  onClose: () => void
  children: React.ReactNode
}

const HeaderTemplate = ({title, visible, onClose, children}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();


  
  return (
    <Modal
      visible={visible}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: Sizes.fixPadding,
            backgroundColor: theme.colors.background,
            gap: theme.spacing.md,
            alignItems: 'center',
            borderBottomWidth:1,
            borderBottomColor: theme.colors.greyOutline
          }}
        >
          <TouchableOpacity
            onPress={onClose}
          >
            <MaterialCommunityIcons 
              name='chevron-left' 
              size={24} 
              color={theme.colors.grey0}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...pageStyle.headline01,
              color: theme.colors.grey0,
              alignItems: 'center'
            }}
          >
            {title}
          </Text>
        </View>


        <View
          style={{
            ...pageStyle.pageComponent,
            justifyContent: 'center',
            backgroundColor: theme.colors.background
          }}
        >
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >
  
            {/* 🚧 Add lists */}
            {children}
           
            
          </ScrollView>
        
        </View>
      
      </SafeAreaView>
    </Modal>
  )
}

export default HeaderTemplate

const styles = StyleSheet.create({
  itemEditButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  footerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing?.md,
    gap: theme.spacing?.md,
  },
  buttonStyle:{
    borderRadius: 100,
    padding: Sizes.fixPadding,
    borderWidth:2
  }
})