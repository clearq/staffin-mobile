import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/contexts/authContext';
import { Avatar, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import pageStyle from '@/constants/Styles';
import { theme } from '@/constants/Theme';
import PerofileIndex from '@/components/Pages/TabsComponents/StaffProfile';
import { Colors } from '@/constants/Colors';
import { getUserById, getUserPostsAndShares } from '@/api/backend';



const Page = () => {
  
  const { theme } = useTheme()
    const { t } = useTranslation();
    const router = useRouter()

    const { 
      authState:{ 
        userData, 
        userId,
      } 
    } = useAuth();

    // Get User Info
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

    // Get Users Posts
    const {
      data: userPosts,
      refetch: userPostsRefetch,
      isLoading: postIsLoading,
    } = useQuery({
      queryKey: ["user-posts"],
      queryFn: async () => {
        const response = await getUserPostsAndShares(userId!)
        
        return response;
      },
      enabled: !!userId,
    })


    
    // console.log('user', user);
    
  return (
    <View
      style={{
        backgroundColor: theme.colors.background
      }}
    >
      { isPending && userIsLoading && postIsLoading &&(
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      { user && !userIsLoading && !postIsLoading &&
        <ScrollView>       

          {/* profile */}
          <PerofileIndex
            user={user} 
            showEditButton={ user.id === userId }
            post={userPosts}
            refetch = {() => userRefetch()}
          />
        </ScrollView>
      }

    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
  },
});