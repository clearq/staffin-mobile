import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Button, Image, ActivityIndicator, ScrollView, Modal } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import *as ImagePicker from 'expo-image-picker'
import { useToast } from "react-native-toast-notifications";
import { getItem, setItem } from '@/utils/asyncStorage';
import { useQuery } from '@tanstack/react-query'


import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '@/store/slice/userSlice';
import { RootState, store } from '@/store/store';
import { fetchImageFromCDN, getImageUrl } from '@/utils/CDN-action';
import { useAuth } from '@/contexts/authContext';

import { IExperience, IUser } from '@/types/UserTypes'
import { IPost } from '@/types/PostTypes'
import { Avatar, Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import pageStyle from '@/constants/Styles';
import { CDN_TOKEN, CDN_USERNAME } from '@/constants/key';

import { autoLoginToCDN, deleteStaffSkill, updateUserProfileImage, uploadContentFile } from '@/api/backend';
import { IJob } from '@/types/JobTypes';


interface props {
  job: IJob[]
}


const Jobsindex = ({job}:props) => {
  const { theme } = useTheme()

  const handlePress = (item: IJob) => {
    Alert.alert("Jobbdetaljer", `Du klickade på ${item.title}`);
  }

  function handleSubmit(): void {
    throw new Error('Function not implemented.');
  }

  function t(arg0: string) {
    throw new Error('Function not implemented.');
  }

    return (

      <View
      style={{
        backgroundColor: theme.colors.background,
        width: "100%",
        flexDirection: "column",
        gap: 90,
        marginVertical: 8,
        height: 100,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
        borderStyle: 'solid',
        }} 
        >
          
          {job.length && job.map((item:IJob) => (
         
            <View key={item.id}>

              <Text >{item.title}</Text>
              <Text >{item.description}</Text>
              <Text >{item.location}</Text>

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: 'blue',
                  borderRadius: 5,
                  alignItems: 'center',
                }}
                onPress={() => handlePress(item)}
              > 
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Visa Mer</Text>
              </TouchableOpacity>
             
             
            
              

            </View>
 
      )
     
    )}
 
    </View>
   
  )
  
  

}
export default Jobsindex
