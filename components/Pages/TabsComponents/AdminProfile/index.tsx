import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import { useAuth } from '@/contexts/authContext'
import { useQuery } from '@tanstack/react-query'
import { getCompanyById, getCompanyProfileUserId } from '@/api/backend'
import AdminUserProfile from './AdminUserProfile'
import { IUser } from '@/types/UserTypes'
import { IPost } from '@/types/PostTypes'
import CompanyProfile from './CompanyProfile'
import { getUserById } from '@/api/backend'
import pageStyle from '@/constants/Styles'
import { Sizes, theme } from '@/constants/Theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface props {
  user: IUser;
  showEditButton: boolean;
  post: IPost[];
  refetch : () => void
}

const AdminProfileIndex = ({user, showEditButton, post, refetch}: props) => {
  const [userInfoMessage, setUserInfoMessage] = useState(false)
  const [pending, setPending] = useState(false)
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const [userType, setUserType] = useState<"company" | "owner">("owner")

  const { 
    authState:{ 
      userData, 
      userId,
    } ,
  } = useAuth();


  const { data: company } = useQuery({
    queryKey: ["company-data"],
    queryFn: async () => {
      if (userData && userData.companyId) {
        //const companyId = await getCompanyProfileUserId(user.companyId)

        const response = await getCompanyById(userData.companyId)
        
        return response
      }
      console.error("Doesn't have a company id");
      setUserType("owner")      
    }
  })

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => {
            userType === "company" ? setUserType("owner") : setUserType("company")
          }}
          style={{
            ...styles.switch,
            backgroundColor: theme.colors.primary,
          }}
        >
          <MaterialCommunityIcons name='account-switch' color={theme.colors.white} size={20} />
          <Text 
            style={{
              ...pageStyle.smText,
              color: theme.colors.white,
              textAlign: 'center'
            }}
          >
            
            {userType === "owner" 
              ? <Text>Company Profile</Text> 
              : <Text>Admin Profile</Text>
            }
          </Text>
        </TouchableOpacity>
      </View>
      {userType === "owner" &&
        <AdminUserProfile
          user={user}
          showEditButton={showEditButton}
          post={post}
          refetch={refetch}
        />
      }
      {userType === "company" &&
        <CompanyProfile
          company = {company}
          showEditButton={showEditButton}
          post={post}
          refetch={refetch}
        />
      }
    </View>
  )
}

export default AdminProfileIndex

const styles = StyleSheet.create({
  switch: {
    position: 'absolute',
    top: Sizes.fixPadding,
    right:Sizes.fixPadding,
    zIndex: 99999,
    padding: theme.spacing?.sm,
    borderRadius: 100,
    width: 72,
    height:72,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
})