import { StyleSheet, Text, View, Modal, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { Sizes, theme } from '@/constants/Theme'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@rneui/themed'
import { Button } from '@/components/UI/Button'
import PageTemplate from './pageTemplate'
import { Formik } from 'formik'
import * as Yup from "yup";
import { TextField } from '@/components/UI/Input/TextField'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import pageStyle from '@/constants/Styles'
import { resendVerificationCode } from '@/api/backend'
import { useAuth } from '@/contexts/authContext'
import { useToast } from 'react-native-toast-notifications'
import { useRouter } from 'expo-router'

interface props {
  visible: boolean
  onClose: () => void
  email: string
  role: 'admin' | 'staff'
}

const ResendCodeForm = ({visible, onClose, email, role}:props) => {
  const { isLoading, authState } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()

  const ResendCodeSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("email-invalid-message"))
      .required(t("email-required-message")),
  })
  
  return (
    <SafeAreaView style={{...styles.centeredView}}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{...styles.centeredView }}
        >
          <View
            style={{
              ...styles.modalView,
              backgroundColor: theme.colors.background
            }}
          >
            <View 
              style={{ 
                width: '100%', 
                maxHeight: Dimensions.get('window').height * 0.7 
              }}
            >     
              <View>
                <Formik
                  initialValues={{
                    email: email || ""
                  }}
                  validationSchema={ResendCodeSchema}
                  onSubmit={async (values) => {
                    try {
                      await resendVerificationCode(values.email);
 
                      onClose()

                      toast.show(t("success-send-register"), { 
                        type: "success",
                        placement: "top",
                        duration: 3000, 
                      });
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
                      <Text 
                        style={{
                          ...pageStyle.headline02,
                          color: theme.colors.grey0,
                          marginTop: Sizes.fixPadding * 2,
                          textAlign: 'center'
                        }}
                      >
                        {t("resend-code-title")}
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
                        <Text
                          style={{
                            ...pageStyle.paraText,
                            color: theme.colors.grey0,
                            marginVertical: Sizes.fixPadding
                          }}
                        >
                          {t("forgot-password-text")}
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

                      {/* Submit Button */}
                        <Animated.View
                          entering={FadeInDown.delay(600)
                            .duration(1000)
                            .springify()
                          }
                          style={{ width:'100%'}}
                        >
                          <View
                            style={{
                              flexDirection: 'column',
                              gap: theme.spacing.md,
                              marginVertical: Sizes.fixPadding
                            }}
                          >
                            <Button 
                              title={`${t("send")}`}
                              onPress={() => handleSubmit()}
                              // loading={isLoading}
                              // disabled={isLoading}                      
                              size="lg"
                              color="primary"
                              titleColor={theme.colors.white}
                            />

                            <Button 
                              title={`${t("cancel")}`}
                              onPress={onClose}
                              // loading={isLoading}
                              // disabled={isLoading}
                              type='outline'                      
                              size="lg"
                              color="primary"
                              titleColor={theme.colors.primary}
                            />  
                          </View>
                      </Animated.View>
                    </>
                  )}

                </Formik>
              </View>            
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default ResendCodeForm

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: theme.spacing?.md,
    padding: theme.spacing?.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputLabel: {
    ... pageStyle.smText,
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
})