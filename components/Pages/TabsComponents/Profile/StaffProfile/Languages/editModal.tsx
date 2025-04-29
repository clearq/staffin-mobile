import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import { getSkillsList, addStaffSkill, getStaffAllLanguages, addStaffLanguage, updateStaffLanguage} from '@/api/backend';

import { ILanguage, IRating, ISkill } from '@/types/UserTypes';

import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface props {
  visible: boolean;
  onModalClose: () => void;
  handleSuccess: () => void
  data: ILanguage | null
}

const EditModal = ({visible, onModalClose, handleSuccess, data}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [rating, setRating] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage | null>(null)
  const [listItem, setListItem] = useState ([])
  const [showDropdown, setShowDropdown] = useState(false)

  

  const EditLanguageSchema = Yup.object().shape({
    rating: Yup.number()
    .min(1, t("rating-required-message")) // Ensures rating is at least 1
    .required(t("rating-required-message")),
  });

  const mutation = useMutation({
    mutationFn: async (values:IRating) => {
      try {
        //console.log(values);
        
        const response = await updateStaffLanguage(values)
        
        return response;
      } catch (error) {
        console.error("Mutation error:", error); 
        throw error; 
      }
    },
    onSuccess: () => {
      toast.show(`${t("success-update-message")}`, {
        type: "success",
      });
      handleSuccess();
      onModalClose();
    },
    onError: () => {
      toast.show(`${t("failed-update-message")}`, {
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
        <Formik
          initialValues={{
            id: data?.id!,
            rating: data?.rating!,
          }}
          validationSchema={EditLanguageSchema}
          onSubmit={(values: IRating) => {     
            mutation.mutate(values)
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
            <>
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                flexDirection:'column',
              }}
            >
              <Text 
                style={{
                  ...styles.inputLabel,
                  color: theme.colors.grey0,
                }}
              >
                {t("language")}
              </Text>
              
              {/* dropdown menu */}
              <View style={{ ...styles.container, borderColor: theme.colors.divider }}>
                
                <Text style={{...pageStyle.headline02, color: theme.colors.grey0}}>{data?.name}</Text>  
              
              </View>
              
              {/* Rating */}
              <View style={{ flexDirection: 'row', marginTop: theme.spacing.xl }}>
                {[...Array(5)].map((_, index) => (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => {
                      setFieldValue("rating", index + 1)
                      setRating(index + 1)
                    }}
                  >
                    <MaterialCommunityIcons
                      name={index < values.rating ? 'star' : 'star-outline'} // Filled star or outline
                      size={32}
                      color={index < values.rating ? 'orange' : theme.colors.grey3} // Highlight color when selected
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {errors.rating ? (
                <Text
                  style={{
                    ...pageStyle.smText,
                    color: theme.colors.error,
                    marginHorizontal: theme.spacing.xs,
                  }}
                >
                  {errors.rating}
                </Text>
              ) : null}

              {/* Button Group */}
              <View
                style={{
                  ...styles.buttonGroup
                }}
              >            
                <Button
                  title={`${t("cancel")}`}
                  onPress={() => {
                    onModalClose()
                  }}
                  size='md'
                  type='outline'
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
            </View>
          </>
          )}
        </Formik>

      </View>
    </SafeAreaView>
  </Modal>
  )
}

export default EditModal

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
  container: {
    width: "100%",
  },
  input: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    borderRadius: theme.spacing?.sm,
    marginBottom: theme.spacing?.xs,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 10, 
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  dropdown: {
    position: "absolute",
    top: '100%',
    left: 0,
    width: "100%",
    maxHeight: 200,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    zIndex: 9999,
    elevation: 5
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
})