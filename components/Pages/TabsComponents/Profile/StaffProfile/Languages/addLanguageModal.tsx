import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import { getSkillsList, addStaffSkill, getStaffAllLanguages, addStaffLanguage} from '@/api/backend';

import { ILanguage, ISkill } from '@/types/UserTypes';

import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalHeader from '../../../ModalHeader';


interface props {
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
  id: any
}

const AddLanguageModal = ({visible, onClose, handleSuccess, id}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [rating, setRating] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage | null>(null)
  const [listItem, setListItem] = useState ([])
  const [showDropdown, setShowDropdown] = useState(false)

  const { data: languageList } = useQuery({
    queryKey: ["language-lisItemt"],
    queryFn: async () => {
      const response = await getStaffAllLanguages();

      return response ?? []
    }
  });
  

  const AddLanguageSchema = Yup.object().shape({
    name: Yup.string().required(t("language-required-message")),
    rating: Yup.number()
    .min(1, t("rating-required-message")) // Ensures rating is at least 1
    .required(t("rating-required-message")),
  });

  const mutation = useMutation({
    mutationFn: async (values:any) => {
      try {
        const response = await addStaffLanguage(values)
        
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
      setShowDropdown(false)
      onClose();
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
    <ModalHeader title={`${t("add")} ${t("language")}`}/>
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
            id: 0,
            name: '',
            rating: 0,
          }}
          validationSchema={AddLanguageSchema}
          onSubmit={(values: ILanguage) => {     
            mutation.mutate(values)
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
            <>
            <View
              style={{
                height: '100%',
                
                marginTop: theme.spacing.xl,
                flexDirection:'column',
              }}
            >
              <Text 
                style={{
                  ...pageStyle.inputLabel,
                  color: theme.colors.grey0,
                }}
              >
                {t("language")}
              </Text>
              
              {/* dropdown menu */}
              <View style={{ ...styles.container, borderColor: theme.colors.divider }}>
                <View
                  style={{
                    ...pageStyle.inputBox,
                    borderColor: theme.colors.divider,
                    backgroundColor: theme.colors.searchBg,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <TextInput
                    placeholder={t("language")}
                    placeholderTextColor={theme.colors.divider}
                    value={values.name}
                    style={{ width: '80%', ...pageStyle.inputText, color: theme.colors.grey0}}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />

                  <TouchableOpacity
                    onPress={() => setShowDropdown(!showDropdown)}
                    style={{
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons 
                      name= {showDropdown ? 'chevron-up' : 'chevron-down'}
                      size={16} 
                      color={theme.colors.grey0} 
                    />
                  </TouchableOpacity>

                </View>
                {/* Dropdown Suggestions */}
                {showDropdown && (
                  <View style={{...pageStyle.dropdown, 
                    backgroundColor: theme.colors.background,}} >
                    <ScrollView>
                    {languageList.map((item: ILanguage) => (
                      <TouchableOpacity
                        key={item.id}
                        style={{...pageStyle.suggestionItem, }}
                        onPress={() => {
                          setFieldValue("name", item.name);
                          setFieldValue("id", item.id)
                          setShowDropdown(false);
                        }}
                      >
                        <Text style={{...pageStyle.button16, color:theme.colors.grey0}}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                    </ScrollView>
                  </View>
                )}                      

                {errors.name ? (
                  <Text
                    style={{
                      ...pageStyle.smText,
                      color: theme.colors.error,
                      marginHorizontal: theme.spacing.xs,
                    }}
                  >
                    {errors.name}
                  </Text>
                ) : null}
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
                  ...pageStyle.buttonGroup,
                  marginTop: theme.spacing.xl *2
                }}
              >            
                <Button
                  title={`${t("cancel")}`}
                  onPress={() => {
                    onClose()
                  }}
                  size='md'
                  type='outline'
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
                  titleStyle={{ ...pageStyle.button16 }}
                  radius={"sm"}
                  containerStyle={{
                    ...pageStyle.buttonContainer,
                    borderColor: theme.colors.primary,        
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

export default AddLanguageModal

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  container: {
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 10, 
    top: "50%",
    transform: [{ translateY: -10 }],
  },
})