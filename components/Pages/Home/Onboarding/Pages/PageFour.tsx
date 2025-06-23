import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Sizes, theme } from '@/constants/Theme';
import { CheckBox, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import pageStyle from '@/constants/Styles';
import { ICity, IUser } from '@/types';
import { deletePreferredCity, getPreferredCities, getProfessionAreas, getUserPreferences } from '@/api/backend';
import { useQuery } from '@tanstack/react-query';
import ProfessionArea from '@/components/Dropdown/ProfessionArea';
import Cities from '@/components/Dropdown/Cities';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const PageFour = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  const { isLoading, authState:{ userData, userId } } = useAuth();

  const {data: cities = [], refetch: cityRefetch } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      if (!userId) {
        console.warn("No userId — skipping fetch");
        return [];
      }
  
      const response = await getPreferredCities();
      return response ?? []; 
    }
  }) 

  const handleDeletePreferredCity = async (id: number) => {
    try {
      await deletePreferredCity(id)
      cityRefetch()

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <View style={{...styles.col, padding: theme.spacing.md}}>
      <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
        {t("intro-step-four-message")}
      </Text>

      <View>
        <Cities refetch={cityRefetch} />

        <View style={{...styles.col, flexWrap: 'wrap', marginTop: theme.spacing.md}}>
          {cities.length > 0 && cities.map((city: ICity) => (
            <View 
              key={city.cityId}
              style={{
                flexDirection: 'row',
                gap: theme.spacing.sm,
                alignItems: 'center'
              }}
            >
              <Text style={{...pageStyle.inputText, color: theme.colors.grey0}}>
                {city.cityName}
              </Text>

              <TouchableOpacity
                onPress={() => handleDeletePreferredCity(city.cityId)}
              >
                <MaterialCommunityIcons name='close-circle' color={theme.colors.primary} size={18} />
              </TouchableOpacity>

            </View>
          ))}
        </View>   
      </View>
    </View>
  )
}

export default PageFour

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
})