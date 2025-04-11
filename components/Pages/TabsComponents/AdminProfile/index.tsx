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
  const [userType, setUserType] = useState<"company" | "admin">("admin")

  const { 
    authState:{ 
      userData, 
      userId,
    } ,
  } = useAuth();
  const companyId = userData?.companyId

  const { data: company, refetch: companyRefetch, isLoading: companyIsLoading } = useQuery({
    queryKey: ["company-data"],
    queryFn: async () => {
      if (userData && companyId) {
        //const companyId = await getCompanyProfileUserId(user.companyId)

        const response = await getCompanyById(companyId)
        
        return response
      }
      console.error("Doesn't have a company id");
      setUserType("admin")      
    }
  })

  // 🚧 fetch Branches and Job announce 🚧

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => {
            userType === "company" ? setUserType("admin") : setUserType("company")
          }}
          style={{
            ...styles.switch,
            backgroundColor: theme.colors.primary,
          }}
        >

          <Text 
            style={{
              ...pageStyle.smText,
              color: theme.colors.white,
              textAlign: 'center'
            }}
          >
            
            {userType === "admin" 
              ? <Text>Admin</Text> 
              : <Text>Company</Text>
            }
          </Text>

          <MaterialCommunityIcons name='account-switch-outline' color={theme.colors.white} size={20} />
          <Text 
            style={{
              ...pageStyle.smText,
              color: theme.colors.white,
              textAlign: 'center'
            }}
          >
            
            {userType === "admin" 
              ? <Text>Company</Text> 
              : <Text>Admin</Text>
            }
          </Text>
        </TouchableOpacity>
      </View>
      {userType === "admin" &&
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
          refetch={companyRefetch}
          companyId={companyId!}
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
    paddingVertical: theme.spacing?.sm,
    paddingHorizontal: theme.spacing?.md,
    gap: theme.spacing?.sm,
    height:40,
    borderRadius: 20,
    flexDirection:'row',
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