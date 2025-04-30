import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/contexts/authContext';
import { Avatar, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import pageStyle from '@/constants/Styles';
import { theme } from '@/constants/Theme';
import { generateCv, getPreferredCities, getUserById, getUserPostsAndShares, getUserPreferences } from '@/api/backend';
import { fetchImageFromCDN } from '@/utils/CDN-action';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hexToRgba } from '@/utils/rgba-to-hex';
import { MessageModal } from '@/components/Modal/MessageModal';
import { useToast } from 'react-native-toast-notifications';
import StaffProfileIndex from '@/components/Pages/TabsComponents/Profile/StaffProfile';
import AdminProfileIndex from '@/components/Pages/TabsComponents/Profile/AdminProfile';
import Preferences from '@/components/Pages/TabsComponents/Preferences';

const Page = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const { isLoading, authState:{ userData, userId } } = useAuth();

  


  return (
    <View
      style={{
        backgroundColor: theme.colors.background
      }}
    >
      {isLoading }
      <Preferences />
    </View>
  )
}

export default Page