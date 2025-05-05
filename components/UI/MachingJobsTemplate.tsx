import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import pageStyle from '@/constants/Styles'
import { IMatchingJob } from '@/types/JobTypes'
import { useQuery } from '@tanstack/react-query'
import { getCompanyById } from '@/api/backend'
import { ICompany } from '@/types'

interface props {
  job: IMatchingJob
}

const MachingJobsTemplate = ({job,}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  const {data:company} = useQuery({
    queryKey: ["company", job.companyId],
    queryFn: async () => {
      return await getCompanyById(job.companyId)
    },

    enabled: !!job.companyId
  })
  

  return (
    <View
      style={{
        ...styles.cardContainer,
        ...pageStyle.cardShadow,
        backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black
      }}
    >

      <View
        style={{...styles.textGroup}}
      >
        <Text 
          style={{
            ...pageStyle.headline03, 
            color: theme.colors.grey0,
            flexWrap: 'wrap'
          }}>
            {job.jobTitle}
        </Text>

        <Text style={{...pageStyle.xsText, color: theme.colors.grey0}}>
          {company?.companyName ? company?.companyName : ""}
        </Text>
        
        <Text 
          style={{...pageStyle.xsText, color: theme.colors.grey0}}
          ellipsizeMode='clip'
          numberOfLines={2}
        >
          {job.jobDescription}
        </Text>
        
        
      </View>

      <View style={{flexDirection: 'column', gap: theme.spacing.sm, marginTop: theme.spacing.sm}}>
        <Text 
          style={{
            ...pageStyle.headline03, 
            color: theme.colors.secondary,
          }}  
        >
          {`${t("match-score")} : ${job.matchScore} / 100`}
        </Text> 

        <TouchableOpacity
          style={{...styles.smButton, backgroundColor: theme.colors.secondary}}
        >
          <Text style={{...pageStyle.button16, color: theme.colors.white}}>
            {t("apply")}
          </Text>
        </TouchableOpacity>
      </View>

      
    </View>
  )
}

export default MachingJobsTemplate

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
    padding: theme.spacing?.md,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 150,
    borderRadius: 10,
    marginLeft: theme.spacing?.md,
  },
  textGroup : {
    flexDirection: 'column',
    gap: theme.spacing?.sm
  },
  smButton: {
    paddingVertical: theme.spacing?.xs,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})