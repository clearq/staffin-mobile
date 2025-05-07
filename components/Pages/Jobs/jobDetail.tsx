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
      
interface props {
    isModalVisible: boolean;
    closeModal: () => void;
    selectedJob?:IJob;
    showForm: boolean;
    setShowForm: () => void
    formData: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    }>>;
    isApplying: boolean;
    isFormValid: boolean;
    handleApply: () => void;
    appliedJobs: Map<number, boolean>;
}
      
const JobDetail = ({isModalVisible, closeModal, selectedJob, showForm, setShowForm, appliedJobs, formData, setFormData, handleApply, isApplying, isFormValid,   }: props) => {
    const toast = useToast();
    const { t } = useTranslation();

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
                <Text>Beskrivning: {selectedJob.description}</Text>
                <Text>Plats: {selectedJob.location}</Text>
                <Text>Lön: {selectedJob.salary}</Text>
                <Button
                  mode="contained"
                  onPress={setShowForm}
                  disabled={appliedJobs.has(selectedJob.id)}
                  style={[styles.applyButton, appliedJobs.has(selectedJob.id) && styles.disabledButton]}
                >
                  {appliedJobs.has(selectedJob.id) ? 'Already Applied' : 'Apply'}
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
    )
}
export default JobDetail  

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
})
      
      
      