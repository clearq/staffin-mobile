import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

import { Fonts, theme } from '@/constants/Theme';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { IUser } from '@/types/UserTypes';
import pageStyle from '@/constants/Styles';
import { ICompany } from '@/types';

interface props {
  company: ICompany;
  showEditButton: boolean;
}

const CompanyAbout = ({company, showEditButton}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  
  return (
    <View>
      <Text
        style={{
          ...pageStyle.smText,
          color: theme.colors.grey0,
        }}
      >
        {company?.about}
      </Text>
    </View>
  )
}

export default CompanyAbout