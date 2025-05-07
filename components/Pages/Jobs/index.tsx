import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { IJob } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { postNewApplication, updateStaff, getMyApplications } from '@/api/backend';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/authContext';
import axios from 'axios';
import JobDetail from './jobDetail';

// Log all Axios requests and responses
axios.interceptors.request.use((config) => {
  console.log('Axios Request:', config);
  return config;
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error Response:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

interface Props {
  job: IJob[];
  refetch: () => void
}

const Jobsindex = ({ job, refetch }: Props) => {
  const toast = useToast();
  const { t } = useTranslation();
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { authState: { userData } } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState(new Map());
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || '',
    email: userData?.email || '',
  });

  const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

  // useEffect(() => {
  //   const loadAppliedJobs = async () => {
  //     try {
  //       const response: number[] = await ();
  //       setAppliedJobs(new Set<number>(response));
  //     } catch (error) {
  //       toast.show(`${t('failed-load-applied-jobs')}`, { type: 'error' });
  //     }
  //   };

  //   loadAppliedJobs();
  // }, []);

  const { data: applications = [], isLoading: applicationIsLoading, refetch: applicationsRefetch } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const response = await getMyApplications();
  
      // if (response.length > 0) {
      //   const newMap = new Map();
      //   response.forEach((item:any) => {
      //     newMap.set(item.jobId, true);
      //   });
      //   setAppliedJobs(newMap);
      // }
  
      return response;
    }
  });

  const handleApply = async () => {
    if (!selectedJob) {
      console.error('No selected job');
      return;
    }

    try {
      setIsApplying(true);

      const payload = { jobId: selectedJob.id };
      console.log('Payload for postNewApplication:', JSON.stringify(payload, null, 2));

      const response = await postNewApplication(payload);
      console.log('postNewApplication Response:', response);

      const updatedData = {
        ...userData,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
      };
      // console.log('Updating staff with data:', JSON.stringify(updatedData, null, 2));

      await updateStaff(updatedData);

      toast.show(`${t('success-update-message')}`, { type: 'success' });
      //setAppliedJobs((prev) => new Set(prev).add(selectedJob.id));
      closeModal();
      applicationsRefetch()
      refetch()
    } catch (error: any) {
      console.error('Error during application:', error.response?.data || error.message || error);
      toast.show(`${t('failed-update-message')}`, { type: 'error' });
    } finally {
      setIsApplying(false);
    }
  };

  const handlePress = (item: IJob) => {
    setSelectedJob(item);
    setModalVisible(true);
    setShowForm(false);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalVisible(false);
    setFormData({
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      phoneNumber: userData?.phoneNumber || '',
      email: userData?.email || '',
    });
    setShowForm(false);
  };

  useEffect(() => {
    console.log('apply job');
    if (applications.length > 0) {
      const newMap = new Map();
      applications.forEach((item:any) => {
        newMap.set(item.jobId, true);
      });
      setAppliedJobs(newMap);
    }
    
  },[applications])

  return (
    <ScrollView style={{ padding: 14 }}>
      {job?.length > 0 &&
        job.map((item) => (
          <Card key={item.id} style={{ marginBottom: 15 }}>
            <Card.Content>
              <Text style={styles.modalTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.location}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handlePress(item)}>View More</Button>
            </Card.Actions>
          </Card>
        ))}

        {selectedJob !== null &&
          <JobDetail 
            isModalVisible={isModalVisible}
            closeModal={() => closeModal()}
            selectedJob={selectedJob}
            showForm={showForm}
            setShowForm={() => setShowForm(!showForm)}
            appliedJobs={appliedJobs}
            formData={formData}
            setFormData={setFormData}
            isApplying={isApplying}
            isFormValid={isFormValid}
            handleApply={handleApply}
            
          />
        }
         
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  applyButton: {
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
});

export default Jobsindex;


