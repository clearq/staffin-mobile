import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@rneui/themed'
import VerifyForm from '@/components/Pages/AuthPages/VerifyForm'
import pageStyle from '@/constants/Styles'

const AdminRegister = () => {
  const { role, email, password, companyName, organisationNumber, token, id } = useLocalSearchParams<{
    role: 'staff' | 'admin';
    email: string;
    password: string;
    companyName: string;
    organisationNumber: string;
    token?: string;
    id: string;
  }>();
  const { theme } = useTheme()

  return (
    <View
      style={{
        ...pageStyle.pageComponent, 
        backgroundColor: theme.colors.background
      }}
    >
      <VerifyForm 
        role={role}
        authInfo={{
          email: email,
          password: password,
          companyName: companyName,
          organisationNumber: organisationNumber,
          acceptedPolicy: true,
          token: token,
          id: Number(id)
        }}
      />
    </View>
  )
}

export default AdminRegister

const styles = StyleSheet.create({})