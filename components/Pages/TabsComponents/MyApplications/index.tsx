import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { Card } from 'react-native-paper';
import { useAuth } from '@/contexts/authContext';
import { useQuery } from '@tanstack/react-query';
import { getMyApplications } from '@/api/backend';
import { IJob } from '@/types';
import { yearMonthDate } from '@/utils/dateFormat';
import pageStyle from '@/constants/Styles';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export interface IApplication {
  applicationDate: Date;
  applicationStatus: 'Pending' | 'Accepted' | 'Rejected';
  id: number;
  job: IJob | null;
  jobId: number;
  jobTitle: string;
  matchingPercentage: number;
  userId: number;
}

const ApplicationIndex = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const toast = useToast();
  const { isLoading, authState: { userData, userId } } = useAuth();

  const { data: applications = [], isLoading: applicationIsLoading, refetch: applicationsRefetch } = useQuery({
    queryKey: ['my-applications'],
    queryFn: async () => {
      const response = await getMyApplications();
      return response;
    },
  });

  const statusColor = (status: 'Pending' | 'Accepted' | 'Rejected') => {
    switch (status) {
      case 'Pending':
        return theme.colors.warning;
      case 'Accepted':
        return theme.colors.success;
      case 'Rejected':
        return theme.colors.error;
      default:
        return 'gray';
    }
  };

  return (
    <ScrollView style={{ padding: theme.spacing.md}}>
      <View style={{...styles.col,}}>
        {applications.length > 0 && applications.map((application: IApplication) => 
          <Card
            key={application.id}
            style={{
              ...styles.itemContainer,
              padding: theme.spacing?.md,
            }}
          >
            <Card.Content style={{ gap: theme.spacing?.md}}>
              <View style={styles.row}>
                <Text>{application.jobTitle}</Text>
                <View
                  style={{
                    ...styles.statusContainer,
                    borderColor: statusColor(application.applicationStatus),
                  }}
                >
                  <Text
                    style={{
                      color: statusColor(application.applicationStatus),
                      paddingHorizontal: theme.spacing?.md,
                    }}
                  >
                    {application.applicationStatus}
                  </Text>
                </View>
              </View>
              <Text>{application.matchingPercentage}% Match</Text>
              <Text>Application Date: {yearMonthDate(application.applicationDate)}</Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};

export default ApplicationIndex;

const styles = StyleSheet.create({
  col: {
    flexDirection: 'column',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    ...pageStyle.cardShadow,
    marginBottom: 10,
  },
  statusContainer: {
    borderWidth: 1,
    borderRadius: 5,
  },
});
