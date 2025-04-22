import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Modal, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { IJob } from '@/types';

interface Props {
  job: IJob[];
}

const Jobsindex = ({ job = [] }: Props) => {
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null); // Håller det valda jobbet
  const [isModalVisible, setModalVisible] = useState(false); // Hanterar dialogens synlighet
  const [isLoading, setIsLoading] = useState(false); // Laddningsstatus
  const [isApplying, setIsApplying] = useState(false); // Status för "Apply"-knappen

  const handlePress = async (jobId: number) => {
    setIsLoading(true);
    setModalVisible(true);

    try {
      console.log('Sending jobId:', jobId);

      const response = await fetch(`https://staffin.clearq.se/api/Job/GetJob-Id?id=${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYW1pYWxhYmRhbGFoQHlhaG9vLmNvbSIsInVzZXJJZCI6IjIwMTA5Iiwicm9sZSI6IlN0YWZmIiwiZXhwIjoxNzQ1MzUyMzM5fQ.x1EBB8vOg4R-oh7O5JIMKYSGfhc_8UcBUr9QuDBS-AEhiBTfDYO6fEAy_pCZY1UytC97oFChH-WTu-aokZVVyQ', // Ersätt med rätt token
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response:', response.status, errorText);
        let errorMessage = 'Kunde inte hämta jobbdetaljer.';
        if (response.status === 404) {
          errorMessage = 'Jobb inte hittat.';
        } else if (response.status === 500) {
          errorMessage = 'Serverfel. Försök igen senare.';
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setSelectedJob(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('API Error:', error.message);
        Alert.alert('Fel', `Kunde inte hämta jobbdetaljer. Error: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        Alert.alert('Fel', 'Ett okänt fel inträffade.');
      }
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async () => {
    if (!selectedJob) return;

    setIsApplying(true);
    try {
      console.log('Applying for jobId:', selectedJob.id);

      const response = await fetch('https://staffin.clearq.se/api/Staff/New-Application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYW1pYWxhYmRhbGFoQHlhaG9vLmNvbSIsInVzZXJJZCI6IjIwMTA5Iiwicm9sZSI6IlN0YWZmIiwiZXhwIjoxNzQ1MzUyMzM5fQ.x1EBB8vOg4R-oh7O5JIMKYSGfhc_8UcBUr9QuDBS-AEhiBTfDYO6fEAy_pCZY1UytC97oFChH-WTu-aokZVVyQ', // Ersätt med rätt token
        },
        body: JSON.stringify({ jobId: selectedJob.id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response:', response.status, errorText);
        let errorMessage = 'Kunde inte skicka ansökan.';
        if (response.status === 400) {
          errorMessage = 'Felaktig förfrågan.';
        } else if (response.status === 500) {
          errorMessage = 'Serverfel. Försök igen senare.';
        }
        throw new Error(errorMessage);
      }

      Alert.alert('Ansökan skickad', 'Din ansökan har skickats framgångsrikt.');
    } catch (error) {
      if (error instanceof Error) {
        console.error('API Error:', error.message);
        Alert.alert('Fel', `Kunde inte skicka ansökan. Error: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        Alert.alert('Fel', 'Ett okänt fel inträffade.');
      }
    } finally {
      setIsApplying(false);
    }
  };

  const closeModal = () => {
    setSelectedJob(null); // Rensar det valda jobbet
    setModalVisible(false); // Dölj dialogen
  };

  return (
    <ScrollView style={{ padding: 14 }}>
      {job?.length > 0 &&
        job.map((item: IJob) => (
          <Card key={item.id} style={{ marginBottom: 15 }}>
            <Card.Content>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.location}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handlePress(item.id)}>View More</Button>
            </Card.Actions>
          </Card>
        ))}

      {/* Dialogrutan */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#6200ee" />
            ) : selectedJob ? (
              <>
                <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                <Text>Beskrivning: {selectedJob.description}</Text>
                <Text>
                  Publicerad: {new Intl.DateTimeFormat('sv-SE', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }).format(new Date(selectedJob.startDate))}
                </Text>
                <Text>
                  Sista ansökningsdag: {new Intl.DateTimeFormat('sv-SE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }).format(new Date(selectedJob.endDate))}
                </Text>
                <Text>Plats: {selectedJob.location}</Text>
                <Text>Lön: {selectedJob.salary}</Text>
                <Button
                  mode="contained"
                  onPress={handleApply}
                  loading={isApplying}
                  disabled={isApplying}
                  style={styles.applyButton}
                >
                  Apply
                </Button>
              </>
            ) : (
              <Text>Ingen data tillgänglig</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Stäng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  applyButton: {
    marginTop: 20,
  },
});

export default Jobsindex;
