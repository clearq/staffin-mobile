import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'

import { Fonts, Sizes, theme } from '@/constants/Theme'
import { Avatar, CheckBox, Divider, ListItem, useTheme } from '@rneui/themed'

import { ICity, IUser } from '@/types';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { deletePreferredCity, getPreferenceOptions, getPreferredCities, getProfessionAreas, getUserPreferences, setUserPreferences, updateProfessionArea } from '@/api/backend';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';

import { useAuth } from '@/contexts/authContext';
import Cities from '@/components/Dropdown/Cities';
import ProfessionArea from '@/components/Dropdown/ProfessionArea';
import { Button } from '@/components/UI/Button';
import { number } from 'yup';

const index = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const { isLoading, authState:{ userData, userId } } = useAuth();

  const [selectedEmploymentId, setSelectedEmploymentId] = useState<number[]>([])
  const [selectedJobId, setSelectedJobId] = useState<number[]>([])
  const [selectedWorkPlaceId, setSelectedWorkPlaceId] = useState<number[]>([])

  const {data: preference = {}, refetch: preferenceRefetch} = useQuery({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const response = await getUserPreferences()
      // console.log('res', response);
      
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

  const { data: allProfessions = [] } = useQuery({
    queryKey: ["all-profession-areas"],
    queryFn: getProfessionAreas,
  });

  const preferredProfessionAreas = useMemo(() => {
    if (!preference.professionAreaId || !Array.isArray(allProfessions)) return [];
  
    return allProfessions.filter((area) =>
      preference.professionAreaId.includes(area.id)
    );
  }, [preference, allProfessions]);


  const handleDeletePreferredCity = async (id: number) => {
    try {
      await deletePreferredCity(id)
      cityRefetch()

    } catch (error) {
      console.error(error)
    }
  }

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

  useEffect(() => {
    if (preference) {
      setSelectedEmploymentId(preference.employmentTypeId ?? []);
      setSelectedJobId(preference.jobTypeId ?? []);
      setSelectedWorkPlaceId(preference.workplaceTypeId ?? []);
    }
  }, [preference])

  const handleSubmit = async () => {
    try {
       const response = await setUserPreferences({
        jobTypeIds: selectedJobId,
        employmentTypeIds: selectedEmploymentId,
        workplaceTypeIds: selectedWorkPlaceId
       })
       
       toast.show(`${t("success-update-message")}`, {
        type: "success",
      });
      
      preferenceRefetch()

      return response
    } catch (error) {
      toast.show(`${t("failed-update-message")}`, {
        type: "error",
      });
    }
  }

  return (
    <View style={{}}>
      <View
        style={{...styles.col}}
      >
        <View 
          style={{
            ...styles.sectionContainer,
          }}
        >
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
                  gap: theme.spacing.xs,
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

        <View
          style={{
            ...styles.sectionContainer,
          }}
        >
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("profession-area")}:`}
          </Text> 

          <ProfessionArea refetch={preferenceRefetch} />
            <View style={{...styles.row, flexWrap: 'wrap', marginTop: theme.spacing.md}}>
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

        <View 
          style={{
            ...styles.radioComponent,
            ...styles.sectionContainer,
          }}
        >
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("employment-type")}:`}
          </Text>

          <View style={{...styles.radioItemGroup}}>
            {employmentTypeRadio.map(item => (
              <View key={item.id} style={{...styles.radioButtonGroup}}>
                <CheckBox 
                  checked={selectedEmploymentId?.includes(item.id)}
                  onPress={() =>  {
                    if (selectedEmploymentId?.includes(item.id)) {
                      // Remove if already selected
                      setSelectedEmploymentId(selectedEmploymentId.filter(id => id !== item.id));
                    } else {
                      // Add if not selected
                      setSelectedEmploymentId([...selectedEmploymentId, item.id]);
                    }
                  }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={16}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View 
          style={{
            ...styles.radioComponent,
            ...styles.sectionContainer,
          }}
        >
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("job-type")}:`}
          </Text>

          <View style={{...styles.radioItemGroup}}>
            {jobTypeRadio.map(item => (
              <View key={item.id} style={{...styles.radioButtonGroup}}>
                <CheckBox 
                  checked={selectedJobId?.includes(item.id)}
                  onPress={() => {
                    if(selectedJobId?.includes(item.id)) {
                      setSelectedJobId(selectedJobId.filter(id => id !== item.id));
                    } else {
                      setSelectedJobId([...selectedJobId, item.id]);
                    }
                  }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={16}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            ...styles.radioComponent,
            ...styles.sectionContainer,
          }}
        >
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("work-place-type")}:`}
          </Text>

          <View style={{...styles.radioItemGroup}}>
            {workPlaceTypeRadio.map(item => (
              <View key={item.id} style={{...styles.radioButtonGroup}}>
                <CheckBox 
                  checked={selectedWorkPlaceId?.includes(item.id)}
                  onPress={() => {
                    if (selectedWorkPlaceId?.includes(item.id)) {
                      setSelectedWorkPlaceId(selectedWorkPlaceId.filter(id => id !== item.id));
                    } else {
                      setSelectedWorkPlaceId([...selectedWorkPlaceId, item.id])
                    }
                  }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={16}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        </View> 

        <View style={{
          ...styles.sectionContainer,
        }}>
          
          <Button 
            title={t("submit")}
            onPress={handleSubmit}
            color={'primary'}
            titleColor={theme.colors.white}
            size={'lg'}
          />
        </View>
        
      </View>  
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  col: {
    flexDirection: 'column',
    // gap: theme.spacing?.md
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
  },
  sectionContainer: {
    backgroundColor: theme.mode === "light" ? theme.lightColors?.white : theme.darkColors?.black,        
    padding: Sizes.fixPadding
  }
})