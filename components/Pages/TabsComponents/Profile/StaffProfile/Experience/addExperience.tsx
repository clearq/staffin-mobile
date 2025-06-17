import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import dayjs from "dayjs";

import { addExperience, deleteExperience, getExperience, updateExperience, updateStaff } from '@/api/backend';

import { IExperience, IUser } from '@/types/UserTypes';

import { CheckBox, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MultiTextField, TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rgbaToHex } from '@/utils/rgba-to-hex';
import DateCalendar from '@/components/UI/Calendar';
import ModalHeader from '../../../ModalHeader';


interface props {
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
  id: any
}


const AddExperienceModal = ({visible, onClose, handleSuccess, id}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [checked, setChecked] = useState(false)

  const AddExperienceSchema = Yup.object().shape({
    companyName: Yup.string().required(t("company-name-required-message")),
    startDate: Yup.string().required(t("start-date-required-message")),
  });

  const mutation = useMutation({
    mutationFn: async (values:any) => {   
      try {
        const response = await addExperience(values);
        return response;
      } catch (error) {
        console.error("Mutation error:", error);
        throw error; 
      }
    },
    onSuccess: () => {
      toast.show(`${t("success-add-message")}`, {
        type: "success",
      });
      handleSuccess();
      onClose();
    },
    onError: () => {
      toast.show(`${t("failed-add-message")}`, {
        type: "error",
      });
    },
  })

  return (
    <Modal
      visible={visible}
    >
      <ModalHeader title={`${t("add")} ${t("experience")}`}/>
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
                staffId: 0,
                userId: 0,
                position: "",
                description: "",
                companyName: "",
                location: "",
                startDate: dayjs().locale('sv').format('YYYY-MM-DD'),
                endDate: dayjs().locale('sv').format('YYYY-MM-DD') || null, 
              }}
              validationSchema={AddExperienceSchema}
              onSubmit={(values: IExperience) => {
                const formattedValues = {
                  ...values,
                  endDate: checked ? null : values.endDate,
                };

                // console.log("value:", formattedValues);
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
                    {/* Position */}
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
                        {t("position")}
                      </Text>
                      <TextField
                        placeholder={t("position")}
                        onChangeText={handleChange("position")}
                        onBlur={handleBlur("position")}
                        value={values.position as string}
                        name={"position"}
                        type={"text"}
                        styles={{color: theme.colors.grey0}}
                      />
                    </View>

                    {/* Company Name */}
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
                        {t("company-name")}
                      </Text>
                      <TextField
                        placeholder={t("company-name")}
                        onChangeText={handleChange("companyName")}
                        onBlur={handleBlur("companyName")}
                        value={values.companyName as string}
                        name={"companyName"}
                        type={"text"}
                        styles={{color: theme.colors.grey0}}
                        errorMessage={errors.companyName}
                      />
                    </View>

                    {/* Location */}
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
                        {t("location")}
                      </Text>
                      <TextField
                        placeholder={t("location")}
                        onChangeText={handleChange("location")}
                        onBlur={handleBlur("location")}
                        value={values.location as string}
                        name={"location"}
                        type={"text"}
                        styles={{color: theme.colors.grey0}}
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
                              justifyContent: 'space-between',
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
                              values.endDate !== null && values.endDate !== undefined
                                ? values.endDate
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

                    {/* Description */}
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
                        {t("description")}
                      </Text>
                      <MultiTextField
                        placeholder={t("description")}
                        onChangeText={handleChange("description")}
                        onBlur={handleBlur("description")}
                        value={values.description as string}
                        name={"description"}
                        type={"text"}
                      />
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
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default AddExperienceModal

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  btnContainer: {
    flexShrink: 2,
  }
})
