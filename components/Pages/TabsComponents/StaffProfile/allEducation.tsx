import { View, Text, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import pageStyle from '@/constants/Styles';
import { Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { commonStyles, Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { getEducation, getExperience } from '@/api/backend';
import dayjs from 'dayjs';
import { useAuth } from '@/contexts/authContext';
import { IEducation, IExperience, IUser } from '@/types/UserTypes';
import Button from '@/components/UI/Button';
import EditEducationModal from './Education/editEducationModal';
import HeaderTemplate from '../headerTemplate';
import AddEducationModal from './Education/addEducationModal';

interface props {
  visible: boolean;
  id: any;
  onClose: () => void
  handleSuccess: () => void
}

const AllEducation = ({visible, id, onClose, handleSuccess}: props) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [eduData, setEduData] = useState<IEducation>()

  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const { 
    authState:{ 
      userData, 
      userId,
    } 
  } = useAuth();


  const  { data, refetch } = useQuery({
    queryKey: ["education-data"],
    queryFn: async () => {
      const response = await getEducation();

      return response;
    },
  })

  
  return (
    <HeaderTemplate
      title={`${t("education")}`}
      visible={visible}
      onClose={onClose}
      children={(
        <>
          {/* Education Edit Form */}
          {data && data.length !== 0 && data
            .sort((a:any, b:any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            .map((edu:IEducation,) => (
              <View key={edu.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: theme.spacing.md,
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
                      {edu.institution}        
                    </Text>
    
                    <Text 
                      style={{
                        ...pageStyle.smText,
                        color: theme.colors.grey0,
                      }}
                    >
                      {edu.name}
                    </Text>
    
                    <Text 
                      style={{
                        ...pageStyle.smText,
                        color: theme.colors.grey3,
                      }}
                    >
                      {dayjs(edu.startDate).format('YYYY-MM-DD')} - {edu.endDate ? dayjs(edu.endDate).format('YYYY-MM-DD') : 'Ongoing'}
                    </Text>
                  </View>
    
                  <View>
                    { id === userId &&
                      <TouchableOpacity
                        style={{
                          ...styles.itemEditButton,
                          backgroundColor: theme.colors.background
                        }}
                        onPress={() => {
                          setEduData(edu)
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
      
                <Divider color={theme.colors.greyOutline} />
                
              </View>
            ))
          }

          {/* Footer */}
          <View
            style={{...styles.footerContainer}}
          >
            <Button
              containerStyle={{width:'100%'}}
              buttonStyle={{...styles.buttonStyle, }}
              title={`${t("add")} ${t("education")}`}
              titleStyle={{...pageStyle.button20, color: theme.colors.primary}}
              iconPosition='right'
              icon={
                <MaterialCommunityIcons 
                  name='playlist-plus' 
                  color={theme.colors.primary} 
                  size={24}
                  style={{paddingLeft:24}}
                />
              }
              size='sm'
              onPress={() => {
                setOpenAddModal(true)
              }} 
              type='clear'
            />
          </View>

          {/* Modal */}
          <EditEducationModal
            data={eduData!}
            visible={openEditModal}
            onClose={() => {
              setOpenEditModal(!openEditModal)
              refetch()
            }}
            handleSuccess={() => {
              handleSuccess()
              refetch()
            }}
          />
          <AddEducationModal 
            visible={openAddModal}
            id={userId}
            onClose={() => {
              setOpenAddModal(!openAddModal)
              refetch()
            }}
            handleSuccess={() => {
              handleSuccess()
              refetch()
            }}
          />
        </>
      )}
    />           

  )
}

export default AllEducation

const styles = StyleSheet.create({
  itemEditButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  footerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing?.md,
    gap: theme.spacing?.md,
  },
  buttonStyle:{
    borderRadius: 100,
    padding: Sizes.fixPadding,
    borderWidth:2
  }
})