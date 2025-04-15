import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllJobsAdmin } from '@/api/backend'
import { IJob } from '@/types'
import pageStyle from '@/constants/Styles'
import { Sizes, theme } from '@/constants/Theme'
import Button from '@/components/UI/Button'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@rneui/themed'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { words } from 'lodash'
import { color } from '@rneui/themed/dist/config'


const JobAnnounce = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const menu = ['open', 'assigned', 'closed', 'all']
  const [focused, setFocused] = useState('all')

  const {data = [], isLoading, refetch }  = useQuery({
    queryKey: ["job-list-admin"],
    queryFn: async () => {
      const response = await getAllJobsAdmin()
  
      return response
    }
  })

  const status = [
    {
      id: 1,
      value: 'all',
      title: t("all"),
    },
    {
      id: 2,
      value: 'open',
      title: t("open"),
    },
    {
      id: 3,
      value: 'assigned',
      title: t("assigned"),
    },
    {
      id: 4,
      value: 'closed',
      title: t("closed"),
    },
  ]

  const RenderList = useCallback(() =>  {
    if (!data.length) {
      return (
        <Text>You don't have any annouce yet</Text>
      )  
    }
    return (
      <>
      {data.map((item:IJob) => {
        <View key={item.id}>
          <Text>{item.jobType}</Text>
          <Text>{item.jobType}</Text>
          <Text>{item.status}</Text>
        </View>
      })}
      </>
    )

  }, [status])


  return (
    <View>
      <View
        style={{
          padding: Sizes.fixPadding,
          flexDirection: 'row',
          justifyContent:'flex-end'
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderRadius:100,
            borderColor: theme.colors.primary,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal:theme.spacing.xl,
            flexDirection: 'row',
            gap: theme.spacing.md,
          }}
        >
          <Text
            style={{
              ...pageStyle.button16,
              color: theme.colors.grey0,
            }}
          >
            {`${t("create-job-announce")}`}
          </Text>
          <MaterialCommunityIcons name='playlist-plus' size={20} color={theme.colors.grey0} />
        </TouchableOpacity>               
      </View>

      {/* Menu */}
      <View 
        style={{
          flexDirection: 'row', 
          justifyContent: 'space-around',
          padding: Sizes.fixPadding,
        }
      }>
        {status.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setFocused(item.value)}
          >
            <Text
              style={{
                color: focused 
                  ? theme.colors.grey0
                  : theme.colors.disabled 
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <View
        style={{
          padding: Sizes.fixPadding,
        }}
      >
        <RenderList />
      </View>
    </View>
  )
}

export default JobAnnounce

const styles = StyleSheet.create({

})