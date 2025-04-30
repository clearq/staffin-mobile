import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { useAuth } from '@/contexts/authContext';
import { useQuery } from '@tanstack/react-query';
import { getMyApplications } from '@/api/backend';
import { IJob } from '@/types';
import { yearMonthDate } from '@/utils/dateFormat';
import { theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';

export interface IApplication {
  applicationDate: Date; 
  applicationStatus: "Pending" | "Accepted" | "Rejected"; 
  id: number; 
  job: IJob | null;
  jobId: number;
  jobTitle: string; 
  matchingPercentage: number;
  userId: number;
}

const ApplicationIndex = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const { isLoading, authState:{ userData, userId } } = useAuth();

  const {data:applications = [], isLoading: applicationIsLoading, refetch:applicationsRefetch } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const response = await getMyApplications()
      // console.log(response);

      return response
    }
  })

  const statusColor = (status: "Pending" | "Accepted" | "Rejected") => {
    switch (status) {
      case "Pending":
        return theme.colors.warning;
      case "Accepted":
        return theme.colors.success;
      case "Rejected":
        return theme.colors.error;
      default:
        return "gray"; // fallback color
    }
  };

  return (
    <View style={{padding: theme.spacing.md}}>
      <View
        style={{
          ...styles.col,
        }}
      >
        {applications.length > 0 && applications.map((application: IApplication) => 
          <View
            key={application.id}
            style= {{
              ...styles.itemContainer,}}
          >
            <View
              style={{...styles.row}}
            >
              <Text>{application.jobTitle}</Text>
              
              <View
                style={{
                  ...styles.statusContainer, 
                  borderColor: statusColor(application.applicationStatus),
                }}
              >
                <Text
                  style={
                    {color: statusColor(application.applicationStatus),
                    paddingHorizontal: theme.spacing.md
                  }}

                >
                  {application.applicationStatus}
                </Text>
              </View>

            </View>
            
            <Text>{application.matchingPercentage}</Text>
            <Text>{yearMonthDate(application.applicationDate)}</Text>

          </View>
        )}

      </View>
    </View>
  )
}

export default ApplicationIndex

const styles = StyleSheet.create({
  col: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  itemContainer: {
    
    ...pageStyle.cardShadow,
    padding: theme.spacing?.md,
  },
  statusContainer: {
    borderWidth: 1,
    borderRadius: theme.spacing?.sm,
  }
})