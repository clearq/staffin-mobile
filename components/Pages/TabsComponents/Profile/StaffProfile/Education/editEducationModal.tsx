import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import dayjs from "dayjs";

import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import { useDefaultStyles } from 'react-native-ui-datepicker';
import { deleteEducation, deleteExperience, getExperience, updateEducation, updateExperience, updateStaff } from '@/api/backend';

import { IEducation, IExperience, IUser } from '@/types/UserTypes';

import { CheckBox, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MultiTextField, TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rgbaToHex } from '@/utils/rgba-to-hex';
import DateCalendar from '@/components/UI/Calendar';
import page from '@/app/(app)/(tabs)/application';
import ModalHeader from '../../../ModalHeader';
import EducationLevel from '@/components/Dropdown/EducationLevel';

interface props {
  data: IEducation;
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
}


const EditEducationModal = ({data, visible, onClose, handleSuccess}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [checked, setChecked] = useState(false)

  const EditEducationSchema = Yup.object().shape({
    institution: Yup.string().required(t("institution-required-message")),
    startDate: Yup.string().required(t("start-date-required-message")),
  });


  const mutation = useMutation({
    mutationFn: async (values: any) => {
      if (!data?.id) {
        console.error("Error: Experience ID is missing");
        return;
      }

      return await updateEducation(data.id, values);
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

  const showAlert = () =>
    Alert.alert(`${t("delete")}`, `${t("alert-deletion-confirmation-message")}`, [
      {
        text: `${t("cancel")}`,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: `${t("delete")}`, 
        onPress: () => handleDelete()
      },
    ]
  );

  const handleDelete = async () => {
    try {
      if (!data?.id) {
        console.error("Error: Experience ID is missing");
        return;
      }
      await deleteEducation(data.id)
      onClose()
      handleSuccess()
      
      toast.show(`${t("success-delete-message")}`, {
        type: "success",
      });
    } catch (error) {
      toast.show(`${t("failed-delete-message")}`, {
        type: "error",
      })              
    }
  }

  useEffect(() => {
      if (data?.endDate === null) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }, [data?.endDate]);

  return (
    <Modal
      visible={visible}
    >
      <ModalHeader title={`${t("edit")} ${t("education")}`}/>
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
                ...data,
                institution: data?.institution || "",
                fieldOfStudy: data?.fieldOfStudy || "",
                educationLevelId: data?.educationLevelId || 0,
                startDate: data?.startDate,
                endDate: data?.endDate || "",
              }}
              validationSchema={EditEducationSchema}
              onSubmit={(values: IEducation) => {
                const formattedValues = {
                  ...values,
                  endDate: checked ? null : values.endDate,
                };

                mutation.mutate(formattedValues);
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
                    {/* Field Of Study */}
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
                        {t("field-of-study")}
                      </Text>
                      <TextField
                        placeholder={t("field-of-study")}
                        onChangeText={handleChange("fieldOfStudy")}
                        onBlur={handleBlur("fieldOfStudy")}
                        value={values.fieldOfStudy as string}
                        name={"fieldOfStudy"}
                        type={"text"}
                        styles={{color: theme.colors.grey0}}
                        errorMessage={errors.fieldOfStudy}
                      />
                    </View>

                    {/* Institution */}
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
                        {t("institution")}
                      </Text>
                      <TextField
                        placeholder={t("institution")}
                        onChangeText={handleChange("institution")}
                        onBlur={handleBlur("institution")}
                        value={values.institution as string}
                        name={"institution"}
                        type={"text"}
                        styles={{color: theme.colors.grey0}}
                        errorMessage={errors.institution}
                      />
                    </View>

                    {/* Education Level */}
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
                        {t("education-level")}
                      </Text>
                      <EducationLevel 
                        value={values.educationLevelId}
                        setFieldValue={setFieldValue}
                      />
                    </View>


                    {/* Start-/ End Date */}
                    <View
                      style={{
                        flexDirection: 'column',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: theme.spacing.md,
                          width: '100%'
                        }}
                      >
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
                            {t("start-date")}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setShowStartTimePicker(true)}
                            style={{
                              ...pageStyle.inputBox,
                              borderColor: theme.colors.divider,
                              backgroundColor: theme.colors.searchBg,
                              flexDirection: 'row',
                              justifyContent: 'space-between'
                            }}
                          >                       
                        
                            <Text
                              style={{
                                ...pageStyle.inputText,
                                color: theme.colors.grey0 
                              }}
                            >
                              {dayjs(values.startDate).format('YYYY-MM-DD')}                           
                            </Text>                            
                      
                            
                            <MaterialCommunityIcons 
                              name='calendar-month' 
                              size={20}
                              color={theme.colors.grey3}
                            />
                          </TouchableOpacity>

                          <Text
                            style={{
                              ...pageStyle.smText,
                              color: theme.colors.error,
                              marginHorizontal: theme.spacing.xs,
                            }}
                          >
                            {errors.startDate}
                          </Text>
                          
                          {showStartTimePicker && (    
                            <DateCalendar 
                              date={values.startDate}
                              onClose={() => setShowStartTimePicker(false)}
                              setDate={(date) => {
                                const formatDate = dayjs(date).format('YYYY-MM-DD')
                                setFieldValue('startDate', formatDate)
                              }}
                              onSubmit={() => setShowStartTimePicker(false)}
                            />         
                          )}

                        </View>

                        <View
                          style={{
                            flex: 1,
                          }}
                        >
                          <Text 
                            style={{
                              ...pageStyle.inputLabel,
                              color: checked ? theme.colors.disabled : theme.colors.grey0
                            }}
                          >
                            {t("end-date")}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setShowEndTimePicker(true)}
                            style={{
                              ...pageStyle.inputBox,
                              borderColor: checked ? theme.colors.disabled : theme.colors.divider,
                              backgroundColor: theme.colors.searchBg,
                              flexDirection: 'row',
                              justifyContent: 'space-between'
                            }}
                            disabled={checked}
                          >
                          
                            <Text
                              style={{
                                ...pageStyle.inputText,
                                color: checked ? theme.colors.disabled : theme.colors.grey0 
                              }}
                            >
                              {values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : t("ongoing")}                       
                            </Text>

                            <MaterialCommunityIcons 
                              name='calendar-month' 
                              size={20}
                              color={checked ? theme.colors.disabled : theme.colors.grey3}
                            />
                          </TouchableOpacity>                     
                          {showEndTimePicker && (
                            <DateCalendar 
                              date={
                                values.endDate !== null 
                                ? values.endDate 
                                : data.endDate !== null 
                                  ? data.endDate 
                                  : dayjs().format("YYYY-MM-DD")
                              }
                              onClose={() => setShowEndTimePicker(false)}
                              setDate={(date) => {
                                const formatDate = dayjs(date).format('YYYY-MM-DD')
                                setFieldValue('endDate', formatDate) 
                              }} 
                              onSubmit={() => setShowEndTimePicker(false)}
                          />   
                          )}
                        </View>                   
                      </View>
                      <View
                        style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <CheckBox 
                          title={t("present")}
                          checked={checked}
                          onPress={() => {
                            setChecked(!checked)
                            if (checked === true) {
                              setFieldValue('endDate', null)
                            }
                          }}
                          containerStyle={{ 
                            backgroundColor: 'transparent', 
                            borderWidth: 0,
                            margin: 0,
                          }}
                          textStyle={{...pageStyle.paraText, fontWeight: 'normal'}}
                          checkedColor={theme.colors.primary} 
                        />
                      </View>

                    </View>
                  </View>

                  {/* Button Group */}
                  <View
                    style={{
                      ...pageStyle.buttonGroup,
                      flex: 1,
                      marginTop: Sizes.fixPadding * 2,
                    }}
                  > 
                    <View
                      style={{
                        ...styles.btnContainer
                      }}
                    >
                      <Button
                        title={`${t("cancel")}`}
                        onPress={() => {
                          onClose()
                          setChecked(false)
                        }}
                        size={'lg'}
                        type={'outline'}
                        color={'primary'}
                        titleColor={theme.colors.primary}
                      />
                    </View>           
                      
                    <View
                      style={{
                        ...styles.btnContainer
                      }}
                    >
                      <Button
                        title={`${t("save")}`}
                        onPress={handleSubmit}
                        size={'lg'}
                        color={'primary'}
                        titleColor={theme.colors.white}
                      />
                    </View> 
                  </View>
                </>
              )}
            </Formik>

            <Button
              title={`${t("delete")}`}
              onPress={showAlert}
              size={'lg'}
              color={'error'}
              titleColor={theme.colors.white}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default EditEducationModal

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  btnContainer: {
    flexShrink: 2,
  }
})