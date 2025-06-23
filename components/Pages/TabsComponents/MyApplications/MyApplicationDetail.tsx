import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { IJob, IMyJobApplication } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { postNewApplication, updateStaff, getMyApplications, } from '@/api/backend';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/authContext';
import axios from 'axios';
import { useTheme } from '@rneui/themed';
import pageStyle from '@/constants/Styles';

type Application = {
  applicationDate: string;
  applicationStatus: string;
  id: number;
  jobId: number;
  jobTitle: string;
  matchingPercentage: number;
  userId: number;
};

interface props {
  isModalVisible: boolean;
  closeModal: () => void;
  selectedJob:IJob;
  refetch: () => void
}

const MyApplicationDetail = ({
  isModalVisible,
  closeModal,
  selectedJob,
  refetch
}: props) => {
  const toast = useToast();
  const { theme } = useTheme()
  const { t } = useTranslation();
  const { authState: { userData } } = useAuth();

  const [isApplying, setIsApplying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || '',
    email: userData?.email || '',
    
  });

  const [content, setContent] = useState('')

  const isFormValid = Object.values(formData).every((value) => value.trim() !== '');


    useEffect(() => {
    setContent('');
  }, [selectedJob]);



  const { data: applications = [], isLoading: applicationIsLoading, refetch: applicationsRefetch } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const response = await getMyApplications();
      return response;
    }
  });

  const handleApply = async (id: number) => {
    if (!selectedJob) {
      console.error('No selected job');
      return;
    }
      
    try {
      setIsApplying(true);

      const payload = { jobId: id, content };
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

      


  console.log(updatedData)
      if(
        userData?.firstName !== formData.firstName ||
        userData.lastName !== formData.lastName ||
        userData.phoneNumber !== formData.phoneNumber ||
        userData.email !== formData.email
      ){
        await updateStaff(updatedData);
      }

      toast.show(`${t('success-update-message')}`, { type: 'success' });

      closeModal();
      refetch()
      applicationsRefetch()

    } catch (error: any) {
      console.error('Error during application:', error.response?.data || error.message || error);
      toast.show(`${t('failed-update-message')}`, { type: 'error' });
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    if (applications && applications.length > 0) {
      const jobIds = applications
        .filter((app: Application) => app.jobId != null) // Ensure jobId exists
        .map((app: Application) => app.jobId);

      setAppliedJobs(jobIds);
    }
  },[applications, userData])



  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {selectedJob && !showForm ? (
            <>
              <Text style={styles.modalTitle}>{selectedJob.title}</Text>

           
              <ScrollView style={styles.descriptionScrollView}>
                <Text>Beskrivning: {selectedJob.description}</Text>
              </ScrollView>
           

              <Text>Plats: {selectedJob.location}</Text>
              <Text>Lön: {selectedJob.salary}</Text>
              <Button
                mode="contained"
                onPress={() => setShowForm(!showForm)}
                disabled={appliedJobs.includes(selectedJob.id)}
                style={[
                  styles.applyButton,
                  appliedJobs.includes(selectedJob.id) && styles.disabledButton
                ]}
              >
                {appliedJobs.includes(selectedJob.id) ? 'Already Applied' : 'Apply'}
              </Button>

              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          ) : selectedJob && showForm ? (
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.modalTitle}>Apply for {selectedJob.title}</Text>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Förnamn"
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              />
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Efternamn"
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              />
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Telefonnummer"
                keyboardType="numeric"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
              <Text style={styles.label}>Övrigt</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Skriv övrigt här..."
                multiline={true}
                numberOfLines={4}
                value={content}
                onChangeText={(text) => setContent(text)}
              />


              <Button
                mode="contained"
                onPress={()=> handleApply(selectedJob.id)}
                loading={isApplying}
                disabled={appliedJobs.includes(selectedJob.id) || !isFormValid}
                style={[
                  styles.applyButton,
                  appliedJobs.includes(selectedJob.id) && styles.disabledButton
                ]}
              >
                {appliedJobs.includes(selectedJob.id) ? 'Already Applied' : 'Apply'}
              </Button>

              {!isFormValid &&
                <Text style={{...pageStyle.xsText, color: theme.colors.error}}>
                  {t("enter-form-message")}
                </Text>
              }

              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <Text>No job selected.</Text>
          )}
        </View>
      </View>
    </Modal>
  )
}
export default MyApplicationDetail

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
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionScrollView: {
    maxHeight: 200,
    marginBottom: 10, 
    paddingRight: 5, 
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

  textArea: {
  height: Math.max(80),
  textAlignVertical: 'top',
},
})