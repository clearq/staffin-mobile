
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import *as ImagePicker from 'expo-image-picker'
import { useToast } from "react-native-toast-notifications";
import { getItem, setItem } from '@/utils/asyncStorage';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'expo-router';

import { fetchImageFromCDN, getImageUrl } from '@/utils/CDN-action';

import { IExperience, IUser } from '@/types/UserTypes'
import { IPost } from '@/types/PostTypes'
import { Avatar, Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import pageStyle from '@/constants/Styles';

import { autoLoginToCDN, deleteStaffSkill, updateUserProfileImage, uploadContentFile } from '@/api/backend';

import InfoModal from './Edit/infoModal';
import AboutModal from './Edit/aboutModal';
import Information from './Information';
import About from './about';
import Activity from './activity';
import Experience from './Experience/experience';
import Education from './Education/education';
import AllExperience from './Experience/allExperience';
import AllEducation from './Education/allEducation';
import AddExperienceModal from './Experience/addExperience';
import AddEducationModal from './Education/addEducationModal';
import AddSkillModal from './Edit/addSkillModal';
import AddLanguageModal from './Languages/addLanguageModal';
import EditLanguageModal from './Languages/editLanguageModal';
import ProfileHeader from '../../ProfileHeader';
import ProfileItemContainer from '../../ProfileListContainer';
import EmptyItemMessage from '../../EmptyItemMessage';
import CreatePostModal from '../../Activity/CreatePostModal';


interface props {
  user: IUser;
  showEditButton: boolean;
  post: IPost[];
  refetch : () => void
}


const StaffProfileIndex = ({user, showEditButton, post, refetch}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()
  const { authState, setAuthState } = useAuth()
  

  const [openEditInfoDialog, setOpenEditInfoDialog] = useState<boolean>(false)
  const [openEditAboutDialog, setOpenEditAboutDialog] = useState<boolean>(false)
  
  const [openCreateActivityDialog, setOpenCreateActivityDialog] = useState<boolean>(false)

  const [openAddExperienceDialog, setOpenAddExperienceDialog] = useState<boolean>(false)
  const [openAllExperienceDialog, setOpenAllExperienceDialog] = useState<boolean>(false)

  const [openAddEducationDialog, setOpenAddEducationDialog] = useState<boolean>(false)
  const [openAllEducationDialog, setOpenAllEducationDialog] = useState<boolean>(false)

  const [openAddSkillsDialog, setOpenAddSkillsDialog] = useState<boolean>(false)

  const [openEditLanguageDialog, setOpenEditLanguageDialog] = useState<boolean>(false)
  const [openAddLanguageDialog, setOpenAddLanguageDialog] = useState<boolean>(false)


  const showAlert = (id:any) =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: `${t("cancel")}`,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: `${t("delete")}`, 
        onPress: () => handleSkillDelete(id)
      }, 
    ]
  );

  const handleSkillDelete = async (id:any) => {
    try {
      if(!id) {
        console.error("id is missing")
        return;
      }
      await deleteStaffSkill(id)
      refetch()

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
    <View
      style={{
        flexDirection:'column',
        gap: theme.spacing.md,
      }}
    >
      {/* header */}
      <ProfileHeader 
        user={user}
        showEditButton={showEditButton}
        refetch={refetch}
      />
      

      {/* Main */}
      <ProfileItemContainer
        title={t("information")}
        children={<Information user={user} showEditButton={showEditButton} />}
        showFooter={false}
        showEditButton={showEditButton}
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenEditInfoDialog(!openEditInfoDialog)}
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
      />

      <ProfileItemContainer
        title={t("about")}
        children={<About user={user} showEditButton={showEditButton}/>}
        showFooter={false}
        showEditButton={showEditButton}
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenEditAboutDialog(true)}
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
      />

      <ProfileItemContainer
        title={t("activity")}
        children={<Activity post={post} />}
        showFooter={post.length > 0}
        showEditButton={showEditButton}
        btnChildren={
          <TouchableOpacity
            style={{
              borderRadius: theme.spacing.sm,
              borderColor: theme.colors.primary,
              borderWidth: 2,
              padding: theme.spacing.sm,
            }}
            onPress={() => setOpenCreateActivityDialog(true)}
          >
            <Text
              style={{
                ...pageStyle.button16,
                color: theme.colors.primary
              }}
            >
              {`${t("create-post")}`}
            </Text>
          </TouchableOpacity>
        }
        footerChildren={
          <>
            {post.length
              ? (
                <TouchableOpacity
                  onPress={() => {
                    router.push("/activity")
                  }}
                >
                  <Text
                    style={{
                      ...pageStyle.button16,
                      color: theme.colors.grey0
                    }}
                  >
                    {`${t("see-all-posts")}`}
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )
            }            
          </>
        }
      />

      <ProfileItemContainer
        title={t("experience")}
        children={
          <Experience 
            user={user} 
            showEditButton={showEditButton} 
            handleSuccess={() => refetch()}
          />
        }
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenAddExperienceDialog(true)}
          >
            <MaterialCommunityIcons 
              name='plus' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
        showFooter={user.experience!.length > 0 }
        showEditButton={showEditButton}
        footerChildren={
          <>
            {user?.experience?.length 
              ? (
                <TouchableOpacity
                  onPress={() => setOpenAllExperienceDialog(true)}
                >
                  <Text
                    style={{
                      ...pageStyle.button16,
                      color: theme.colors.grey0
                    }}
                  >
                    {`${t("see-more")}`}
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )
            }            
          </>
        }
      />  

      <ProfileItemContainer
        title={t("education")}
        children={
          <Education 
            user={user} 
            showEditButton={showEditButton}
            refetch= {refetch} 
          />
        }
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenAddEducationDialog(true)}
          >
            <MaterialCommunityIcons 
              name='plus' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
        showFooter={user.educations!.length > 0}
        showEditButton={showEditButton}
        footerChildren={
          <>
            {user?.experience?.length 
              ? (
                <TouchableOpacity
                  onPress={() => setOpenAllEducationDialog(true)}
                >
                  <Text
                    style={{
                      ...pageStyle.button16,
                      color: theme.colors.grey0
                    }}
                  >
                    {`${t("see-more")}`}
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )
            }            
          </>
          
        }
      /> 

      <ProfileItemContainer
        title={t("skills")}
        children={
          <View  
            style={{
              flexDirection:'row', 
              flexWrap:'wrap', 
              gap: theme.spacing.sm
            }}
          >
            {user?.skills && user.skills.map(skill => (
              <View 
                key={skill.id} 
                style={{
                  padding:theme.spacing.sm, 
                  backgroundColor: theme.colors.primary, 
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems:'center',
                  gap: theme.spacing.sm
                }}
              >
                <Text 
                  style={{
                    ...pageStyle.button16,
                    color: theme.colors.white,
                  }}
                >
                  {skill.name}
                </Text>

                {showEditButton && 
                  <TouchableOpacity
                    onPress={() => showAlert(skill.id)}
                  >
                    <MaterialCommunityIcons name='close-circle' color={theme.colors.white} size={18} />
                  </TouchableOpacity>
                }
              </View>
            ))}
            {!user?.skills?.length && (
              <EmptyItemMessage 
                onPress={() => setOpenAddSkillsDialog(true)}
                message={`${t("add-skill")}`}
              />
            )}
          </View>
        }
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenAddSkillsDialog(true)}
          >
            <MaterialCommunityIcons 
              name='plus' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
        showFooter={false}
        showEditButton={showEditButton}
      /> 

      <ProfileItemContainer
        title={t("languages")}
        children={
          <View
            style={{
              flexDirection: 'column',
              gap: theme.spacing.sm
            }}
          >
            {user?.languages && user.languages.length > 0 ? (
              user.languages
                .slice()  // Create a shallow copy of the array
                .sort((a, b) => b.rating - a.rating)  // Sort the copied array
                .map((lang) => (
                  <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text
                      style={{
                        ...pageStyle.button16,
                        color: theme.colors.grey0,
                      }}
                    >
                      {lang.name}
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                      {[...Array(5)].map((_, index) => (
                        <MaterialCommunityIcons
                          key={index}
                          name={index < lang.rating ? 'star' : 'star-outline'}
                          size={24}
                          color={index < lang.rating ? 'orange': theme.colors.grey3}
                        />
                      ))}
                    </View>
                  </View>
                ))
              ) : (
                <EmptyItemMessage 
                  onPress={() => setOpenAddLanguageDialog(true)}
                  message={`${t("add-language")}`}
                />
            )}
            
          </View>
        }
        btnChildren={
          <>
            <TouchableOpacity
              style={{
                ...styles.itemEditButton,
                backgroundColor: theme.colors.background
              }}
              onPress={() => setOpenAddLanguageDialog(true)}
            >
              <MaterialCommunityIcons 
                name='plus' 
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
                backgroundColor: theme.colors.background
              }}
              onPress={() => setOpenEditLanguageDialog(true)} 
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
          </>
        }
        showFooter={false}
        showEditButton={showEditButton}
      /> 

      {/* Dialog */}
      <InfoModal 
        visible={openEditInfoDialog}
        user={user}
        onClose={() => setOpenEditInfoDialog(!openEditInfoDialog)}
        handleSuccess={() => refetch()}
      />
      <AboutModal
        visible={openEditAboutDialog}
        user={user}
        onClose={() => setOpenEditAboutDialog(!openEditAboutDialog)}
        handleSuccess = {() => refetch()}
      />
      <CreatePostModal 
        visible={openCreateActivityDialog}
        onClose={() => setOpenCreateActivityDialog(!openCreateActivityDialog)}
      />
      <AllExperience 
        visible={openAllExperienceDialog}
        id={user.id!}
        onClose={() => setOpenAllExperienceDialog(!openAllExperienceDialog)}
        handleSuccess={() => refetch()}
      />
      <AddExperienceModal 
        visible={openAddExperienceDialog}
        id={user.id}
        onClose={() => setOpenAddExperienceDialog(!openAddExperienceDialog)}
        handleSuccess={() => refetch()}
      />
      <AddEducationModal 
        visible={openAddEducationDialog}
        id={user.id}
        onClose={() => setOpenAddEducationDialog(!openAddEducationDialog)}
        handleSuccess={() => refetch()}
      />
      <AllEducation 
        visible={openAllEducationDialog}
        id={user.id}
        onClose={() => setOpenAllEducationDialog(!openAllEducationDialog)}
        handleSuccess={() => refetch()}
      />  
      <AddSkillModal
        visible={openAddSkillsDialog}
        id={user.id}
        onClose={() => setOpenAddSkillsDialog(!openAddSkillsDialog)}
        handleSuccess={() => refetch()}
      />
      <AddLanguageModal
        visible={openAddLanguageDialog}
        id={user.id}
        onClose={() => setOpenAddLanguageDialog(!openAddLanguageDialog)}
        handleSuccess={() => refetch()}
      />
      <EditLanguageModal
        visible={openEditLanguageDialog}
        id={user.id}
        onClose={() => setOpenEditLanguageDialog(!openEditLanguageDialog)}
        handleSuccess={() => refetch()}
        data= {user.languages}
      />
    </View>
  )
}

export default StaffProfileIndex

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 150,
    position: 'relative'
  },
  avatarContainer: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    width: 92,
    height: 92,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTextContainer: {
    position:'absolute',
    bottom: 0,
    width: '100%',
    height: 64,
  },
  headerText: {
    left: 128,
  },
  imageEditButton: {
    borderRadius: 100,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    bottom: 4,
  },
  
  itemEditButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
