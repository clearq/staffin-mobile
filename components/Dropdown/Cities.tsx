import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { addPreferredCity, getAllCities } from '@/api/backend'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import pageStyle from '@/constants/Styles'
import { ICity } from '@/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface props {
  refetch: () => void
}

const Cities  = ({refetch}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [showDropdown, setShowDropdown] = useState(false)
  const [city, setCity] = useState('')

  const {data = []} = useQuery({
    queryKey: ["city-list"],
    queryFn: async () => {
      return await getAllCities()
    }
  })

  const handleAddCity = async (id: number) => {
    try {
      const response = await addPreferredCity(id)
      refetch()

      return response
    } catch (error) {
      console.error(error)
    }
  }

 
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
          placeholder={t("area")}
          placeholderTextColor={theme.colors.divider}
          value={city}
          style={{ width: '80%', ...pageStyle.inputText, color: theme.colors.grey0}}
          onChangeText={(text: string) => setCity(text)}
          onBlur={() => {}}
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
          {data.map((item: {id: number, name: string}) => (
            <TouchableOpacity
              key={item.id}
              style={{...pageStyle.suggestionItem, }}
              onPress={() => {
                handleAddCity(item.id)
                setShowDropdown(false);
              }}
            >
              <Text style={{...pageStyle.inputText, color:theme.colors.grey0}}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
      )}                      
    </View>
  )
}

export default Cities

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