import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { theme } from '@/constants/Theme';
import { CheckBox, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import pageStyle from '@/constants/Styles';
import { TextField } from '../UI/Input/TextField';
import { round, values } from 'lodash';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deletePreferredCity, getPreferredCities, getProfessionAreas, getUserById, getUserPreferences, setUserPreferences, updateStaff } from '@/api/backend';
import toast from 'react-native-toast-notifications/lib/typescript/toast';
import { useToast } from 'react-native-toast-notifications';
import { Formik } from 'formik';
import { ICity, IUser } from '@/types';
import Button from '../UI/Button';
import Cities from '../Dropdown/Cities';
import ProfessionArea from '../Dropdown/ProfessionArea';
import { MaterialCommunityIcons } from '@expo/vector-icons';



interface Props {
  onClose: () => void
}

interface pageProps {
  user: IUser
  handleSuccess: () => void
  onClose: () => void 
  goToNext: () => void
  goBack: () => void
}

interface bubbleProps {
  children: React.ReactNode
}

interface buttonProps {
  goToNext: () => void
  goBack: () => void
  onClose: () => void
}

const TalkBubble = ({children}: bubbleProps) => {

  return (
    <View style={{...styles.bubbleContainer}}>
      <View style={{...styles.bubbleSquare, ...pageStyle.cardPrimaryColor}}>
        
        {children}  

      </View>
      <View style={{...styles.bubbleTriangle}} />
    </View>
  )
}


const ButtonGroup = ({goToNext, goBack, onClose}: buttonProps) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <View style={{...pageStyle.buttonGroup}}>

      <Button 
        title={t("back")}
        containerStyle={{...pageStyle.buttonContainer, ...pageStyle.cardShadow}}
        size='sm'
        onPress={goBack}
      />

      <Button 
        title={t("next")}
        containerStyle={{...pageStyle.buttonContainer, ...pageStyle.cardShadow}}
        size='sm'
        color='secondary'
        onPress={goToNext}
      />
    </View>
  )
}

const Introduction = ({onClose}: Props ) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { theme } = useTheme()
  const { t } = useTranslation();
  const { isLoading, authState:{ userData, userId } } = useAuth();
  const pagerRef = useRef<PagerView>(null);

  const { 
    data: user, 
    refetch: userRefetch, 
    isLoading: userIsLoading, 
    isPending,    
  } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response = await getUserById(userId!)      

      return response; 
    },
    enabled: !!userId,
  });

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    pagerRef.current?.setPage(nextPage);
    setCurrentPage(nextPage);
    // console.log('page:', currentPage);
  };

  const goBackPage = () => {
    const previousPage = currentPage - 1;
    pagerRef.current?.setPage(previousPage);
    setCurrentPage(previousPage);
    //console.log('page:', currentPage);
  }

  return (
    <View style={{...styles.centeredView}}>  
      {!userData && isLoading &&
        <ActivityIndicator />
      }

      <PagerView 
        ref={pagerRef}
        initialPage={0} 
        style={{...styles.pageWrapper}}
      >

        <View style={{...styles.page}} key="1">
          <PageOne 
            user={user}
            handleSuccess={userRefetch}
            goToNext={goToNextPage}
            goBack={goBackPage}
            onClose={onClose}
          />
        </View>   
        
        <View style={{...styles.page}} key="2">
          <PageTwo 
            user={user}
            handleSuccess={userRefetch}
            goToNext={goToNextPage}
            goBack={goBackPage}
            onClose={onClose}
          />
        </View>   
        
        <View style={{...styles.page}} key="3">
          <PageThree 
            user={user}
            handleSuccess={userRefetch}
            goToNext={goToNextPage}
            goBack={goBackPage}
            onClose={onClose}
          />
        </View>   
        
        <View style={{...styles.page}} key="4">
          <PageFour 
            user={user}
            handleSuccess={userRefetch}
            goToNext={goToNextPage}
            goBack={goBackPage}
            onClose={onClose}
          />
        </View>   
        
        <View style={{...styles.page}} key="5">
          <PageFive
            user={user}
            handleSuccess={userRefetch}
            goToNext={goToNextPage}
            goBack={goBackPage}
            onClose={onClose}
          />
        </View>   
        
        <View style={{...styles.page}} key="6">
          <PageSix
            user={user}
            handleSuccess={userRefetch}
            goToNext={goToNextPage}
            goBack={goBackPage}
            onClose={onClose}
          />
        </View>   

      </PagerView>   
    </View>
  )
}

