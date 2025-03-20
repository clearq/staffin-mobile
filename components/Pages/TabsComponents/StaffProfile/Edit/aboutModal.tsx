import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import { Formik } from 'formik';

import { updateStaff } from '@/api/backend';

import { IUser } from '@/types/UserTypes';

import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MultiTextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import ModalHeader from '../../ModalHeader';

interface props {
  user: IUser;
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
}

const AboutModal = ({user, visible, onClose, handleSuccess}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (values:any) => {
      return await updateStaff(values);
    },
    onMutate: (variables) => {
      // Optionally, you can handle any state updates or optimistic updates here.
    },

    onSuccess: () => {
      toast.show(`${t("success-update-message")}`, {
        type: "custom",
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
      <ModalHeader title={t("about")}/>
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
                ...user,
                about: user?.about
              }}
              onSubmit={(values: IUser) => {
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
                    {/* About */}                
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text 
                        style={{
                          ...styles.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("about")}
                      </Text>
                      <MultiTextField
                        placeholder={t("about")}
                        onChangeText={handleChange("about")}
                        onBlur={handleBlur("about")}
                        value={values.about as string}
                        name={"about"}
                        type={"text"}
                      />
                    </View>
                  </View>
              
                  <View
                    style={{
                      ...styles.buttonGroup,
                      marginTop: theme.spacing.xl * 2,
                    }}
                  >            
                    <Button
                      title={`${t("cancel")}`}
                      onPress={onClose}
                      size='md'
                      type='clear'
                      titleStyle={{ ...pageStyle.button16 }}
                      radius={"sm"}
                      containerStyle={{
                        ...styles.buttonContainer,
                        borderColor: theme.colors.primary,
                        borderWidth: 2,
                      }}
                    />
                      

                    <Button
                      title={`${t("save")}`}
                      onPress={() => handleSubmit()}
                      size='md'
                      color='primary'
                      titleStyle={{ ...pageStyle.button16 }}
                      radius={"sm"}
                      containerStyle={{
                        ...styles.buttonContainer,
                        borderColor: theme.colors.primary,                     
                        borderWidth: 2,
                        borderRadius:10
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

export default AboutModal

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  inputLabel: {
    fontFamily: "Coolvetica",
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
  buttonGroup:{
    flexDirection: 'row',
    gap: theme.spacing?.md,
    width: '100%',
    marginVertical: theme.spacing?.lg,
  },
  buttonContainer: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 0,
  },

})