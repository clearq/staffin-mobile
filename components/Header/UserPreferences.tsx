import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput} from 'react-native'
import React, { useMemo, useState } from 'react'

import { Fonts, Sizes, theme } from '@/constants/Theme'
import { Avatar, CheckBox, Divider, ListItem, useTheme } from '@rneui/themed'


import { ProfileAvatar } from '../UI/ProfileAvatar';
import { ICity, IUser } from '@/types';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { deletePreferredCity, getPreferenceOptions, getPreferredCities, getUserPreferences } from '@/api/backend';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import Cities from '../Dropdown/Cities';
import ProfessionArea from '../Dropdown/ProfessionArea';


interface props {
  visible: boolean
  onClose: () => void
  user: IUser
  refetch: () => void
}

const UserPreferences = ({visible, onClose, user, refetch}: props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const toast = useToast();

  const [openModal, setOpenModal] = useState(false)
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
      const response = await getPreferredCities()
      // console.log(response);
      
      return response
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

  // const {data: options, refetch: optionsRefetch} = useQuery({
  //   queryKey: ["options"],
  //   queryFn: async () => {
  //     const response = await getPreferenceOptions()

  //     return response
  //   }
  // }) 

  const handleDeletePreferredCity = async (id: number) => {
    try {
      await deletePreferredCity(id)
      cityRefetch()

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Modal
      visible={visible}
      transparent={true}
    >
      <View
        style={{
          ...styles.dropdownContainer,
          ...pageStyle.cardPrimaryColor,
          ...pageStyle.cardShadow,
          gap: theme.spacing.sm
        }}
      >

        <TouchableOpacity
            style={{
            ...styles.closeButton,
          }}
          onPress={onClose}
        >
          <MaterialCommunityIcons name='close' size={20} color={theme.colors.grey0}/>
        </TouchableOpacity>


        <View style={{...styles.userInfoContainer}}>
          <ProfileAvatar 
            user={user}
            size={40}
            handleUpdate={refetch}
          />

          <Text style={{...pageStyle.headline02, color: theme.colors.grey0,}}>
            {user.firstName ? (<Text>{user.firstName} </Text>) : (<Text>Firstname </Text>)}
            {user.lastName ? (<Text>{user.lastName}</Text>) : (<Text>Lastname</Text>)}
          </Text>

          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <MaterialCommunityIcons name='pencil' size={20} color={theme.colors.primary} />
          </TouchableOpacity>

        </View>

        <Divider style={{marginVertical: theme.spacing.xs}} />
        <View>
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
           {`${t("area")}:`}
          </Text>

          <Cities 
            refetch={cityRefetch}
          />

          <View>
            {cities.length && cities.map((city: ICity) => (
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

        <View style={{...styles.radioComponent}}>
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("job-type")}:`}
          </Text>

          <View style={{...styles.radioItemGroup}}>
            {jobTypeRadio.map(item => (
              <View key={item.id} style={{...styles.radioButtonGroup}}>
                <CheckBox 
                  checked={selectedJobId === item.id}
                  onPress={() => 
                    selectedJobId === item.id
                    ? setSelectedJobId(0)
                    : setSelectedJobId(item.id)
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

        <View style={{...styles.radioComponent}}>
          <Text style={{...pageStyle.inputLabel, color: theme.colors.grey0}}>
            {`${t("work-place-type")}:`}
          </Text>

          <View style={{...styles.radioItemGroup}}>
            {workPlaceTypeRadio.map(item => (
              <View key={item.id} style={{...styles.radioButtonGroup}}>
                <CheckBox 
                  checked={selectedWorkPlaceId === item.id}
                  onPress={() => 
                    selectedWorkPlaceId === item.id
                    ? setSelectedWorkPlaceId(0)
                    : setSelectedWorkPlaceId(item.id)
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
    </Modal>
  )
}

export default UserPreferences

const styles = StyleSheet.create({
  dropdownContainer: {
    marginHorizontal: theme.spacing?.md,
    padding: theme.spacing?.md,
    borderRadius: theme.spacing?.md,
    borderTopRightRadius: 0,
    position: 'relative',
    bottom: -60,
  },
  userInfoContainer: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing?.sm,
    right: theme.spacing?.sm,
    alignItems: 'center',
    justifyContent: 'center',
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