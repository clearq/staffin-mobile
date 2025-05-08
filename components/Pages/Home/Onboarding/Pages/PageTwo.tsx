import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Sizes, theme } from '@/constants/Theme';
import { CheckBox, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import pageStyle from '@/constants/Styles';
import { useToast } from 'react-native-toast-notifications';
import { Formik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUser } from '@/types';
import { TextField } from '@/components/UI/Input/TextField';
import { updateStaff } from '@/api/backend';

interface props {
  user: IUser
  handleSuccess: () => void
}


const PageTwo = ({user, handleSuccess}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      return await updateStaff(values);
    },
    onSuccess: () => {
      toast.show(`${t("success-update-message")}`, {
        type: "success",
      });
      handleSuccess()
    },
    onError: () => {
      toast.show(`${t("failed-update-message")}`, {
        type: "error",
      });
    },
  })

  
  return (
    <View style={{
      marginVertical:'auto',
      padding: theme.spacing.md,
    }}>
      <View style={{...styles.col}}>
        <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
          {t("intro-step-two-message")}
        </Text>

        <Formik
          initialValues={{
            ...user,
            id: user?.id,
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
          }}
          onSubmit={(values: IUser) => {
            const firstName = values.firstName?.trim() || "";
            const lastName = values.lastName?.trim() || "";

            const firstNameChanged = (user?.firstName?.trim() || "") !== firstName;
            const lastNameChanged = (user?.lastName?.trim() || "") !== lastName;

            if (firstNameChanged || lastNameChanged) {
              mutation.mutate(values);
            } 
      
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
            <View style={{...styles.col}}>

              <View style={{...styles.row}}>
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
                    placeholder={user?.firstName ? user?.firstName : t("firstName")}
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
                      color: theme.colors.grey0,
                      marginHorizontal: 'auto',
                    }}
                  >
                    {t("last-name")}
                  </Text>
                  <TextField
                    placeholder={user?.lastName ? user?.lastName : t("last-name")}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName as string}
                    name={"lastName"}
                    type={"text"}
                  />
                </View>

              </View>

              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{
                  ...styles.button,
                  backgroundColor: theme.colors.primary,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.white,
                    ...pageStyle.button16,
                  }}
                >
                  {t("save")}
                </Text>
              </TouchableOpacity>
        
            </View>
          )}
        </Formik>

      </View>

      <View
        style={{
          alignItems: 'center',          
        }}
      >
        <Image 
          source={require('@/assets/image/onboarding/Jack8.png')} 
          style={{...styles.imageStyle}}
        />
        
      </View>

    </View>
  )
}

export default PageTwo

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.xl,
  },
  button:{
    paddingHorizontal: theme.spacing?.xl,
    paddingVertical: theme.spacing?.md,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    height: 300,
    resizeMode: 'center',
  }})