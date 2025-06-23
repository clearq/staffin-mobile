import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
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
import { resetPassword } from '@/api/backend'



const ResetPassword = () => {
  const { isLoading, authState } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("email-invalid-message"))
      .required(t("email-required-message")),
    
    code: Yup.string()
      .required(t("code-required-message")),

    newPassword: Yup.string()
      .min(8, t("password-too-short-message")) // at least 8 characters
      .required(t("password-required-message")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("password-mismatch-message"))
      .required(t("password-required-message")),
  })

  return (
    <PageTemplate 
      title={`${t("reset-password-title")}`}
      children={(
        <View>
          <Formik
            initialValues={{
              email: "",
              code: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={async (values) => {
              try{
                await resetPassword({
                  email: values.email,
                  code: values.code,
                  newPassword: values.newPassword
                })
                router.replace("/signin")
                toast.show(`${t("success-reset-password")}` ,{
                  type: "success",
                  placement: "top",
                  duration: 3000,
                })
              } catch (error) {
                console.error('reset password:', error);              
                toast.show(`${t("failed-reset-password")}`, {
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
                    {t("reset-password-message")}
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

                  {/* new password code */}
                  <Animated.View
                    entering={FadeInDown.delay(400)
                      .duration(1000)
                      .springify()}
                    style={{
                      width: "100%",
                      gap: Sizes.fixPadding
                    }}
                  >
                    <View>
                      <Text style={styles.inputLabel}>               
                        {t("new-password")}
                      </Text>
                      <IconTextField
                        placeholder={t("new-password")}
                        onChangeText={handleChange("newPassword")}
                        onBlur={handleBlur("newPassword")}
                        value={values.newPassword}
                        name={"newPassword"}
                        type={"newPassword"}
                        errorMessage={typeof errors.newPassword === 'string' ? errors.newPassword : undefined}
                      />
                    </View>

                    <View>
                      <Text style={styles.inputLabel}>                
                        {t("confirm-password")}
                      </Text>

                      <IconTextField
                        placeholder={t("confirm-password")}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        name={"confirmPassword"}
                        type={"confirmPassword"}
                        errorMessage={typeof errors.confirmPassword === 'string' ? errors.confirmPassword : undefined}
                      />
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
        </View>
      )}
    />
  )
}

export default ResetPassword

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