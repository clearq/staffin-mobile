import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter, useLocalSearchParams  } from 'expo-router'
import { Formik } from 'formik'
import { useAuth } from '@/contexts/authContext'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import * as Yup from "yup";
import PageTemplate from './pageTemplate'
import { OtpInput } from "react-native-otp-entry";
import pageStyle from '@/constants/Styles'
import { Sizes, theme } from '@/constants/Theme'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { IconTextField, TextField } from '@/components/UI/Input/TextField'
import { Button } from '@/components/UI/Button'
import { getItem } from '@/utils/asyncStorage'
import { resendVerificationCode, verifyEmailWithCode } from '@/api/backend'
import ResendCodeForm from './ResendCodeForm'
import { emergencyLaunchReason } from 'expo-updates'


interface props {
  role: 'admin' | 'staff'
  authInfo: any
}

const VerifyForm = ({role, authInfo}: props) => {
  const { isLoading, authState, setSession, setAuthState } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()
  const [resendCode, setResendCode] = useState(false) 

  const SendCodeSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("email-invalid-message"))
      .required(t("email-required-message")),
    
    code: Yup.string()
      .required(t("code-required-message")),
  })


  return (
    <>
      <PageTemplate 
        title={`${t("register-acount-title")}`}
        children={(
          <View>

            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(1000)
                .springify()}
              style={{
                width: "100%",
                flexDirection: 'column',
                gap: theme.spacing.md,
                marginBottom: Sizes.fixPadding
              }}
            >
              <Text
                style={{
                  ...pageStyle.paraText,
                  color: theme.colors.grey0,
                }}
              >
                {t("didnt-receive-code-message")}
              </Text>
              
              <Button 
                title={`${t("rsend")}`}
                onPress={() => setResendCode(true)}
                loading={isLoading}
                disabled={isLoading}                      
                size="lg"
                color="primary"
                titleColor={theme.colors.white}
              /> 
            </Animated.View>


            <Formik
              initialValues={{
                email: authInfo.email || "",
                code: "",
              }}
              validationSchema={SendCodeSchema}
              onSubmit={async (values) => {
                console.log('values: ', values);
                try {                  
                  await verifyEmailWithCode({
                    email: values.email, // should match the passed email
                    code: values.code
                  });
                  console.log('email:', values.email, 'code:', values.code, 'role:', role);                  
                  if (authInfo.token) {
                    setAuthState({
                      userData: null,
                      userId: authInfo.id,
                      token: authInfo.token,
                    });
                    setSession(authInfo.token);
              
                    toast.show(`${t("sign-up-successful-message")}`, {
                      type: "success",
                      placement: "top",
                      duration: 3000,
                    });
              
                    router.replace("/");

                  } else {
                    throw new Error("Invalid sign-up response");
                  }
                                              
                } catch (error) {
                  toast.show(t("failed-send-register"), { 
                    type: "error",
                    placement: "top",
                    duration: 3000, 
                  });
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
                    {/* Email */}
                    <Animated.View
                      entering={FadeInDown.delay(400)
                        .duration(1000)
                        .springify()}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          ...pageStyle.paraText,
                          color: theme.colors.grey0,
                          marginVertical: Sizes.fixPadding
                        }}
                      >
                        {t("register-acount-message")}
                      </Text>


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
                    
                    {/* verification code */}
                    <Animated.View
                      entering={FadeInDown.delay(400)
                        .duration(1000)
                        .springify()}
                      style={{
                        width: "100%",
                      }}
                    >

                      <Text style={styles.inputLabel}>                
                        {t("verification-code")}
                      </Text>

                      <OtpInput
                        numberOfDigits={6}
                        focusColor="green"
                        autoFocus={false}
                        hideStick={true}
                        placeholder=""
                        blurOnFilled={true}
                        disabled={false}
                        type="numeric"
                        secureTextEntry={false}
                        focusStickBlinkingDuration={500}
                        onFocus={() => {}}
                        onBlur={() => handleBlur("code")}
                        onTextChange={(text) => {
                          setFieldValue("code", text);
                        }}
                        onFilled={() => handleChange("code")}
                        textInputProps={{
                          accessibilityLabel: "One-Time Password",
                        }}
                        textProps={{
                          accessibilityRole: "text",
                          accessibilityLabel: "OTP digit",
                          allowFontScaling: false,
                        }}
                        theme={{
                          containerStyle: styles.container,
                          pinCodeContainerStyle: styles.pinCodeContainer,
                          pinCodeTextStyle: styles.pinCodeText,
                          focusStickStyle: styles.focusStick,
                          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                          placeholderTextStyle: styles.placeholderText,
                          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                          disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                        }}
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
                        title={`${t("confirm")}`}
                        onPress={() => handleSubmit()}
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
            </Animated.View>   
            
            <ResendCodeForm 
              visible={resendCode}
              onClose={() => setResendCode(!resendCode)}
              email={authInfo.email}
              role={role}
            />
          </View>
        )}
      />

    </>
  )
}

export default VerifyForm

const styles = StyleSheet.create({
  container: {
    paddingVertical: Sizes.fixPadding
  },
  pinCodeContainer: {
    borderColor: theme.lightColors?.greyOutline || theme.darkColors?.greyOutline
  },
  pinCodeText: {
    color: theme.lightColors?.grey0 || theme.darkColors?.grey0
  },
  focusStick: {},
  activePinCodeContainer: {
    borderColor: theme.lightColors?.primary || theme.darkColors?.primary
  },
  placeholderText: {},
  filledPinCodeContainer: {},
  disabledPinCodeContainer: {},
  inputLabel: {
    ... pageStyle.smText,
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
})