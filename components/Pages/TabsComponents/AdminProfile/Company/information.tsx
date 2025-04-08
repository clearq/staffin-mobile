import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

import { Fonts, theme } from '@/constants/Theme';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import pageStyle from '@/constants/Styles';
import { ICompany } from '@/types';

interface props {
  company: ICompany;
  showEditButton: boolean;
}

const CompanyInformation = ({company, showEditButton}:props) => {
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
          {`${company?.companyName}`}
        </Text>
      </View>
      
      {/* Organisation nr. */}
      <View style={{...styles.itemGroup}}>
        <MaterialCommunityIcons name='checkbook' size={16} color={theme.colors.grey0} />
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${t("organisation-number")}:`}
        </Text>
        <Text
          style={{
            ...pageStyle.headline03,
            color: theme.colors.grey0,
          }}
        >
          {`${company?.organisationNumber}`}
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
          {`${company?.contactPerson}`}
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
          {`${company?.address}`}
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
          {`${company.phoneNumber}`}
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
        {`${company.website}`}
        </Text>
      </View>
    </View>

    
  )
}

export default CompanyInformation

const styles = StyleSheet.create({
  itemGroup: {
    flexDirection: 'row',
    gap: theme.spacing?.sm,
    alignItems: 'center'
  },
})