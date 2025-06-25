import React from 'react';
import { ScrollView, Text, StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { IJob } from '@/types';

interface props {
  isModalVisible: boolean;
  closeModal: () => void;
  selectedJob:IJob;
}

const MyApplicationDetail = ({
  isModalVisible,
  closeModal,
  selectedJob,

}: props) => {

                return (
                  <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}
                  >
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContent}>
                        {selectedJob ? (
                          <>
                            <Text style={styles.modalTitle}>{selectedJob.title}</Text>

                        
                            <ScrollView style={styles.descriptionScrollView}>
                              <Text>Beskrivning: {selectedJob.description}</Text>
                            </ScrollView>
                        

                            <Text>Plats: {selectedJob.location}</Text>
                            <Text>Lön: {selectedJob.salary}</Text>
                          
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
})

export default MyApplicationDetail;