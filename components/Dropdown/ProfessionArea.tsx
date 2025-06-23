import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { addPreferredCity, getAllCities, getProfessionAreas, getUserPreferences, updateProfessionArea } from '@/api/backend'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import pageStyle from '@/constants/Styles'
import { ICity, IProfessionArea } from '@/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface props {
  refetch: () => void
}


const ProfessionArea  = ({refetch}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const [showDropdown, setShowDropdown] = useState(false)
  const [ProfessionArea, setProfessisonArea] = useState('')
  const [selectedProfessionAreas, setSelectedProfessionAreas] = useState<number[]>([]);

  const {data: preference = [], refetch: preferenceRefetch} = useQuery({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const response = await getUserPreferences()
      //console.log('res', response);
      
      return response
    }
  })

  const {data = []} = useQuery({
    queryKey: ["professionArea-list"],
    queryFn: async () => {
      return await getProfessionAreas()
    }
  })

  const handleAddPreferences = async (id: number) => {
    const currentIds = preference?.professionAreaId || [];

    if (currentIds.includes(id)) return;

    const updatedIds = [...currentIds, id];

    try {
      await updateProfessionArea(updatedIds);

      setSelectedProfessionAreas(updatedIds); // Optional: keep local state in sync
      preferenceRefetch();
    } catch (error) {
      console.error("Failed to update profession areas:", error);
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
          placeholder={t("profession-area")}
          placeholderTextColor={theme.colors.divider}
          value={ProfessionArea}
          style={{ width: '80%', ...pageStyle.inputText, color: theme.colors.grey0}}
          onChangeText={(text) => setProfessisonArea(text)}
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
          {data.map((item:IProfessionArea) => (
            <TouchableOpacity
              key={item.id}
              style={{...pageStyle.suggestionItem, }}
              onPress={() => {
                handleAddPreferences(item.id)
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

export default ProfessionArea

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