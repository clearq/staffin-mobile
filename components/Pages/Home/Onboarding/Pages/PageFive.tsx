import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Sizes, theme } from '@/constants/Theme';
import { CheckBox, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import pageStyle from '@/constants/Styles';
import { useQuery } from '@tanstack/react-query';
import { getUserPreferences, setUserPreferences } from '@/api/backend';

const PageFive = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  const [selectedEmploymentId, setSelectedEmploymentId] = useState<number[]>([])
  const [selectedJobId, setSelectedJobId] = useState<number[]>([])
  const [selectedWorkPlaceId, setSelectedWorkPlaceId] = useState<number[]>([])

  const {data: preference = {}, refetch: preferenceRefetch} = useQuery({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const response = await getUserPreferences()
      //console.log('res', response);
      
      return response
    }
  })

  useEffect(() => {
    if (preference) {
      setSelectedEmploymentId(preference.employmentTypeId ?? []);
      setSelectedJobId(preference.jobTypeId ?? []);
      setSelectedWorkPlaceId(preference.workplaceTypeId ?? []);
    }
  }, [preference])

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

  const handleSubmit = async () => {
    const values = {
      jobTypeIds: selectedJobId,
      employmentTypeIds: selectedEmploymentId,
      workplaceTypeIds: selectedWorkPlaceId
    }
    try {
      return await setUserPreferences(values)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View style={{...styles.col, padding: theme.spacing.md}}>
      <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
        {t("intro-step-five-message")}
      </Text>


      <View style= {{gap: theme.spacing.lg}}>
        <View style={{...styles.radioComponent}}>
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

        <View style={{...styles.radioComponent}}>
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

        <View style={{...styles.radioComponent}}>
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

         <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              ...styles.button,
              backgroundColor: theme.colors.primary,
            }}
          >
            <Text
              style={{
                color: theme.colors.white,
                ...pageStyle.button16,
              }}
            >
              {t("save")}
            </Text>
          </TouchableOpacity>       
      </View>
    </View>
  )
}

export default PageFive

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.xl,
  },
  radioComponent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  button:{
    paddingHorizontal: theme.spacing?.xl,
    paddingVertical: theme.spacing?.md,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
})