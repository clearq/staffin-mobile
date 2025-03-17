import React, { useRef } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useRouter, Link } from 'expo-router'

import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import { useAuth } from '@/contexts/authContext';

import { getUserById } from '@/api/backend'
import { Text } from '@rneui/themed'
import { Fonts, Sizes, theme } from '@/constants/Theme'

import { IconTextField, TextField } from '@/components/UI/Input/TextField'
import { Formik } from "formik";
import * as Yup from "yup";
import Button from '@/components/UI/Button'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import pageStyle from '@/constants/Styles';
import PageTemplate from './pageTemplate';


const SignInSchema = Yup.object().shape({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
  rememberMe: Yup.boolean(),
});


const SignInPage = () => {
  const { SignIn, isLoading, authState } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()


  return (
    <PageTemplate 
      title={`${t("sign-in")}`}
      children={(
        <>
          <View style={styles.formContiner}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignInSchema}
              onSubmit={async (values) => {
                await SignIn(values);
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
                        errorMessage={errors.email}
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
                        errorMessage={errors.password}
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
                        title={`${t("sign-in")}`}
                        onPress={handleSubmit}
                        loading={isLoading}
                        disabled={isLoading}                      
                        size="md"
                        color="primary"
                        titleStyle={{ ...pageStyle.button20, color: theme.colors.white, }}
                        radius={"sm"}
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
                flexDirection:'row',
                gap:theme.spacing.md,
                marginTop: theme.spacing.md,
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  ...pageStyle.headline03,
                }}
              >
                {`${t("new-user-message")}`}
              </Text>

              <Link
                href={"./signup"}
              >
                <Text
                  style={{
                    ...pageStyle.headline02, 
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