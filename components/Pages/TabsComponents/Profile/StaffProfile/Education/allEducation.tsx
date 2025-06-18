import { View, Text, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import pageStyle from '@/constants/Styles';
import { Card, Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { commonStyles, Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { deleteEducation, getEducation, getExperience } from '@/api/backend';
import dayjs from 'dayjs';
import { useAuth } from '@/contexts/authContext';
import { IEducation, IExperience, IUser } from '@/types/UserTypes';
import { Button } from '@/components/UI/Button';
import EditEducationModal from './editEducationModal';
import AddEducationModal from './addEducationModal';
import HeaderTemplate from '../../../headerTemplate';

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

  const showAlert = () =>
    Alert.alert(`${t("delete")}`, `${t("alert-deletion-confirmation-message")}`, [
      {
        text: `${t("cancel")}`,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: `${t("delete")}`, 
        onPress: () => handleDelete()
      },
    ]
  );

  const handleDelete = async () => {
    try {
      if (!data?.id) {
        console.error("Error: Experience ID is missing");
        return;
      }
      await deleteEducation(data.id)
      onClose()
      handleSuccess()
      
      toast.show(`${t("success-delete-message")}`, {
        type: "success",
      });
    } catch (error) {
      toast.show(`${t("failed-delete-message")}`, {
        type: "error",
      })              
    }
  }
  
  return (
    <HeaderTemplate
      title={`${t("education")}`}
      visible={visible}
      onClose={onClose}
      children={(
        <View style={{flex:1 }}>
          {/* Education Edit Form */}
          {data && data.length !== 0 && data
            .sort((a:any, b:any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            .map((edu:IEducation,) => (
              <Card key={edu.id}>
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
                      {edu.fieldOfStudy}
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
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: theme.spacing.sm
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            ...styles.itemEditButton,
                            borderColor:theme.mode === 'light' ? theme.colors.grey3 : theme.colors.white
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

                        <TouchableOpacity
                          style={{
                            ...styles.itemEditButton,
                            borderColor:theme.colors.error
                          }}
                          onPress={showAlert} 
                        >
                          <MaterialCommunityIcons 
                            name='delete-outline' 
                            size={24} 
                            color={ theme.colors.error}
                          />
                        </TouchableOpacity>
                      </View>
                    }
                  </View>
    
                </View> 
                
              </Card>
            ))
          }

          {/* Footer */}
          <View
            style={{...styles.footerContainer}}
          >
            <Button
              title={`${t("add")} ${t("education")}`}
              onPress={() => {
                setOpenAddModal(true)
              }} 
              size={'lg'}
              type={'outline'}
              color={'primary'}
              titleColor={theme.colors.primary}
              iconRight={'playlist-plus'}
              hasIconRight={true}
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
        </View>
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
    borderWidth:2
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing?.md,
    gap: theme.spacing?.md,
    margin: Sizes.fixPadding
  },
  buttonStyle:{
    borderRadius: 100,
    padding: Sizes.fixPadding,
    borderWidth:2
  }
})