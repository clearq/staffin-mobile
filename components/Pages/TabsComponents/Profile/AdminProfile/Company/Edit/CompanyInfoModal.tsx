import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import { Formik } from 'formik';

import { updateAdminProfile, updateCompanyInformation, updateStaff } from '@/api/backend';

import { IUser } from '@/types/UserTypes';

import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import ModalHeader from '../../../../ModalHeader';
import { IAdmin, ICompany } from '@/types';

interface props {
  user: ICompany;
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
}

const CompanyInfoModal = ({user, visible, onClose, handleSuccess}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (values:IAdmin) => {
      return await updateCompanyInformation(user.id, values);
    },
    onMutate: (variables) => {
      // Optionally, you can handle any state updates or optimistic updates here.
    },

    onSuccess: () => {
      toast.show(`${t("success-update-message")}`, {
        type: "success",
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
      <ModalHeader title={t("information")} />
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
                id: user.id,
                companyName: user.companyName,
                contactPerson: user.contactPerson,
                phoneNumber: user.phoneNumber,
                address: user.address,
                organisationNumber: user.organisationNumber,
                website: user.website || "",
                userId: user.userId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              }}
              onSubmit={(values: ICompany) => {
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
                    {/* Company Name */}
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
                        {t("company-name")}
                      </Text>
                      <TextField
                        placeholder={t("company-name")}
                        onChangeText={handleChange("companyName")}
                        onBlur={handleBlur("companyName")}
                        value={values.companyName as string}
                        name={"companyName"}
                        type={"text"}
                      />
                    </View>

                    {/* Organization Number */}
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("organisation-number")}
                      </Text>
                      <TextField
                        placeholder={t("organisation-number")}
                        onChangeText={handleChange("organisationNumber")}
                        onBlur={handleBlur("organisationNumber")}
                        value={values.organisationNumber as string}
                        name={"organisationNumber"}
                        type={"numeric"}
                      />
                    </View>

                    {/* Contact Person */}
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("contact-person")}
                      </Text>
                      <TextField
                        placeholder={t("contact-person")}
                        onChangeText={handleChange("contactPerson")}
                        onBlur={handleBlur("contactPerson")}
                        value={values.contactPerson as string}
                        name={"contactPerson"}
                        type={"text"}
                      />
                    </View>
                    
                    {/* Address */}
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("address")}
                      </Text>
                      <TextField
                        placeholder={t("address")}
                        onChangeText={handleChange("address")}
                        onBlur={handleBlur("address")}
                        value={values.address as string}
                        name={"address"}
                        type={"text"}
                      />
                    </View>
                    
                    {/* Phone numberl */}
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
                        {t("telephone")}
                      </Text>
                      <TextField
                        placeholder={t("telephone")}
                        onChangeText={handleChange("phoneNumber")}
                        onBlur={handleBlur("phoneNumber")}
                        value={values.phoneNumber as string}
                        name={"phoneNumber"}
                        type={"tel"}
                      />
                    </View>
                   
                    {/* Website */}
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
                        {t("web-site")}
                      </Text>
                      <TextField
                        placeholder={t("web-site")}
                        onChangeText={handleChange("website")}
                        onBlur={handleBlur("website")}
                        value={values.website as string}
                        name={"website"}
                        type={"url"}
                      />
                    </View>
            
                    
                  </View>

              
                  <View
                    style={{
                      ...pageStyle.buttonGroup,
                      marginTop: theme.spacing.xl * 2,
                    }}
                  >            
                    <Button
                      title={`${t("cancel")}`}
                      onPress={onClose}
                      size='md'
                      type='clear'
                      titleStyle={{...pageStyle.button16}}
                      radius={"sm"}
                      containerStyle={{
                        ...pageStyle.buttonContainer,
                        borderColor: theme.colors.primary,
                      }}
                    />
                      

                    <Button
                      title={`${t("save")}`}
                      onPress={() => handleSubmit()}
                      size='md'
                      color='primary'
                      titleStyle={{...pageStyle.button16}}
                      radius={"sm"}
                      containerStyle={{
                        ...pageStyle.buttonContainer,
                        borderColor: theme.colors.primary,       
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

export default CompanyInfoModal