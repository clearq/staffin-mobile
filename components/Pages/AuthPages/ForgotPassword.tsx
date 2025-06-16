import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useRouter, Link } from 'expo-router'
import { useToast } from "react-native-toast-notifications";

import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import { Fonts, Sizes, theme } from '@/constants/Theme'

import { IconTextField, TextField } from '@/components/UI/Input/TextField'
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from '@/components/UI/Button'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { useAuth } from '@/contexts/authContext';
import PageTemplate from './pageTemplate';
import pageStyle from '@/constants/Styles';
import page from '@/app/(app)/(tabs)/application';
import { requestPasswordReset } from '@/api/backend';

const ForgotPassword = () => {
  const { SignUp, isLoading, authState } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required(t("email-required-message")),
  });

  return (
    <PageTemplate 
      title={`${t("forgot-password-title")}`}
      children= {(
        <View style={styles.formContiner}>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={async (values) => {
              try {
                await requestPasswordReset(values.email)
                
                router.replace(`/reset-password?email=${encodeURIComponent(values.email)}`)

                toast.show(`${t("success-send-recovery")}`, {
                  type: "success",
                  placement: "top",
                  duration: 3000,
                })
              } catch (error) {
                toast.show(`${t("failed-send-recovery")}`, {
                  type: "error",
                  placement: "top",
                  duration: 3000,
                })
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => (
              <>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    gap: theme.spacing.xl,
                  }}
                >
                  <Text
                    style={{
                      ...pageStyle.paraText,
                      color: theme.colors.grey0,
                    }}
                  >
                    {t("forgot-password-text")}
                  </Text>

                  {/* Email */}
                  <Animated.View
                    entering={FadeInDown.delay(400)
                      .duration(1000)
                      .springify()}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Text style={styles.inputLabel}>                    
                      {t("e-mail")}
                    </Text>

                    <TextField
                      placeholder={t("e-mail")}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      name={"email"}
                      type={"email"}
                      errorMessage={typeof errors.email === 'string' ? errors.email : undefined}
                      keyboardType='email-address'
                    />
                  </Animated.View>

                  {/* Submit Button */}
                  <Animated.View
                    entering={FadeInDown.delay(600)
                      .duration(1000)
                      .springify()
                    }
                    style={{ width:'100%'}}
                  >
                    <Button 
                      title={`${t("send")}`}
                      onPress={handleSubmit}
                      loading={isLoading}
                      disabled={isLoading}                      
                      size="lg"
                      color="primary"
                      titleColor={theme.colors.white}
                    />  
                  </Animated.View>
                </View>                            
              </>
            )}
          </Formik>  
                        
          <Animated.View
            entering={FadeInDown.delay(400)
              .duration(1000)
              .springify()}
            style={{
              width: "100%",
              flexDirection:'column',
              gap:theme.spacing.md,
              marginTop: theme.spacing.xl,
              alignItems: 'center'
            }}
          >
      
            <Link
              href={"/signin"}
            >
              <Text
                style={{
                  ...pageStyle.paraText, 
                  color:theme.colors.secondary,
                  textDecorationLine: "underline",
                  textDecorationColor: theme.colors.secondary,
                }}
              >
                {`${t("sign-in")}`}
              </Text>
            </Link>

            <Link
              href={"/signup"}
            >
              <Text
                style={{
                  ...pageStyle.paraText, 
                  color:theme.colors.secondary,
                  textDecorationLine: "underline",
                  textDecorationColor: theme.colors.secondary,
                }}
              >
                {`${t("sign-up")}`}
              </Text>
            </Link>
          </Animated.View>          
        </View>   
      )}
    />
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  inputLabel: {
    ... pageStyle.smText,
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
});