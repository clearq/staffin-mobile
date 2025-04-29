import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { Formik } from 'formik';
import { getSkillsList, addStaffSkill} from '@/api/backend';

import { ISkill } from '@/types/UserTypes';

import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import ModalHeader from '../../../ModalHeader';


interface props {
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
  id: any
}

const AddSkillModal = ({visible, onClose, handleSuccess, id}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [query, setQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false)

  const { data: skillList } = useQuery({
    queryKey: ["skill-list"],
    queryFn: async () => {
      const response = await getSkillsList();

      // console.log('list:', response?.data);      
      return response ?? []
    }
  });
  

  const AddSkillSchema = Yup.object().shape({
    name: Yup.string().required(t("skill-required-message"))
  });

  const mutation = useMutation({
    mutationFn: async (values:any) => {
      try {
        const response = await addStaffSkill(values)
        
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
      setQuery('');
      setShowDropdown(false)
      onClose();
    },
    onError: () => {
      toast.show(`${t("failed-add-message")}`, {
        type: "error",
      });
    },
  })

  useEffect(() => {
    if (query.length > 0 && skillList) {
      const filtered = skillList.filter((skill: ISkill) =>
        skill.name.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredSkills(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredSkills([]);
      setShowDropdown(false);
    }
  }, [query, skillList]);



  return (
    <Modal
      visible={visible}
    >
      <ModalHeader title={`${t("add")} ${t("skill")}`}/>
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
            }}
            validationSchema={AddSkillSchema}
            onSubmit={(values: ISkill) => {     
              mutation.mutate(values)
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
              <>
              <View
                style={{
                  height: '100%',
                  marginTop: theme.spacing.xl,
                  flexDirection:'column'
                }}
              >
                <Text 
                  style={{
                    ...pageStyle.inputLabel,
                    color: theme.colors.grey0
                  }}
                >
                  {t("skills")}
                </Text>
                
                {/* dropdown menu */}
                <View style={{ ...styles.container, borderColor: theme.colors.divider }}>
                  <View
                    style={{
                      ...pageStyle.inputBox,
                      borderColor: theme.colors.divider,
                      backgroundColor: theme.colors.searchBg,
                      width: "100%",
                      justifyContent: 'space-between',
                      flexDirection: 'row'
                    }}
                  >
                    <TextInput
                      placeholder={t("skill")}
                      placeholderTextColor={theme.colors.divider}
                      value={values.name}
                      style={{ width: '100%', ...pageStyle.inputText, color: theme.colors.grey0 }}
                      onChangeText={(text) => {
                        setQuery(text);
                        setFieldValue("name", text); 
                      }}
                      onBlur={handleBlur("name")}
                    />

                  </View>
                  {/* Dropdown Suggestions */}
                  {showDropdown && (
                    <View style={{...pageStyle.dropdown, backgroundColor: theme.colors.background}} >
                      <ScrollView>
                      {filteredSkills.map((item: ISkill) => (
                        <TouchableOpacity
                          key={item.id}
                          style={pageStyle.suggestionItem}
                          onPress={() => {
                            setQuery(item.name);
                            setFieldValue("name", item.name);
                            setFieldValue("id", item.id)
                            setShowDropdown(false);
                          }}
                        >
                          <Text  style={{...pageStyle.button16, color:theme.colors.grey0}}>{item.name}</Text>
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

                {/* Button Group */}
                <View
                  style={{
                    ...pageStyle.buttonGroup,
                    marginTop: theme.spacing.xl * 2,
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
                      borderWidth: 2
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
export default AddSkillModal


const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  container: {
    width: "100%",
  },
})