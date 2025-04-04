/**
 * Component for profile page
 */

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import pageStyle from '@/constants/Styles';
import { Sizes } from '@/constants/Theme';


interface Props {
  title: string;
  children: React.ReactNode;
  showFooter: boolean;
  footerChildren?: React.ReactNode;
  btnChildren?: React.ReactNode;
  showEditButton: boolean
}

const ProfileItemContainer:React.FC<Props>  = (props) => {
  const { theme } = useTheme()
  
  return (
    <View
      style={{
        ...styles.itemContainer,
        backgroundColor: theme.colors.background
      }}
    >
      {/* Item Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: theme.spacing.md,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            ...pageStyle.headline02,
            color: theme.colors.grey0,
          }}
        >
          {props.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: theme.spacing.sm,
          }}
        >
          {props.showEditButton &&
            <>
              {props.btnChildren}
            </>
          }
        </View>
      </View>
      
      <Divider color={theme.colors.divider} />

      {/* Item */}
      <View
        style={{ paddingVertical: theme.spacing.md}}
      >
        {props.children}
      </View>

      {props.showFooter && 
        <Divider color={theme.colors.greyOutline} />
      }

      {/* Item Footer */}
      {props.showFooter && 
        <View
          style={{ 
            alignItems: 'center',
            justifyContent:'center',
            marginTop: theme.spacing.md,
          }}
        >
          <Text>
            {props.footerChildren}
          </Text>
        </View>
      }
    </View>
  )
}

export default ProfileItemContainer


const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
  },
})