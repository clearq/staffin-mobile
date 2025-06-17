import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { useQuery } from '@tanstack/react-query'
import { useRouter, Link } from 'expo-router'
import { Formik } from "formik";
import * as Yup from "yup";
import { useToast } from 'react-native-toast-notifications';
import { useAuth } from '@/contexts/authContext';

import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import { CheckBox } from '@rneui/themed'

import { Fonts, Sizes, theme } from '@/constants/Theme'
import pageStyle from '@/constants/Styles';

import { IconTextField, TextField } from '@/components/UI/Input/TextField'
import { Button } from '@/components/UI/Button'
import PageTemplate from './pageTemplate';
import { sendVerificationCode } from '@/api/backend';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import api from '@/api/backend/config';


const SignUpPage = () => {
  const { isLoading, authState, setAuthState, setSession } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()

  const [role, setRole] = useState<"staff"|"admin">('staff')
  const [checked, setChecked] = useState<boolean>(false)
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)

  const StaffSignUpSchema = Yup.object().shape({
    email: Yup.string().required(t("email-required-message")),
    password: Yup.string()
      .min(8, t("password-too-short-message")) // at least 8 characters
      .required(t("password-required-message")),
    userName: Yup.string().required(t("user-name-required-message")),
    rememberMe: Yup.boolean(),
  });
  
  const AdminSignUpSchema = Yup.object().shape({
    email: Yup.string().required(t("email-required-message")),
    password: Yup.string()
      .min(8, t("password-too-short-message")) // at least 8 characters
      .required(t("password-required-message")),
    companyName: Yup.string().required(t("company-name-required-message")),
    organisationNumber: Yup.string().required(t("org-no-required-message")),
    rememberMe: Yup.boolean(),
  });


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
                acceptedPolicy: true
              }}
              validationSchema={StaffSignUpSchema}
              onSubmit={async (values) => {
                try {
                  const response = await api.post(`/Auth/register/staff`, {
                    userName: values.userName,
                    email: values.email,
                    password: values.password,
                    acceptedPolicy: values.acceptedPolicy
                  }, {
                    headers: { "Content-Type": "application/json" },
                  })
                  
                  const { token, id } = response.data;
                  
                  await sendVerificationCode(values.email);

                  router.replace({
                    pathname: '/register/staff',
                    params: { role, email: values.email, password: values.password, userName: values.userName, token: token, id: id }
                  });

                  toast.show(t("success-send-register"), { type: "success", });
                  return response.data

                } catch (error) {
                  toast.show(t("failed-send-register"), { type: "error" });
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

                    <Animated.View
                      entering={FadeInDown.delay(400)
                        .duration(1000)
                        .springify()}
                      style={{
                        width: "100%",
                      }}
                    >
                      {/*  privacy policy */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center'
                        }}
                      >
                        <CheckBox
                          title={t("accept-policy")}
                          checked={values.acceptedPolicy}
                          onPress={() => setFieldValue('acceptedPolicy', !values.acceptedPolicy)}
                          containerStyle={{ 
                            backgroundColor: 'transparent', 
                            borderWidth: 0,
                            marginRight: 0
                          }}
                          textStyle={{...pageStyle.paraText, fontWeight: 'normal'}}
                          checkedColor={theme.colors.primary}
                        />  
                        <TouchableOpacity
                          onPress={() => setOpenPrivacyPolicy(true)}
                        >
                          <Text
                            style={{
                              ...pageStyle.paraText,
                              color: theme.colors.primary,
                              textDecorationColor: theme.colors.primary,
                              textDecorationLine: 'underline',
                            }}
                          >
                            {t("privacy-policy")}
                          </Text>
                        </TouchableOpacity>
                      </View>
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
                          handleSubmit()
                        }}
                        loading={isLoading}
                        disabled={
                          isLoading ||
                          !values.acceptedPolicy || 
                          !!errors.email || 
                          !!errors.password || 
                          !!errors.userName 
                        }             
                        size="lg"
                        color="primary"
                        titleColor={theme.colors.white}
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
                acceptedPolicy: true
              }}
              validationSchema={AdminSignUpSchema}
              onSubmit={async (values) => {
                try {
                  const response = await api.post(`/Auth/register/admin`,{
                    companyName: values.companyName,
                    organisationNumber: values.organisationNumber,
                    email: values.email,
                    password: values.password,
                    acceptedPolicy: values.acceptedPolicy
                  }, {
                    headers: { "Content-Type": "application/json" },
                  })

                  const { token, id } = response.data;

                  await sendVerificationCode(values.email);
                  // Pass role and form data to /verify screen
                  router.replace({
                    pathname: '/register/admin',
                    params: { role, email: values.email, password: values.password, companyName: values.companyName, organisationNumber: values.organisationNumber, token: token, id: id }
                  });

                  toast.show(t("success-send-register"), { type: "success", });
                  
                } catch (error) {
                  toast.show(t("failed-send-register"), { type: "error" });
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

                    <Animated.View
                      entering={FadeInDown.delay(400)
                        .duration(1000)
                        .springify()}
                      style={{
                        width: "100%",
                      }}
                    >
                      {/*  privacy policy */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center'
                        }}
                      >
                        <CheckBox
                          title={t("accept-policy")}
                          checked={values.acceptedPolicy}
                          onPress={() => setFieldValue('acceptedPolicy', !values.acceptedPolicy)}
                          containerStyle={{ 
                            backgroundColor: 'transparent', 
                            borderWidth: 0,
                            marginRight: 0
                          }}
                          textStyle={{...pageStyle.paraText, fontWeight: 'normal'}}
                          checkedColor={theme.colors.primary}
                        />  
                        <TouchableOpacity
                          onPress={() => setOpenPrivacyPolicy(true)}
                        >
                          <Text
                            style={{
                              ...pageStyle.paraText,
                              color: theme.colors.primary,
                              textDecorationColor: theme.colors.primary,
                              textDecorationLine: 'underline',
                            }}
                          >
                            {t("privacy-policy")}
                          </Text>
                        </TouchableOpacity>
                      </View>
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
                        loading={
                          isLoading ||
                          !!errors.companyName ||
                          !!errors.organisationNumber ||
                          !!errors.email ||
                          !!errors.password
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
          )}
                        
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(1000)
                .springify()}
              style={{
                width: "100%",
                flexDirection:'row',
                gap:theme.spacing.md,
                marginTop: theme.spacing.xl,
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  ...pageStyle.paraText,
                  color: theme.colors.grey0,
                }}
              >
                {`${t("having-an-account-message")}`}
              </Text>

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
            </Animated.View>          
          </View>  
          <PrivacyPolicyDialog 
            visible={openPrivacyPolicy}
            onClose={() => setOpenPrivacyPolicy(!openPrivacyPolicy)}
          /> 
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

