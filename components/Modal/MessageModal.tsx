import { View, Text, Modal, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter, Link } from 'expo-router'

import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import { useAuth } from '@/contexts/authContext';
import { hexToRgba } from '@/utils/rgba-to-hex';
import { theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import { Button } from '@/components/UI/Button';


interface props {
  visible: boolean
  onClose: () => void
}

export const MessageModal = ({visible, onClose}:props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter()

  const handleProfile = () => {
    router.push('./profile')
    onClose()
  }

  return (
    <SafeAreaView style={{...styles.centeredView}}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{...styles.centeredView }}>

          <View
            style={{
              ...styles.modalView,
              backgroundColor: theme.colors.background
            }}
          >
            <Text
              style={{
                ...pageStyle.headline03,
                color: theme.colors.grey0,
              }}
            >
              {t("create-profile")}
            </Text>
            
            <View style={{...pageStyle.buttonGroup}}>
              <Button  
                title={`${t("cancel")}`}
                onPress={onClose}
                size={'md'}
                type={'outline'}
                color={'primary'}
                titleColor={theme.colors.primary}
              />

              <Button  
                title={`${t("create")}`}
                onPress={handleProfile}
                size={'md'}
                color={'primary'}
                titleColor={theme.colors.white}
              />
            </View>
          </View>

        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: theme.spacing?.md,
    padding: theme.spacing?.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});