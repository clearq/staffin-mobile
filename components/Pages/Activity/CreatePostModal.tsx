import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import dayjs from "dayjs";

import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import { useDefaultStyles } from 'react-native-ui-datepicker';
import { deleteExperience, getExperience, updateExperience, updateStaff } from '@/api/backend';

import { IExperience, IUser } from '@/types/UserTypes';

import { CheckBox, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MultiTextField, TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rgbaToHex } from '@/utils/rgba-to-hex';
import DateCalendar from '@/components/UI/Calendar';
import ModalHeader from '../TabsComponents/ModalHeader';
import { IPost } from '@/types';

interface props {
  visible: boolean;
  onClose: () => void;
}

const CreatePostModal = ({visible, onClose}: props) => {
  const { theme } = useTheme()
    const { t } = useTranslation();
    const toast = useToast();


  return (
    <Modal
      visible={visible}
    >
      <ModalHeader title={`${t("edit")} ${t("experience")}`}/>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <View
          style={{
            ...pageStyle.pageComponent,
            justifyContent: 'center',
          }}
        >
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >


            <Text>Create new post</Text>

            {/* Button Group */}
            <View
            style={{
              ...pageStyle.buttonGroup
            }}
            >            
              <Button
                title={`${t("cancel")}`}
                onPress={() => {
                  onClose()
                }}
                size='md'
                type='clear'
                titleStyle={{ ...pageStyle.button16 }}
                radius={"sm"}
                containerStyle={{
                  ...pageStyle.buttonContainer,
                  borderColor: theme.colors.primary,
                }}
              />                      

              <Button
                title={`${t("save")}`}
                onPress={() => {}}
                size='md'
                color='primary'
                titleStyle={{ ...pageStyle.button16 }}
                radius={"sm"}
                containerStyle={{
                  ...pageStyle.buttonContainer,
                  borderColor: theme.colors.primary,      
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default CreatePostModal