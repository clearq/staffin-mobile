import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useRouter, Link } from 'expo-router'

import { useTranslation } from "react-i18next";

import { getUserById } from '@/api/backend'
import { CheckBox, Text } from '@rneui/themed'
import { useTheme } from '@rneui/themed'
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
import { useAuth } from '@/contexts/authContext';
import PageTemplate from './pageTemplate';
import pageStyle from '@/constants/Styles';


const StaffSignUpSchema = Yup.object().shape({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
  userName: Yup.string().required("User name is required"),
  rememberMe: Yup.boolean(),
});
const AdminSignUpSchema = Yup.object().shape({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
  companyName: Yup.string().required("Company name is required"),
  organisationNumber: Yup.string().required("Organisation number is required"),
  rememberMe: Yup.boolean(),
});

const SignUpPage = () => {
  const { SignUp, isLoading, authState } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [role, setRole] = useState<"staff"|"admin">('staff')
  const [checked, setChecked] = useState<boolean>(false)


  // console.log("isLoading:", isLoading);
  useEffect(() => {
    //console.log('role:', role);
    
  },[role])

  return (
    <PageTemplate 
      title={`${t("sign-up")}`}
      children={(
        <>
            <Animated.View
            entering={FadeInDown.delay(400)
              .duration(1000)
              .springify()}
            style={{
              flexDirection:'row',
              alignItems:'center'
            }}
          >
            <CheckBox 
              checked={checked}
              onPress={() => {
                setChecked(prev => {
                  const newChecked = !prev;
                  setRole(newChecked ? 'admin' : 'staff')
                  return newChecked;
                })
              }}
            />
            <Text
              style={{ ...styles.inputLabel }}
            >
              {`${t("role-checkbox-text")}`}
            </Text>
          </Animated.View>

          <View style={styles.formContiner}>
            { role === 'staff' && (
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  userName: "",
                }}
                validationSchema={StaffSignUpSchema}
                onSubmit={async (values) => {
                  console.log("Submitting SignUp with:", values, role); // Submitting SignUp with: {"companyName": "", "email": "new@mail.com", "organisationNumber": "", "password": "string", "userName": "new"} staff
                  await SignUp(role, values);
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
                    
                      {/* User name */}
                      <Animated.View
                        entering={FadeInDown.delay(400)
                          .duration(1000)
                          .springify()}
                        style={{
                          width: "100%",
                        }}
                      >
                        <Text style={styles.inputLabel}>
                          {t("user-name")}
                        </Text>
                        <TextField
                          placeholder={t("user-name")}
                          onChangeText={handleChange("userName")}
                          onBlur={handleBlur("userName")}
                          value={values.userName}
                          name={"userName"}
                          type={"text"}
                          errorMessage={errors.userName}
                          keyboardType='default'
                        />
                      </Animated.View>         

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
                          title={`${t("sign-up")}`}
                          onPress={() => {
                            console.log("🚀 SignUp Button Pressed!")
                            handleSubmit()
                          }}
                          loading={isLoading}
                          disabled={isLoading}                      
                          size="md"
                          color="primary"
                          titleStyle={{ fontSize: 16 }}
                          radius={"sm"}
                        />  
                      </Animated.View>
                    </View>                            
                  </>
                )}
              </Formik> 
            )}

            { role === 'admin' && (
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  companyName: "",
                  organisationNumber: "",
                }}
                validationSchema={AdminSignUpSchema}
                onSubmit={async (values) => {
                  console.log("Submitting SignUp with:", values, role);
                  await SignUp(role, values);
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

                      {/* Company name */}
                      <Animated.View
                        entering={FadeInDown.delay(400)
                          .duration(1000)
                          .springify()}
                        style={{
                          width: "100%",
                        }}
                      >
                        <Text style={styles.inputLabel}>
                          {t("company-name")}
                        </Text>
                        <TextField
                          placeholder={t("company-name")}
                          onChangeText={handleChange("companyName")}
                          onBlur={handleBlur("companyName")}
                          value={values.companyName}
                          name={"companyName"}
                          type={"text"}
                          errorMessage={errors.companyName}
                          keyboardType='default'
                        />
                      </Animated.View>

                      {/* Organisation no. */}
                      <Animated.View
                        entering={FadeInDown.delay(400)
                          .duration(1000)
                          .springify()}
                        style={{
                          width: "100%",
                        }}
                      >
                        <Text style={styles.inputLabel}>
                          {t("organisation-number")}
                        </Text>
                        <TextField
                          placeholder={t("organisation-number")}
                          onChangeText={handleChange("organisationNumber")}
                          onBlur={handleBlur("organisationNumber")}
                          value={values.organisationNumber}
                          name={"organisationNumber"}
                          type={"text"}
                          errorMessage={errors.organisationNumber}
                          keyboardType='default'
                        />
                      </Animated.View>          

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
                          title={`${t("sign-up")}`}
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
            )}
                        
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
                {`${t("having-an-account-message")}`}
              </Text>

              <Link
                href={"./signin"}
              >
                <Text
                  style={{
                    ...pageStyle.headline02, 
                    color:theme.colors.secondary,
                    textDecorationLine: "underline",
                    textDecorationColor: theme.colors.secondary,
                  }}
                >
                  {`${t("sign-in")}`}
                </Text>
              </Link>
            </Animated.View>          
          </View>   
        </>
      )}
    />
  )
}

export default SignUpPage

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

