import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Sizes, theme } from '@/constants/Theme';
import { CheckBox, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import pageStyle from '@/constants/Styles';
import { IUser } from '@/types';
import { getProfessionAreas, getUserPreferences, updateProfessionArea } from '@/api/backend';
import { useQuery } from '@tanstack/react-query';
import ProfessionArea from '@/components/Dropdown/ProfessionArea';


interface props {
  user: IUser
  handleSuccess: () => void
}

const PageThree = ({user, handleSuccess}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  const {data: preference = [], refetch: preferenceRefetch} = useQuery({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const response = await getUserPreferences()
      // console.log('res', response.professionAreaId);
      
      return response
    }
  })

  const { data: allProfessions = [] } = useQuery({
    queryKey: ["all-profession-areas"],
    queryFn: async () => await getProfessionAreas(),
  });

  const preferredProfessionAreas = useMemo(() => {
    if (!preference.professionAreaId || !Array.isArray(allProfessions)) return [];
  
    return allProfessions.filter((area) =>
      preference.professionAreaId.includes(area.id)
    );
  }, [preference, allProfessions]);

  const handleDeleteProfessionArea = async (id: number) => {
    const currentIds = preference?.professionAreaId || [];

    const updatedIds = currentIds.filter((itemId: number) => itemId !== id);

    try {
      await updateProfessionArea(updatedIds); 

      preferenceRefetch(); // refresh
    } catch (error) {
      console.error("Failed to delete profession area:", error);
    }
  }

  return (
    <View style={{...styles.col, padding: theme.spacing.md}}>
      <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
        <Text>{t("intro-step-three-message-1")}</Text>
        <Text style={{color: theme.colors.secondary}}>{user?.firstName || "Guest"}</Text>
        <Text>{t("intro-step-three-message-2")}</Text>
      </Text>

      <View>
        <ProfessionArea refetch={preferenceRefetch} />
        <View style={{...styles.col, flexWrap: 'wrap', marginTop: theme.spacing.md}}>
          {preferredProfessionAreas.length > 0 && preferredProfessionAreas.map((item, index: number) => (
            <View 
              key={index}
              style={{
                flexDirection: 'row',
                gap: theme.spacing.xs,
                alignItems: 'center'
              }}
            >
            <Text style={{...pageStyle.inputText, color: theme.colors.grey0}}>
              {item.name}
            </Text>

            <TouchableOpacity
              onPress={() => handleDeleteProfessionArea(item.id)}
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

export default PageThree

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // gap: theme.spacing?.md,
  },
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
})