export default Introduction

/**
 * Page 1
 * - Intro -
 * @param param0 
 * @returns 
 */
const PageOne = ({user, handleSuccess, onClose, goToNext, goBack}: pageProps) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <View style={{...styles.pageItemContainer}}>

      <TalkBubble 
        children= {
          <View style={{...styles.col}}>
            <View>
              <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
                {t("intro-hello-message")}
              </Text>
              <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
                {t("intro-step-one-message")}
              </Text>
            </View>

            <ButtonGroup 
              goToNext={goToNext}
              goBack={goBack}
              onClose={onClose}
            />
          </View>
        }
      />
      <Image source={require('@/assets/image/onboarding/Jack6.png')} style={{...styles.imageStyle}} />
    </View>
  )
}

/**
 * Page 2
 * - Users name -
 * @param param0 
 * @returns 
 */
const PageTwo = ({user, handleSuccess, onClose, goToNext, goBack}: pageProps) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      return await updateStaff(values);
    },
    onSuccess: () => {
      toast.show(`${t("success-update-message")}`, {
        type: "success",
      });
      handleSuccess()
    },
    onError: () => {
      toast.show(`${t("failed-update-message")}`, {
        type: "error",
      });
    },
  })

  return (
    <View style={{...styles.pageItemContainer}}>

      <TalkBubble 
        children={
          <View style={{...styles.col}}>
            <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
              {t("intro-step-two-message")}
            </Text>

            <Formik
              initialValues={{
                ...user,
                id: user?.id,
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
              }}
              onSubmit={(values: IUser) => {
                const firstName = values.firstName?.trim() || "";
                const lastName = values.lastName?.trim() || "";

                const firstNameChanged = (user?.firstName?.trim() || "") !== firstName;
                const lastNameChanged = (user?.lastName?.trim() || "") !== lastName;

                if (firstNameChanged || lastNameChanged) {
                  mutation.mutate(values);
                } 
                
                goToNext(); 
              
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                <View style={{...styles.col}}>

                  <View style={{...styles.row}}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("first-name")}
                      </Text>
                      <TextField
                        placeholder={user?.firstName ? user?.firstName : t("firstName")}
                        onChangeText={handleChange("firstName")}
                        onBlur={handleBlur("firstName")}
                        value={values.firstName as string}
                        name={"firstName"}
                        type={"text"}
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text 
                        style={{
                          ...pageStyle.inputLabel,
                          color: theme.colors.grey0
                        }}
                      >
                        {t("last-name")}
                      </Text>
                      <TextField
                        placeholder={user?.lastName ? user?.lastName : t("last-name")}
                        onChangeText={handleChange("lastName")}
                        onBlur={handleBlur("lastName")}
                        value={values.lastName as string}
                        name={"lastName"}
                        type={"text"}
                      />
                    </View>

                  </View>
                  
                  <ButtonGroup 
                    goToNext={handleSubmit}
                    goBack={goBack}
                    onClose={onClose}
                  />
                </View>
              )}
            </Formik>

          </View>
        }
      />
      <Image 
        source={require('@/assets/image/onboarding/Jack7.png')} 
        style={{...styles.imageStyle}} 
      />
    </View>
  )
}

/**
 * Page 3
 * - Profession area -
 * @param param0 
 * @returns 
 */
const PageThree = ({user, handleSuccess, onClose, goToNext, goBack}: pageProps) => {
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
    queryFn: getProfessionAreas,
  });

  const preferredProfessionAreas = useMemo(() => {
    if (!preference.professionAreaId || !Array.isArray(allProfessions)) return [];
  
    return allProfessions.filter((area) =>
      preference.professionAreaId.includes(area.id)
    );
  }, [preference, allProfessions]);

  

  return (
    <View style={{...styles.pageItemContainer}}>

      <TalkBubble 
        children={
          <View style={{...styles.col}}>
            <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
              <Text>{t("intro-step-three-message-1")}</Text>
              <Text style={{color: theme.colors.secondary}}>{user?.firstName || "Guest"}</Text>
              <Text>{t("intro-step-three-message-2")}</Text>
            </Text>

            <View>
              <ProfessionArea refetch={preferenceRefetch} />
              <View>
                {preferredProfessionAreas.length > 0 && preferredProfessionAreas.map((item, index: number) => (
                  <View 
                    key={index}
                    style={{
                      flexDirection: 'row',
                      gap: theme.spacing.sm,
                      alignItems: 'center'
                    }}
                  >
                  <Text style={{...pageStyle.inputText, color: theme.colors.grey0}}>
                    {item.name}
                  </Text>

                  </View>
                ))}
              </View> 
            </View>

            <ButtonGroup 
              goToNext={goToNext}
              goBack={goBack}
              onClose={onClose}
            />

          </View>
        }
      />
      <Image 
        style={{...styles.imageStyle}} 
      />
    </View>
  )
}


