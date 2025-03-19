import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import { getSkillsList, addStaffSkill, getStaffAllLanguages, addStaffLanguage, getStaffLanguages, deleteStaffLanguage} from '@/api/backend';

import { ILanguage, ISkill } from '@/types/UserTypes';

import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hexToRgba } from '@/utils/rgba-to-hex';
import EditModal from './editModal';


interface props {
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
  id: any
  data: any
}

const EditLanguageModal = ({visible, onClose, handleSuccess, id, data}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [rating, setRating] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage | null>(null)
  const [openModal, setOpenModal] = useState(false)

  
  const handleDelete = async (id:any) => {
    try {
      if (!id) {
        console.error("Error: Experience ID is missing", id);
        return;
      }

      const values = {id: id}

      console.log('id:', id);
      
      await deleteStaffLanguage(values)
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

        }}
      >
        <View style={{flexDirection:'column', gap: theme.spacing.md}}>
          {data && data.length > 0 ? (
            data
              .slice()
              .sort((a:any, b:any) => b.rating - a.rating)  // Sort the copied array
              .map((lang: ILanguage) => (
                <View 
                  key={lang.id} 
                  style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingVertical: theme.spacing.sm 
                  }}
                >
                  <Text
                    style={{
                      ...pageStyle.headline03,
                      color: theme.colors.grey0,
                      width:'30%',
                    }}
                  >
                    {lang.name}
                  </Text>

                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(5)].map((_, index) => (
                      <MaterialCommunityIcons
                        key={index}
                        name={index < lang.rating ? 'star' : 'star-outline'}
                        size={24}
                        color={index < lang.rating ? 'orange': theme.colors.grey3}
                      />
                    ))}
                  </View>

                  <View style={{flexDirection:'row', gap:theme.spacing.md}}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedLanguage(lang)
                        setOpenModal(true)
                      }}
                    >
                      <MaterialCommunityIcons name='pencil' size={32} color={theme.colors.grey3}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert('Alert Title', 'My Alert Msg', [
                          {
                            text: `${t("cancel")}`,
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: `${t("delete")}`, 
                            onPress: () => handleDelete(lang.id)
                          },
                        ]);
                      }}
                    >
                      <MaterialCommunityIcons name='delete' size={32} color={hexToRgba(theme.colors.error, 0.7)} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <TouchableOpacity
                onPress={() => {}}
              >
                <Text
                  style={{
                    ...pageStyle.button16,
                    color: theme.colors.grey0
                  }}
                >
                  {`${t("add-language-skills")}`}
                </Text> // Message when there are no languages
              </TouchableOpacity>
          )}
        </View>

        <Button
          title={`${t("cancel")}`}
          onPress={onClose}
          size='md'
          type='clear'
          titleStyle={{ ...pageStyle.button16}}
          radius={"sm"}
          containerStyle={{
            ...styles.buttonContainer,
            borderColor: theme.colors.divider,                     
            borderWidth: 2,
            borderRadius:10
          }}
        />

      </View>
      
      <EditModal 
        visible= {openModal}
        onModalClose={()=> setOpenModal(!openModal)}
        handleSuccess={handleSuccess}
        data= {selectedLanguage}
      />

    </SafeAreaView>
  </Modal>
  )
}

export default EditLanguageModal

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
    //flex: 1,
    //height: "100%",
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