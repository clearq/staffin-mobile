import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

import { Fonts, theme } from '@/constants/Theme';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { IUser } from '@/types/UserTypes';
import pageStyle from '@/constants/Styles';

interface props {
  user: IUser;
  showEditButton: boolean;
}

const AdminInformation = ({user, showEditButton}:props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();


  return (
    <View>
      {/* Name */}
      <View style={{...styles.itemGroup}}>
        <MaterialCommunityIcons name='office-building-outline' size={16} color={theme.colors.grey0} />
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${t("company-name")}:`}
        </Text>
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${user?.companyName}`}
        </Text>
      </View>

      {/* Contact person */}
      <View style={{...styles.itemGroup}}>
        <MaterialCommunityIcons name='account-outline' size={16} color={theme.colors.grey0} />
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${t("contact-person")}:`}
        </Text>
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${user?.firstName} ${user?.lastName}`}
        </Text>
      </View>


      {/* Location */}
      <View style={{...styles.itemGroup}}>
        <MaterialCommunityIcons name='map-marker-outline' size={16} color={theme.colors.grey0} />
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${t("location")}:`}
        </Text>
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${user?.city} ${user?.country}`}
        </Text>
      </View>

      {/* Phone */}
      <View style={{...styles.itemGroup}}>
        <MaterialCommunityIcons name='cellphone' size={16} color={theme.colors.grey0} />
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${t("telephone")}:`}
        </Text>
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${user.phoneNumber}`}
        </Text>
      </View>
      
      {/* Email */}
      <View style={{...styles.itemGroup}}>
        <MaterialCommunityIcons name='email-outline' size={16} color={theme.colors.grey0} />
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${t("e-mail")}:`}
        </Text>
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${user.email}`}
        </Text>
      </View>
      
      {/* Website */}
      <View style={{...styles.itemGroup}}>
        <MaterialCommunityIcons name='web' size={16} color={theme.colors.grey0} />
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${t("web-site")}:`}
        </Text>
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {/* user website */}
        </Text>
      </View>
    </View>

    
  )
}

export default AdminInformation

const styles = StyleSheet.create({
  itemGroup: {
    flexDirection: 'row',
    gap: theme.spacing?.sm,
    alignItems: 'center'
  },
})