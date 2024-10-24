import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';
import CustomButton from '@/components/CustomButton'
import { globalStyles } from '@/constants/GlobalStyle';

const AdminPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className={`flex justify-center ${globalStyles.container}`}>       

          <Text className="text-2xl font-semibold text-d mt-10 font-psemibold">
            Sign up as Admin
          </Text>

          <CustomButton 
            onPress={() => router.push("/(tabs)/home")}
            title="Confirm"
          />

                 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AdminPage