/**
 * Page 4
 * - Cities -
 * @param param0 
 * @returns 
 */
const PageFour = ({user, handleSuccess, onClose, goToNext, goBack}: pageProps) => {
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
    <View style={{...styles.pageItemContainer}}>

      <TalkBubble 
        children={
          <View style={{...styles.col}}>
            <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
              {t("intro-step-four-message")}
            </Text>

            <View>
              <Cities refetch={cityRefetch} />

              <View>
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

            <ButtonGroup 
              goToNext={goToNext}
              goBack={goBack}
              onClose={onClose}
            />
          </View>
        }
      />
      <Image 
        source={require('@/assets/image/onboarding/Jack7.png')} 
        style={{...styles.imageStyle}} 
      />
    </View>
  )
}


/**
 * Page 5
 * - Types -
 * @param param0 
 * @returns 
 */
const PageFive = ({user, handleSuccess, onClose, goToNext, goBack}: pageProps) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  const [selectedEmploymentId, setSelectedEmploymentId] = useState<number[]>([])
  const [selectedJobId, setSelectedJobId] = useState<number[]>([])
  const [selectedWorkPlaceId, setSelectedWorkPlaceId] = useState<number[]>([])

  const {data: preference = [], refetch: preferenceRefetch} = useQuery({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const response = await getUserPreferences()
      //console.log('res', response);
      
      return response
    }
  })

  useEffect(() => {
    setSelectedEmploymentId(preference.employmentTypeId)
    setSelectedJobId(preference.jobTypeId)
    setSelectedWorkPlaceId(preference.workplaceTypeId)
  }, [])

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
    <View style={{...styles.pageItemContainer}}>

      <TalkBubble 
        children={
          <View style={{...styles.col}}>
            <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
              {t("intro-step-five-message")}
            </Text>


            <View>
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
            </View>

            <ButtonGroup 
              goToNext={() => {
                goToNext()
                handleSubmit()
              }}
              goBack={goBack}
              onClose={onClose}
            />
          </View>
        }
      />
      <Image 
        source={require('@/assets/image/onboarding/Jack8.png')} 
        style={{...styles.imageStyle}} 
      />
    </View>
  )
}

interface bubbleProps {
  children: React.ReactNode
}

/**
 * Page 6
 * - Get started -
 * @param param0 
 * @returns 
 */
const PageSix = ({user, handleSuccess, onClose, goToNext, goBack}: pageProps) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <View style={{...styles.pageItemContainer}}>

      <TalkBubble 
        children={
          <>
            <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
              {t("intro-last-message")}
            </Text>

            <Image 
              source={require('@/assets/image/Tutorial.png')} 
              style={{width: 150, resizeMode: 'contain'}} 
            />

            <Button 
              title={t("get-started")}
              onPress={onClose}
            />

          </>
        }
      />
      <Image 
        source={require('@/assets/image/onboarding/Jack6.png')} 
        style={{...styles.imageStyle}} 
      />

    </View>
  )
}



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageWrapper: {
    width: '100%',
    height: '100%',
  },
  page: {
    flex: 1,
    padding: theme.spacing?.md
  },
  pageItemContainer: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'red'
  },
  imageStyle: {
    position: 'absolute',
    right: 0,
    top: 350,
    bottom: 0,
    height: 350,
    resizeMode: 'contain',
    zIndex: 9999,
    //backgroundColor: "green",
  },
  bubbleContainer: {
    backgroundColor: "transparent",
  },
  bubbleSquare: {
    width: '100%',
    padding: theme.spacing?.lg,
    borderRadius: 10,
  },
  bubbleTriangle: {
    position: "absolute",
    right: "50%",
    bottom: -38,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: "transparent",
    borderTopColor: "rgb(213, 213, 235)",
    transform: [{ rotate: "90deg" }],
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
});