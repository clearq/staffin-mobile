import React, { useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useRouter, Link } from 'expo-router'

import { getItem, removeItem, setItem } from "@/utils/asyncStorage";
import { useTranslation } from "react-i18next";
import { useTheme, CheckBox } from '@rneui/themed'
import { useAuth } from '@/contexts/authContext';

import { Fonts, Sizes, theme } from '@/constants/Theme'

import { IconTextField, TextField } from '@/components/UI/Input/TextField'
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Button } from '@/components/UI/Button'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import pageStyle from '@/constants/Styles';
import PageTemplate from './pageTemplate';



const SignInPage = () => {
  const { SignIn, isLoading, authState } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()
  const formikRef = useRef<FormikProps<any>>(null)

  const SignInSchema = Yup.object().shape({
    email: Yup.string().required(t("email-required-message")),
    password: Yup.string().required(t("password-required-message")),
    rememberMe: Yup.boolean(),
  });

  useEffect(() => {
    (async () => {
      const savedEmail = await getItem('REMEMBERED_EMAIL')
      const savedPassword = await getItem('REMEMBERED_PASSWORD')

      if (savedEmail && savedPassword) {
        formikRef.current?.setFieldValue('email', savedEmail)
        formikRef.current?.setFieldValue('password', savedPassword)
        formikRef.current?.setFieldValue('rememberMe', true)
      }
    })()
  }, [])

  return (
    <PageTemplate 
      title={`${t("sign-in")}`}
      children={(
        <>
          <View style={styles.formContiner}>
            <Formik
              innerRef={formikRef}
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={SignInSchema}
              onSubmit={async (values) => {
                if (values.rememberMe) {
                  await setItem('REMEMBERED_EMAIL', values.email)
                  await setItem('REMEMBERED_PASSWORD', values.password)
                } else {
                  await removeItem('REMEMBERED_EMAIL')
                  await removeItem('REMEMBERED_PASSWORD')
                }

                await SignIn(values)
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
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
                        errorMessage={touched.email &&  typeof errors.email === 'string' ? errors.email : undefined}
                        keyboardType='email-address'
                      />
                    </Animated.View>

                    {/* Password */}
                    <Animated.View
                      entering={FadeInDown.delay(400)
                        .duration(1000)
                        .springify()}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text style={styles.inputLabel}>
                        {t("password")}
                      </Text>
                      <IconTextField
                        placeholder={t("password")}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        name={"password"}
                        type={"password"}
                        errorMessage={touched.password &&  typeof errors.email === 'string' ? errors.email : undefined}
                      />
                    </Animated.View>

                    <Animated.View
                      entering={FadeInDown.delay(400)
                        .duration(1000)
                        .springify()}
                      style={{
                        width: "100%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {/* Remember me */}
                      <CheckBox
                        title={t("remember-me")}
                        checked={values.rememberMe}
                        onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
                        containerStyle={{ 
                          backgroundColor: 'transparent', 
                          borderWidth: 0,
                        }}
                        textStyle={{...pageStyle.paraText, fontWeight: 'normal'}}
                        checkedColor={theme.colors.primary}
                      />
  
                      <Link
                        href={"./forgotPassword"}
                      >
                        <Text
                          style={{
                            ...pageStyle.paraText, 
                            color:theme.colors.secondary,
                            textDecorationLine: "underline",
                            textDecorationColor: theme.colors.secondary,
                          }}
                        >
                          {`${t("forgot-password-message")}`}
                        </Text>
                      </Link>  
                      
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
                        title={`${t("sign-in")}`}
                        onPress={handleSubmit}
                        loading={
                          isLoading 
                        }
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
              <View
                style={{
                  flexDirection: 'row',
                  gap: theme.spacing.md,
                }}
              >
                <Text
                  style={{
                    ...pageStyle.paraText,
                    color: theme.colors.grey0,
                  }}
                >
                  {`${t("new-user-message")}`}
                </Text>

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
              </View>
            </Animated.View>          
          </View>   
        </>
      )}
    />
  )
}

export default SignInPage

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