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
import { IPost } from '@/types';

interface props {
  post: IPost[]
}

const AllActivity = ({post}:props) => {
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
    <View
      style={{
        ...pageStyle.pageComponent,
        backgroundColor: 'red',
        height: '100%'
      }}
    >

      <View style={{flexDirection:'column'}}>
        {!post.length &&
          <View style={{}}>
            <Text 
              style={{
                ...pageStyle.headline02, 
                color: theme.colors.grey0,
              }}
            >
              {t("no-activity-messag")}
            </Text>
          </View>
        } 

        {/* 🚧 Insert post list */}
        <Text 
          style={{
            ...pageStyle.headline02, 
            color: theme.colors.grey0
          }}
        >
          Posts
        </Text>
        

      </View>

    </View>
  )
}

export default AllActivity