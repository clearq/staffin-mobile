import { View, Text, Modal, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { IBranch } from '@/types';
import * as Yup from "yup";
import { Formik } from 'formik';
import ModalHeader from '../../../ModalHeader';
import { theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import Button from '@/components/UI/Button';
import { useMutation } from '@tanstack/react-query';
import { values } from 'lodash';
import { TextField } from '@/components/UI/Input/TextField';
import { addBranchCompany } from '@/api/backend';


interface props {
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
}

const AddBranchModal = ({visible, onClose, handleSuccess,}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const AddBranchSchema = Yup.object().shape({
    name: Yup.string().required(t("name-required-message")),
  })

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      try {
        const response = await addBranchCompany(values)
        return response
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.show(`${t("success-add-message")}`, {
        type: "success"
      });
      handleSuccess();
      onClose();
    },
    onError: () => {
      toast.show(`${t("failed-add-message")}`, {
        type: "error"
      })
    }
  })
  
  return (
    <Modal
      visible={visible}
    >
      <ModalHeader title={`${t("add")} ${t("branch")}`}/>
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
                id: 0,
                name: "",
                contactPerson: "",
                phoneNumber: "",
                address: "",
                city: "",
                country: "",
                companyId: 0,
              }}
              validationSchema={AddBranchSchema}
              onSubmit={(values: IBranch) => {
                const formattedValues = {
                  ...values
                }
                mutation.mutate(formattedValues)
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
                    marginBottom: theme.spacing.xl,
                  }}
                >
                  {/* Name */}
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
                      {t("name")}
                    </Text>
                    <TextField
                      placeholder={t("name")}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name as string}
                      name={"name"}
                      type={"text"}
                      styles={{color: theme.colors.grey0}}
                      errorMessage={errors.name}
                    />
                  </View>
                  
                  {/* Contact person */}
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
                      styles={{color: theme.colors.grey0}}
                      errorMessage={errors.contactPerson}
                    />
                  </View>
                  
                  {/* Phone number */}
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
                      {t("telephone")}
                    </Text>
                    <TextField
                      placeholder={t("telephone")}
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      value={values.phoneNumber as string}
                      name={"phoneNumber"}
                      type={"text"}
                      styles={{color: theme.colors.grey0}}
                      errorMessage={errors.phoneNumber}
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
                      {t("street")}
                    </Text>
                    <TextField
                      placeholder={t("street")}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address as string}
                      name={"address"}
                      type={"text"}
                      styles={{color: theme.colors.grey0}}
                      errorMessage={errors.address}
                    />
                  </View>
                  
                  {/* City / Country */}
                  <View
                    style={{
                      flexDirection:'row',
                      alignItems:'center',
                      gap: theme.spacing.md,
                    }}
                  >
                    <View 
                      style={{...styles.rows}}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("city")}
                      </Text>
                      <TextField
                        placeholder={t("city")}
                        onChangeText={handleChange("city")}
                        onBlur={handleBlur("city")}
                        value={values.city as string}
                        name={"city"}
                        type={"text"}
                        styles={{color: theme.colors.grey0}}
                        errorMessage={errors.city}
                      />
                    </View>
                    
                    <View 
                      style={{...styles.rows}}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("country")}
                      </Text>
                      <TextField
                        placeholder={t("country")}
                        onChangeText={handleChange("country")}
                        onBlur={handleBlur("country")}
                        value={values.country as string}
                        name={"country"}
                        type={"text"}
                        styles={{color: theme.colors.grey0}}
                        errorMessage={errors.country}
                      />
                    </View>
                  </View>
                    
                </View>

                {/* Button Group */}
                <View
                  style={{
                    ...pageStyle.buttonGroup
                  }}
                >            
                  <Button
                    title={`${t("cancel")}`}
                    onPress={() => {
                      onClose()
                    }}
                    size='md'
                    type='clear'
                    titleStyle={{ ...pageStyle.button16 }}
                    radius={"sm"}
                    containerStyle={{
                      ...pageStyle.buttonContainer,
                      borderColor: theme.colors.primary,
                    }}
                  />          

                  <Button
                    title={`${t("save")}`}
                    onPress={handleSubmit}
                    size='md'
                    color='primary'
                    titleStyle={{ ...pageStyle.button16}}
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

export default AddBranchModal

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  rows: {
    flex: 2,
    //width: 'auto'
  }
})