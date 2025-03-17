import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import dayjs from "dayjs";

import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import { getDefaultStyles } from 'react-native-ui-datepicker';
import { deleteExperience, getExperience, updateExperience, updateStaff } from '@/api/backend';

import { IExperience, IUser } from '@/types/UserTypes';

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
  data: IExperience;
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
}

const EditExperienceSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  startDate: Yup.string().required("Start date is required"),
});


const EditExperienceModal = ({data, visible, onClose, handleSuccess}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [checked, setChecked] = useState(false)


  const mutation = useMutation({
    mutationFn: async (values:any) => {
      if (!data?.id) {
        console.error("Error: Experience ID is missing");
        return;
      }
      return await updateExperience(data.id, values);
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

  const showAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
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
      await deleteExperience(data.id)
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
                position: data?.position || "",
                description: data?.description || "",
                companyName: data?.companyName,
                location: data?.location || "",
                startDate: data?.startDate,
                endDate: data?.endDate || null,
              }}
              validationSchema={EditExperienceSchema}
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
                          ...styles.inputLabel,
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
                          ...styles.inputLabel,
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
                          ...styles.inputLabel,
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
                        flexDirection:'row',
                        alignItems:'center'
                      }}
                    >
                      <CheckBox 
                        checked={checked}
                        onPress={() => {
                          setChecked(!checked)
                          if(checked === true) {
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

                    {/* Description */}
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
         
            <Button
              title={`${t("delete")}`}
              onPress={showAlert}
              size='md'
              color='error'
              titleStyle={{ ...pageStyle.button16 }}
              radius={"sm"}
              containerStyle={{
                ...styles.buttonContainer,
                borderColor: theme.colors.error,                     
                borderWidth: 2,
                borderRadius:10
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default EditExperienceModal

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
