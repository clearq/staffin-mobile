import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import { Formik } from 'formik';

import { updateAdminProfile, updateStaff } from '@/api/backend';

import { IUser } from '@/types/UserTypes';

import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import ModalHeader from '../../../ModalHeader';
import { IAdmin } from '@/types';

interface props {
  user: IUser;
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
}

const AdminInfoModal = ({user, visible, onClose, handleSuccess}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (values:IAdmin) => {
      return await updateAdminProfile(values);
    },
    onMutate: (variables) => {
      // Optionally, you can handle any state updates or optimistic updates here.
    },

    onSuccess: () => {
      toast.show(`${t("success-update-message")}`, {
        type: "success",
      });
      handleSuccess();
      onClose();
    },
    onError: () => {
      toast.show(`${t("failed-update-message")}`, {
        type: "error",
      });
    },
  });



  return (
    <Modal
      visible={visible}
    >
      <ModalHeader title={t("information")} />
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
                id: user?.id,
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                title: user?.title || "",
                street: user?.street || "",
                city: user?.city || "",
                postalCode: user?.postalCode || "",
                country: user?.country || "",
                phoneNumber: user?.phoneNumber || "",
                profileImage: user?.profileImage || "",
              }}
              onSubmit={(values: IAdmin) => {
                mutation.mutate(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                <>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      gap: theme.spacing.xl,
                      marginTop: theme.spacing.xl,
                    }}
                  >
                    {/* First-/ Last Name */}
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: theme.spacing.md,
                        width: '100%'
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text 
                          style={{
                            ...pageStyle.inputLabel,
                            color: theme.colors.grey0
                          }}
                        >
                          {t("first-name")}
                        </Text>
                        <TextField
                          placeholder={t("first-name")}
                          onChangeText={handleChange("firstName")}
                          onBlur={handleBlur("firstName")}
                          value={values.firstName as string}
                          name={"firstName"}
                          type={"text"}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text 
                          style={{
                            ...pageStyle.inputLabel,
                            color: theme.colors.grey0
                          }}
                        >
                          {t("last-name")}
                        </Text>
                        <TextField
                          placeholder={t("last-name")}
                          onChangeText={handleChange("lastName")}
                          onBlur={handleBlur("lastName")}
                          value={values.lastName as string}
                          name={"lastName"}
                          type={"text"}
                        />
                      </View>

                    </View>

                    {/* Title */}
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("title")}
                      </Text>
                      <TextField
                        placeholder={t("title")}
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur("title")}
                        value={values.title as string}
                        name={"title"}
                        type={"text"}
                      />
                    </View>
                    
                    {/* Address */}
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("street")}
                      </Text>
                      <TextField
                        placeholder={t("street")}
                        onChangeText={handleChange("street")}
                        onBlur={handleBlur("street")}
                        value={values.street as string}
                        name={"street"}
                        type={"text"}
                      />
                    </View>

                    {/* City/ Zip-code */}
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: theme.spacing.md,
                        width: '100%'
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text 
                          style={{
                            ...pageStyle.inputLabel,
                            color: theme.colors.grey0
                          }}
                        >
                          {t("city")}
                        </Text>
                        <TextField
                          placeholder={t("city")}
                          onChangeText={handleChange("city")}
                          onBlur={handleBlur("city")}
                          value={values.city as string}
                          name={"city"}
                          type={"text"}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text 
                          style={{
                            ...pageStyle.inputLabel,
                            color: theme.colors.grey0
                          }}
                        >
                          {t("postal-code")}
                        </Text>
                        <TextField
                          placeholder={t("postal-code")}
                          onChangeText={handleChange("postalCode")}
                          onBlur={handleBlur("postalCode")}
                          value={values.postalCode as string}
                          name={"postalCode"}
                          type={"text"}
                        />
                      </View>              
                    </View>

                    {/* Country */}
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("country")}
                      </Text>
                      <TextField
                        placeholder={t("country")}
                        onChangeText={handleChange("country")}
                        onBlur={handleBlur("country")}
                        value={values.country as string}
                        name={"country"}
                        type={"text"}
                      />
                    </View>
                    
                    {/* Phone number/ email */}
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: theme.spacing.md,
                        width: '100%'
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text 
                          style={{
                            ...pageStyle.inputLabel,
                            color: theme.colors.grey0
                          }}
                        >
                          {t("telephone")}
                        </Text>
                        <TextField
                          placeholder={t("telephone")}
                          onChangeText={handleChange("phoneNumber")}
                          onBlur={handleBlur("phoneNumber")}
                          value={values.phoneNumber as string}
                          name={"phoneNumber"}
                          type={"text"}
                        />
                      </View>
            
                    </View>

                  </View>

              
                  <View
                    style={{
                      ...pageStyle.buttonGroup,
                      marginTop: theme.spacing.xl * 2,
                    }}
                  >            
                    <Button
                      title={`${t("cancel")}`}
                      onPress={onClose}
                      size='md'
                      type='clear'
                      titleStyle={{...pageStyle.button16}}
                      radius={"sm"}
                      containerStyle={{
                        ...pageStyle.buttonContainer,
                        borderColor: theme.colors.primary,
                      }}
                    />
                      

                    <Button
                      title={`${t("save")}`}
                      onPress={() => handleSubmit()}
                      size='md'
                      color='primary'
                      titleStyle={{...pageStyle.button16}}
                      radius={"sm"}
                      containerStyle={{
                        ...pageStyle.buttonContainer,
                        borderColor: theme.colors.primary,       
                      }}
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

export default AdminInfoModal