import { View, Text, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import pageStyle from '@/constants/Styles';
import { Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { commonStyles, Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAuth } from '@/contexts/authContext';
import HeaderTemplate from '../headerTemplate';

interface props {
  visible: boolean;
  onClose: () => void
}


const AllActivity = ({visible, onClose}: props) => {
  const { theme } = useTheme()
    const { t } = useTranslation();
    const toast = useToast();
    const { 
      authState:{ 
        userData, 
        userId,
      } 
    } = useAuth();


  return (

    <HeaderTemplate 
      title={t("activity")}
      visible={visible}
      onClose={onClose}
      children={
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

            {/* 🚧 Insert post list */}
            <Text>Posts</Text>

          </ScrollView>
        </View>
      }
    />

  )
}

export default AllActivity