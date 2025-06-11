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
import { createPost, deleteExperience, getExperience, updateExperience, updateStaff } from '@/api/backend';

import { IExperience, IUser } from '@/types/UserTypes';

import { CheckBox, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MultiTextField, TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rgbaToHex } from '@/utils/rgba-to-hex';
import DateCalendar from '@/components/UI/Calendar';
import { IPost } from '@/types';
import ModalHeader from '../ModalHeader';
import { values } from 'lodash';
import { useAuth } from '@/contexts/authContext';
import { MessageModal } from '@/components/Modal/MessageModal';

interface props {
  visible: boolean;
  onClose: () => void;
}

const CreatePostModal = ({visible, onClose}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const { authState:{userId, userData} } = useAuth()
  const [isDisabled, setIsDisabled] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const mutation = useMutation({
    mutationFn: async () => {
      return await createPost(values)
    },
    onSuccess: () => {
      toast.show(`${t("success-update-message")}`, {
        type: "success",
      })
    },
    onError: () => {
      toast.show(`${t("failed-update-message")}`, {
        type: "error",
      });
    },
  })
 


  return (
    <Modal
      visible={visible}
    >
      <ModalHeader title={`${t("create-post")}`}/>
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

            <Formik
              initialValues={{
                content: "",
                image: "",
                userId: userId,
                groupId: null
              }}
              onSubmit={(values: any) => {
                mutation.mutate(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                <>  
                  {isDisabled && 
                    <MessageModal 
                      visible={openModal}
                      onClose={() => setOpenModal(!openModal)}
                    />
                  }

                  <View style={{flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center', marginBottom: theme.spacing.sm,}}>
                    <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: theme.colors.grey3}} />
                    <Text style={{...pageStyle.headline03, color: theme.colors.grey0}}>FirstName LastName</Text>
                  </View>    
                                    
                  <MultiTextField 
                    placeholder={t("create-post-placeholder")}
                    onChangeText={handleChange("content")}
                    onBlur={handleBlur("content")}
                    value={values.content as string}
                    name={"content"}
                    type={"text"}
                    readonly={isDisabled}
                    onPressIn={() => {
                      if (!userData?.firstName && !userData?.lastName) {
                        setIsDisabled(true)
                        setOpenModal(true)
                        console.log(isDisabled, openModal);  
                     }} 
                    }
                  />

                  <View 
                    style={{
                      flexDirection: 'row',
                      gap: theme.spacing.md,
                      justifyContent: 'flex-end'
                    }}
                  >
                    <TouchableOpacity>
                      <MaterialCommunityIcons name='image-outline' size={24} color={theme.colors.divider} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                      <MaterialCommunityIcons name='account-group' size={24} color={theme.colors.divider} />
                    </TouchableOpacity>
                  </View>

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
                      type={'outline'}
                      color={'primary'}
                      titleColor={theme.colors.primary}                 
                    />                      

                    <Button
                      title={`${t("post")}`}
                      onPress={() => {}}
                      size='md'
                      color={'primary'}
                      titleColor={theme.colors.white}
                      disabled= {isDisabled}
                    />
                  </View>
                </>
              )}
            </Formik>
            
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default CreatePostModal