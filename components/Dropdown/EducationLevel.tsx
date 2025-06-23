import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { addPreferredCity, getAllCities, getEducationLevels, getProfessionAreas, getUserPreferences, updateProfessionArea } from '@/api/backend'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import pageStyle from '@/constants/Styles'
import { ICity, IProfessionArea } from '@/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { number } from 'yup'

type Props = {
  value: number;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

const EducationLevel = ({value, setFieldValue}: Props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [educationLevel, setEducationLevel] = useState({
    id: value || 0,
    name: ''
  });

  const [showDropdown, setShowDropdown] = useState(false)

  const {data= []} = useQuery({
    queryKey: ['Education-level-list'],
    queryFn: async () => {
      const response = await getEducationLevels()

      return response
    }
  })

  useEffect(() => {
    if (value && data.length > 0) {
      const selected = data.find((item:{id: number, name: string}) => item.id === value);
      if (selected) {
        setEducationLevel(selected);
      }
    }
  }, [value, data]);

  return (

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
          placeholder={t("education-level")}
          placeholderTextColor={theme.colors.divider}
          value={educationLevel.name}
          style={{ width: '80%', ...pageStyle.inputText, color: theme.colors.grey0 }}
          editable={false} // make this non-editable
        />

        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <MaterialCommunityIcons 
            name={showDropdown ? 'chevron-up' : 'chevron-down'}
            size={16} 
            color={theme.colors.grey0} 
          />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={{ ...pageStyle.dropdown, backgroundColor: theme.colors.background }}>
          <ScrollView>
            {data.map((item: IProfessionArea) => (
              <TouchableOpacity
                key={item.id}
                style={{ ...pageStyle.suggestionItem }}
                onPress={() => {
                  setEducationLevel({ id: item.id, name: item.name });
                  setFieldValue("educationLevelId", item.id); // ✅ update Formik value
                  setShowDropdown(false);
                }}
              >
                <Text style={{ ...pageStyle.inputText, color: theme.colors.grey0 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default EducationLevel

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