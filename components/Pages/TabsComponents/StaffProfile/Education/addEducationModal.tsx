import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import dayjs from "dayjs";

import { addEducation, addExperience, deleteExperience, getExperience, updateExperience, updateStaff } from '@/api/backend';

import { IEducation, IExperience, IUser } from '@/types/UserTypes';

import { CheckBox, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MultiTextField, TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rgbaToHex } from '@/utils/rgba-to-hex';
import DateCalendar from '@/components/UI/Calendar';


interface props {
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
  id: any
}

const AddEducationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  institution: Yup.string().required("Institution is required"),
  startDate: Yup.string().required("Start date is required"),
});


const AddEducationModal = ({visible, onClose, handleSuccess, id}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [checked, setChecked] = useState(false)

  const mutation = useMutation({
    mutationFn: async (values:any) => {   
      try {
        const response = await addEducation(values);
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
                staffId: 0,
                name: "",
                institution: "",
                startDate: dayjs().locale('sv').format('YYYY-MM-DD'),
                endDate: dayjs().locale('sv').format('YYYY-MM-DD') || null, 
              }}
              validationSchema={AddEducationSchema}
              onSubmit={(values: IEducation) => {
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
                    {/* Name */}
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text 
                        style={{
                          ...styles.inputLabel,
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

                    {/* Institution */}
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text 
                        style={{
                          ...styles.inputLabel,
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


                    {/* Start-/ End Date */}
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center'
                      }}
                    >
                      <CheckBox 
                        checked={checked}
                        onPress={() => {
                          setChecked(!checked)
                          if (checked === true) {
                            setFieldValue('endDate', null)
                          }
                        }}
                      />
                      <Text
                        style={{ 
                          ...styles.inputLabel, 
                          color: theme.colors.grey0
                        }}
                      >
                        {`${t("present")}`}
                      </Text>
                    </View>
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
                            ...styles.inputLabel,
                            color: theme.colors.grey0
                          }}
                        >
                          {t("start-date")}
                        </Text>
                        <TouchableOpacity
                          onPress={() => setShowStartTimePicker(true)}
                          style={{
                            ...styles.dateInput,
                            borderColor: theme.colors.divider,
                            backgroundColor: theme.colors.searchBg
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
                            ...styles.inputLabel,
                            color: checked ? theme.colors.disabled : theme.colors.grey0
                          }}
                        >
                          {t("end-date")}
                        </Text>
                        <TouchableOpacity
                          onPress={() => setShowEndTimePicker(true)}
                          style={{
                            ...styles.dateInput,
                            borderColor: checked ? theme.colors.disabled : theme.colors.divider,
                            backgroundColor: theme.colors.searchBg
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
                  </View>

                  {/* Button Group */}
                  <View
                    style={{
                      ...styles.buttonGroup
                    }}
                  >            
                    <Button
                      title={`${t("cancel")}`}
                      onPress={() => {
                        onClose()
                        setChecked(false)
                      }}
                      size='md'
                      type='clear'
                      titleStyle={{ ...pageStyle.button16 }}
                      radius={"sm"}
                      containerStyle={{
                        ...styles.buttonContainer,
                        borderColor: theme.colors.primary,
                        borderWidth: 2,
                      }}
                    />                      

                    <Button
                      title={`${t("save")}`}
                      onPress={handleSubmit}
                      size='md'
                      color='primary'
                      titleStyle={{ ...pageStyle.button16 }}
                      radius={"sm"}
                      containerStyle={{
                        ...styles.buttonContainer,
                        borderColor: theme.colors.primary,                     
                        borderWidth: 2,
                        borderRadius:10
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

export default AddEducationModal

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
  buttonGroup:{
    flexDirection: 'row',
    gap: theme.spacing?.md,
    width: '100%',
    marginTop: theme.spacing?.xl,
    marginBottom: theme.spacing?.lg,
  },
  buttonContainer: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 0,
  },
  dateInput:{
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    borderRadius: theme.spacing?.sm,
    marginBottom: theme.spacing?.xs,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
})