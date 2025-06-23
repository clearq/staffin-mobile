import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card, Button } from 'react-native-paper';
import { useAuth } from '@/contexts/authContext';
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyApplications, deleteStaffApplication } from '@/api/backend';
import { IJob } from '@/types';
import { yearMonthDate } from '@/utils/dateFormat';
import pageStyle from '@/constants/Styles';
import { grey500 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

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

  const [selectedStatus, setSelectedStatus] = useState<'Pending' | 'Accepted' | 'Rejected' | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: applications = [], isLoading: applicationIsLoading, refetch: applicationsRefetch } = useQuery({
    queryKey: ['my-applications'],
    queryFn: async () => {
      const response = await getMyApplications();
      return response;
    },
  });

 const deleteMutation = useMutation<void, Error, number>({
  mutationFn: async (applicationId: number) => {
    await deleteStaffApplication(applicationId);
  },
  onSuccess: () => {
    toast.show(t('Application deleted successfully'), { type: 'success' });
    applicationsRefetch(); // Uppdatera listan efter radering
  },
  onError: () => {
    toast.show(t('Failed to delete application'), { type: 'danger' });
  },
});


const handleDelete = (id: number) => {
  deleteMutation.mutate(id);
};


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

  const filteredApplications = selectedStatus
    ? applications.filter((app: IApplication) => app.applicationStatus === selectedStatus)
    : applications;

  return (
    <ScrollView style={{ padding: theme.spacing.md }}>
      {/* Filter button */}
      <View style={styles.filterIconContainer}>
        <TouchableOpacity onPress={() => setIsFilterOpen(!isFilterOpen)}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Filter options */}
      {isFilterOpen && (
        <View style={styles.filterContainer}>
          {['Pending', 'Accepted', 'Rejected'].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => {
                setSelectedStatus(selectedStatus === status ? null : status as 'Pending' | 'Accepted' | 'Rejected');
                setIsFilterOpen(false); 
              }}
              style={{
                ...styles.filterButton,
                backgroundColor: selectedStatus === status ? statusColor(status as 'Pending' | 'Accepted' | 'Rejected') : 'lightgray',
              }}
            >
              <Text style={styles.filterText}>{t(status)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Application list */}
      <View style={styles.col}>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application: IApplication) => (
            <Card
              key={application.id}
              style={{
                ...styles.itemContainer,
                padding: theme.spacing?.md,
              }}
            >
              <Card.Content style={{ gap: theme.spacing?.md }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flexShrink: 1, marginRight: theme.spacing.md }}>
                  <Text>{application.jobTitle}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(application.id)}>
                      <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="delete-outline" size={26} color="white" />
                      </View>
                  </TouchableOpacity>

                </View>
                <Text>{application.matchingPercentage}% Match</Text>
                <Text>{t('applied')}: {yearMonthDate(application.applicationDate)}</Text>

                <View
                  style={{
                    ...styles.statusContainer,
                    borderColor: statusColor(application.applicationStatus),
                  }}
                >
                  <Text
                    style={{
                      color: statusColor(application.applicationStatus), padding: 4,textAlign: 'center', fontSize: 15,
                      // paddingHorizontal: theme.spacing?.xl, 
                    }}
                  >
                    {application.applicationStatus}
                  </Text>
                </View>
                

              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.noApplicationsText}>{t('No applications found')}</Text>
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
  filterIconContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  noApplicationsText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },

  iconContainer: {
  backgroundColor: 'rgb(255, 0, 0)',
  borderColor: 'darkgray',
  borderWidth: 2,
  borderRadius: 10,
  padding: 5,
  },

});
