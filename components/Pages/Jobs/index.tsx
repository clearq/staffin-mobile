import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Modal, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { IJob } from '@/types';
import { postNewApplication } from '@/api/backend';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/authContext';

interface Props {
  job: IJob[];
}

const Jobsindex = ({ job = [] }: Props) => {
  const toast = useToast();
  const { t } = useTranslation();
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const {authState: {userData}} = useAuth()

  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || '',
    email: userData?.email || '',
  });

  
  const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

  const handleApply = async () => {
    if (!selectedJob) return;

    try {
      setIsApplying(true);
      const response = await postNewApplication({
        jobId: selectedJob.id,
        ...formData,
      });
      toast.show(`${t('success-update-message')}`, { type: 'success' });
      closeModal();
    } catch (error) {
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
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    });
    setShowForm(false);
  };

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
                <Text>Beskrivning: {selectedJob.description}</Text>
                <Text>Plats: {selectedJob.location}</Text>
                <Text>Lön: {selectedJob.salary}</Text>
                <Button
                  mode="contained"
                  onPress={() => setShowForm(true)}
                  style={styles.applyButton}
                >
                  Apply
                </Button>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            ) : selectedJob && showForm ? (
              <>
                <Text style={styles.modalTitle}>Apply for {selectedJob.title}</Text>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                />
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
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
                <Button
                  mode="contained"
                  onPress={handleApply}
                  loading={isApplying}
                  disabled={!isFormValid || isApplying}
                  style={[styles.applyButton, !isFormValid && styles.disabledButton]}
                >
                  Apply
                </Button>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>No job selected.</Text>
            )}
          </View>
        </View>
      </Modal>
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
