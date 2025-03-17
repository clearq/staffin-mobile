import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

import { Fonts, theme } from '@/constants/Theme';
import { Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs'

import { IExperience, IUser } from '@/types/UserTypes';
import EditExperienceModal from './Experience/editExperienceModal';
import pageStyle from '@/constants/Styles';


interface props {
  user: IUser;
  showEditButton: boolean;
  handleSuccess: () => void
}

const Experience = ({user, showEditButton, handleSuccess}: props) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [expData, setExpData] = useState<IExperience>()
  
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()

  return (
    <View 
      style={{
        ...styles.postsContainer
      }}
    >
      {user?.experience && user?.experience
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .slice(0, 2)
        .map((exp, index, array) => (
          <View key={exp.id}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <View
                style={{
                  flex: 2
                }}
              >
                <Text 
                  style={{
                    ...pageStyle.headline03,
                    color: theme.colors.grey0,
                  }}
                >
                  {exp.position}                 
                </Text>

                <Text 
                  style={{
                    ...pageStyle.smText,
                    color: theme.colors.grey0,
                  }}
                >
                  {exp.companyName}
                </Text>

                <Text 
                  style={{
                    ...pageStyle.smText,
                    color: theme.colors.grey3,
                  }}
                >
                  {dayjs(exp.startDate).format('YYYY-MM-DD')} - {exp.endDate ? dayjs(exp.endDate).format('YYYY-MM-DD') : `${t("ongoing")}`}
                </Text>
                
                <Text style={{
                  ...pageStyle.smText,
                  color: theme.colors.grey0,
                }}
                >
                  {exp.location}
                </Text>

                <Text 
                  ellipsizeMode='clip'
                  numberOfLines={2}
                  style={{
                    ...pageStyle.smText,
                    color: theme.colors.grey0,
                  }}
                >
                  {exp.description}
                </Text>
              </View>
              
              <View>
                { showEditButton &&
                  <TouchableOpacity
                    style={{
                      ...styles.itemEditButton,
                      backgroundColor: theme.colors.background
                    }}
                    onPress={() => {
                      setExpData(exp)
                      setOpenEditModal(true)
                    }} 
                  >
                    <MaterialCommunityIcons 
                      name='pencil' 
                      size={24} 
                      color={ theme.mode === 'light'
                        ? theme.colors.grey3
                        : theme.colors.white
                      }
                    />
                  </TouchableOpacity>
                }
              </View>
           
            </View>

            {index < array.length - 1 && 
              <Divider color={theme.colors.greyOutline} />
            }

          </View>
        ))
      }
      {/* Modal */}
      <EditExperienceModal
        data={expData!}
        visible={openEditModal}
        onClose={() => setOpenEditModal(!openEditModal)}
        handleSuccess={handleSuccess} 
      />
    </View>
  )
}

export default Experience

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  postItemContainer: {
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  itemEditButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  }
})