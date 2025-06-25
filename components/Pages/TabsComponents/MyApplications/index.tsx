import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-paper';
import { useAuth } from '@/contexts/authContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyApplications, deleteStaffApplication, getJobById } from '@/api/backend';
import { IJob } from '@/types';
import { yearMonthDate } from '@/utils/dateFormat';
import pageStyle from '@/constants/Styles';
import { useNavigation } from '@react-navigation/native';
import MyApplicationDetail from './MyApplicationDetail';



export interface IApplication {
  applicationDate: Date;
  applicationStatus: 'Behandlas' | 'Accepterade' | 'Avslagna';
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
  const navigation = useNavigation();
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'Behandlas' | 'Accepterade' | 'Avslagna' | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  const applicationStatusOptions = [
    {
      id: 1,
      label: t("pending"),
      value: 'Behandlas',
    },
    {
      id: 2,
      label: t("accepted"),
      value: 'Accepterade',
    },
    {
      id: 3,
      label: t("rejected"),
      value: 'Avslagna',
    }
  ] as const;

  
  const getTranslatedStatusLabel = (statusValue: 'Behandlas' | 'Accepterade' | 'Avslagna'): string => {
    const option = applicationStatusOptions.find(opt => opt.value === statusValue);
    return option ? option.label : statusValue;
  };

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
      applicationsRefetch();
    },
    onError: () => {
      toast.show(t('Failed to delete application'), { type: 'danger' });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const statusColor = (status: 'Behandlas' | 'Accepterade' | 'Avslagna') => {
    switch (status) {
      case 'Behandlas':
        return theme.colors.warning;
      case 'Accepterade':
        return theme.colors.success;
      case 'Avslagna':
        return theme.colors.error;
      default:
        return 'gray';
    }
  };

  const filteredApplications = selectedStatus
    ? applications.filter((app: IApplication) => app.applicationStatus === selectedStatus)
    : applications;

  const handlePress = async (item: IApplication) => {
    try {
      const res = await getJobById(item.jobId)
      setSelectedJob(res);
      setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={{ padding: theme.spacing.md }}>
   
      <View style={styles.filterIconContainer}>
        <TouchableOpacity onPress={() => setIsFilterOpen(!isFilterOpen)}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
        </TouchableOpacity>
      </View>


      {isFilterOpen && (
        <View style={styles.filterContainer}>
          {applicationStatusOptions.map((option) => (
            <TouchableOpacity
              key={option.id} 
              onPress={() => {
               
                setSelectedStatus(selectedStatus === option.value ? null : (option.value as 'Behandlas' | 'Accepterade' | 'Avslagna'));
                setIsFilterOpen(false); 
              }}
              style={{
                ...styles.filterButton,
                
                backgroundColor: selectedStatus === option.value ? statusColor(option.value as 'Behandlas' | 'Accepterade' | 'Avslagna') : 'lightgray',
              }}
            >
              <Text style={styles.filterText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

    
      <View style={styles.col}>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application: IApplication) => (
            <TouchableOpacity
              key={application.id}
              onPress={() => handlePress(application)}
              activeOpacity={0.7}
            >
              <Card
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
                        color: statusColor(application.applicationStatus), padding: 4, textAlign: 'center', fontSize: 15,
                      }}
                    >
                      {getTranslatedStatusLabel(application.applicationStatus)}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noApplicationsText}>{t('No applications found')}</Text>
        )}
        <MyApplicationDetail
          isModalVisible={isModalVisible}
          closeModal={() => setModalVisible(!isModalVisible)}
          selectedJob={selectedJob!}
       
        />
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
