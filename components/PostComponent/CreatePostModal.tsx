import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'
import { Link, router, useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import dayjs from "dayjs";

import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import { useDefaultStyles } from 'react-native-ui-datepicker';
import { createPost, deleteExperience, getExperience, updateExperience, updateStaff } from '@/api/backend';

import { IExperience, IUser } from '@/types/UserTypes';

import { Card, CheckBox, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MultiTextField, TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rgbaToHex } from '@/utils/rgba-to-hex';
import DateCalendar from '@/components/UI/Calendar';
import { IPost } from '@/types';
import ModalHeader from '@/components/Pages/TabsComponents/ModalHeader';
import { values } from 'lodash';
import { useAuth } from '@/contexts/authContext';
import { MessageModal } from '@/components/Modal/MessageModal';
import { ProfileAvatar } from '@/components/UI/ProfileAvatar';

interface props {
  visible: boolean;
  onClose: () => void;
}

const CreatePostModal = ({visible, onClose}: props) => {
  const { authState:{userId, userData}, isLoading } = useAuth()
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false)

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
 

  useEffect(() => {
    const isEmpty = userData?.firstName === "" || userData?.lastName === "";

    if (isLoading) {
      setIsDisabled(true);
    } else {
      setIsDisabled(isEmpty);
    }
  }, [userData, isLoading]);

  

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
            justifyContent: 'center',
          }}
        >

          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >
            {isDisabled && 
              <View>
                <Card>
                  <View
                    style={{flexDirection: 'column', gap: theme.spacing.md}}
                  >
                    <Text 
                      style={{
                        ...pageStyle.headline03, 
                        color: theme.colors.grey0,
                      }}
                    >
                      {`⚠️  ${t("complete-your-name-Title")}`}
                    </Text>

                    <Text
                      style={{
                        ...pageStyle.paraText, 
                        color: theme.colors.grey0,
                      }}
                    >
                      {`${t("complete-your-name-message")}`}
                    </Text>

                    <TouchableOpacity 
                      onPress={() => {
                        router.replace(`/profile`)
                        onClose()
                      }}
                      style={{
                        flexDirection: 'row',
                        gap: theme.spacing.sm,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Text
                        style={{
                          ...pageStyle.paraText, 
                          color: theme.colors.primary,
                          textDecorationColor: theme.colors.primary,
                          textDecorationLine: 'underline',
                        }}
                      >
                        {`${t("Profile")}`}
                      </Text>

                      <MaterialCommunityIcons name='arrow-right-bold-circle-outline'  size={20} color={theme.colors.primary} />

                    </TouchableOpacity>
                  </View>
                </Card>
              </View>
            }

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
                <View 
                  style={{
                    ...pageStyle.pageComponent,
                    paddingVertical: Sizes.fixPadding
                  }}
                >  
                  
                  {!isDisabled &&  userData !== null && userId !== null && (
                    <View style={{flexDirection: 'column', gap: theme.spacing.xl}}>

                      <View
                        style={{ flexDirection: 'row', gap: theme.spacing.xl}}
                      >
                        <ProfileAvatar 
                          userId={Number(userId)}
                          image={userData?.profileImage}
                          size={40}
                        />   
                      </View>

                      {/* post input */}
                      <View style={{flexDirection: 'column', gap: theme.spacing.md}}>
                        <MultiTextField 
                          placeholder={t("create-post-placeholder")}
                          onChangeText={handleChange("content")}
                          onBlur={handleBlur("content")}
                          value={values.content as string}
                          name={"content"}
                          type={"text"}
                          readonly={isDisabled}
                          onPressIn={() => {}}
                          disabled={isDisabled}
                        />

                        <View 
                          style={{
                            flexDirection: 'row',
                            gap: theme.spacing.md,
                            justifyContent: 'flex-end'
                          }}
                        >
                          <TouchableOpacity>
                            <MaterialCommunityIcons name='image-plus' size={24} color={theme.colors.divider} />
                          </TouchableOpacity>
                          
                          {/* <TouchableOpacity>
                            <MaterialCommunityIcons name='account-group' size={24} color={theme.colors.divider} />
                          </TouchableOpacity> */}
                        </View>
                      </View>  

                      {/* Button Group */}
                      <View
                        style={{
                          ...pageStyle.buttonGroup,
                          flex: 1,
                          marginTop: Sizes.fixPadding * 2,
                        }}
                      >
                        <View
                          style={{
                            ...styles.btnContainer
                          }}
                        >                      
                          <Button
                            title={`${t("cancel")}`}
                            onPress={() => {
                              onClose()
                            }}
                            size={'lg'}
                            type={'outline'}
                            color={'primary'}
                            titleColor={theme.colors.primary}                
                          />  
                        </View>
                        <View
                          style={{
                            ...styles.btnContainer
                          }}
                        >                      
                          <Button
                            title={`${t("post")}`}
                            onPress={() => {}}
                            size={'lg'}
                            color={'primary'}
                            titleColor={theme.colors.white}
                            disabled= {isDisabled}
                          />
                        </View>                    

                      </View>
                    </ View>
                  )}


                </View>
              )}
            </Formik>
            
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default CreatePostModal

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  container: {
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 10, 
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  btnContainer: {
    flexShrink: 2,
  }
})