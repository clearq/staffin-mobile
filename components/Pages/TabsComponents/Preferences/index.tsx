import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput} from 'react-native'
import React, { useMemo, useState } from 'react'

import { Fonts, Sizes, theme } from '@/constants/Theme'
import { Avatar, CheckBox, Divider, ListItem, useTheme } from '@rneui/themed'

import { ICity, IUser } from '@/types';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { deletePreferredCity, getPreferenceOptions, getPreferredCities, getUserPreferences } from '@/api/backend';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';

import { useAuth } from '@/contexts/authContext';
import Cities from '@/components/Dropdown/Cities';
import ProfessionArea from '@/components/Dropdown/ProfessionArea';

const index = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const { isLoading, authState:{ userData, userId } } = useAuth();

  const [selectedEmploymentId, setSelectedEmploymentId] = useState(0)
  const [selectedJobId, setSelectedJobId] = useState(0)
  const [selectedWorkPlaceId, setSelectedWorkPlaceId] = useState(0)

  const {data: preference, refetch: preferenceRefetch} = useQuery({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const response = await getUserPreferences()
      // console.log(response);
      
      return response
    }
  })

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

  const employmentTypeRadio = useMemo(() => ([
    {
      id: 1,
      label: t("full-time"),
      value: 'Heltid',
    }, {
      id: 2,
      label: t("part-time"),
      value: 'Deltid',
    }, {
      id: 3,
      label: t("extra-job"),
      value: 'Extraarbete',
    }, {
      id: 4,
      label: t("internship"),
      value: 'Praktik',
    }, {
      id: 5,
      label: t("not-specified"),
      value: "Not specified"
    }
  ]),[])

  const jobTypeRadio = useMemo(() => ([
    {
      id: 1,
      label: t("instant"),
      value: 'Akutbemanning',
    }, {
      id: 2,
      label: t("regular"),
      value: 'Förhandsbemanning',
    }, {
      id: 3,
      label: t("not-specified"),
      value: "Not specified"
    }
  ]),[])
  
  const workPlaceTypeRadio = useMemo(() => ([
    {
      id: 1,
      label: t("on-site"),
      value: 'På plats',
    }, {
      id: 2,
      label: t("remote"),
      value: 'Distans',
    }, {
      id: 3,
      label: t("hybrid"),
      value: "Hybrid"
    }, {
      id: 4,
      label: t("not-specified"),
      value: "Not specified"
    }
  ]),[])

  const handleDeletePreferredCity = async (id: number) => {
    try {
      await deletePreferredCity(id)
      cityRefetch()

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <View style={{padding: theme.spacing.md}}>
      <View
        style={{...styles.col}}
      >
        <View>
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("area")}:`}
          </Text>

          <Cities 
            refetch={cityRefetch}
          />

          <View style={{...styles.row, flexWrap: 'wrap', marginTop: theme.spacing.md}}>
            {cities.length > 0 && cities.map((city: ICity) => (
              <View 
                key={city.cityId}
                style={{
                  flexDirection: 'row',
                  gap: theme.spacing.sm,
                  alignItems: 'center'
                }}
              >
                <Text style={{...pageStyle.inputText, color: theme.colors.grey0}}>{city.cityName}</Text>

                <TouchableOpacity
                  onPress={() => handleDeletePreferredCity(city.cityId)}
                >
                  <MaterialCommunityIcons name='close-circle' color={theme.colors.primary} size={18} />
                </TouchableOpacity>

              </View>
            ))}
          </View>        
        </View>

        <View>
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("profession-area")}:`}
          </Text> 

          <ProfessionArea 
            refetch={preferenceRefetch}
          />         
        </View>

        <View style={{...styles.radioComponent}}>
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("employment-type")}:`}
          </Text>

          <View style={{...styles.radioItemGroup}}>
            {employmentTypeRadio.map(item => (
              <View key={item.id} style={{...styles.radioButtonGroup}}>
                <CheckBox 
                  checked={selectedEmploymentId === item.id}
                  onPress={() => 
                    selectedEmploymentId === item.id
                    ? setSelectedEmploymentId(0)
                    : setSelectedEmploymentId(item.id)
                  }
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={16}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

      </View>  
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.md
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  radioComponent: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  radioItemGroup: {
    flexDirection: 'row',
    flexWrap : 'wrap',
    justifyContent: 'flex-start'
  },
  radioButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})