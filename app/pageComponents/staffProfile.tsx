import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchUser } from '@/store/slice/userSlice';
import { useAppDispatch } from '@/store/reduxHooks';

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from 'dayjs';


const StaffProfile = () => {
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError } = useSelector((state: RootState) => state.user);
  const authData = useSelector((state: RootState) => state.auth); 
 
  
  useEffect(() => {
    if (authData.userData?.id) {
      dispatch(fetchUser(authData.userData.id));
    }
  }, [authData.userData]);
  
  return (
    <>
      <Text>Staff Profile</Text> 
      {userData && 
        <>
          <View>
            <View className='bg-slate-200 w-[70px] h-[70px] rounded-full flex justify-center items-center'>
              <MaterialCommunityIcons name="account" size={36} color="gray" />
            </View>
          </View>

          <Text>Firstname: {userData?.firstName}</Text>
          <Text>Lastname: {userData?.lastName}</Text>
          <Text>Title: {userData?.title}</Text>
          <Text>Phone no. {userData.phoneNumber}</Text>
          <Text>Street: {userData.street}</Text>
          <Text>PostalCode: {userData.postalCode}</Text>
          <Text>City: {userData.city}</Text>
          <Text>About: {userData.about}</Text>

          <Text>Educations: </Text>
          <View>
          {userData.educations.map(education => 
            <View key={education.id}>
              <Text>Institution: {education.institution}</Text>
              <Text>Name:{education.name}</Text>
              <Text>Date: {dayjs(education.startDate).format('YYYY-MM-DD')} - {dayjs(education.endDate).format('YYYY-MM-DD')}</Text>
            </View>
          )}
          </View>

          <Text>Skills: </Text>
          <View className='flex flex-row flex-wrap gap-2'>
          {userData.skills.map(skill => 
            <View key={skill.id} className='bg-slate-200 p-1'>
              <Text>{skill.name}</Text>
            </View>
          )}
          </View>

          <Text>Languages: </Text>
          {userData.languages.map((language => 
            <View key={language.id}>
              <Text>{language.name} {language.rating}</Text>
            </View>
          ))}
          <Text>Experience: </Text>
          {userData.experience.map(exp => 
            <View key={exp.id}>
              <Text>{exp.companyName}</Text>
              <Text>{exp.location}</Text>
              <Text>{exp.position}</Text>
              <Text>{exp.description}</Text>
              <Text>{dayjs(exp.startDate).format('YYYY-MM-DD')} - {dayjs(exp.endDate).format('YYYY-MM-DD')}</Text>
            </View>
          )}

          {/* Activity */}
          <View>
            <Text>Activity</Text>
            <View>
              <Text>Fetch the newest post </Text>
            </View>

            <View className='flex flex-row items-center'>
              <Text className='align-middle'>Show All posts </Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="black" />             
            </View>
          </View>

        </>
      }
    </>
  )
}

export default StaffProfile