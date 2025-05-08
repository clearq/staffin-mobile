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
import { theme } from '@/constants/Theme';
import { useTheme } from '@rneui/themed';
import pageStyle from '@/constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface Props {
  job: IJob[];
  refetch: () => void
}

const Jobsindex = ({ job, refetch }: Props) => {
  const toast = useToast();
  const { t } = useTranslation();
  const { theme } = useTheme()
  
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);


  const handlePress = (item: IJob) => {
    setSelectedJob(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalVisible(false);
  };

  return (
    <ScrollView style={{ padding: theme.spacing?.md }}>
      {job?.length > 0 &&
        job.map((item) => (
          <Card 
            key={item.id} 
            style={{ 
              backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black,
              marginBottom: theme.spacing?.md 
            }}
          >
            <Card.Content style={{gap: theme.spacing.md}}>
              <Text 
                style={{...pageStyle.headline02, color: theme.colors.grey0}}
              >
                {item.title}
              </Text>

              <Text
                style={{color: theme.colors.grey0}}
              >
                {item.description}
              </Text>
              
              <View style={{flexDirection: 'row', gap: theme.spacing.xs}}>
                <MaterialCommunityIcons 
                  name='map-marker' 
                  size={20} 
                  color={theme.mode === "light" ? theme.colors.grey3 : theme.colors.white } 
                />
                <Text style={{color: theme.colors.grey0,}}>{item.location}</Text>
              </View>
            </Card.Content>

            <Card.Actions>
              <TouchableOpacity 
                style={{
                  ...pageStyle.buttonBorder,
                  borderColor: theme.colors.primary,
                  borderRadius: 100,
                  paddingHorizontal: theme.spacing.xl,
                  paddingVertical: theme.spacing.sm,
                }}
                onPress={() => handlePress(item)}
              >
                <Text style={{...pageStyle.button16, color: theme.colors.primary}}>
                  {t("see-more")}
                </Text>
              </TouchableOpacity>
            </Card.Actions>

          </Card>
        ))}


        <JobDetail 
          isModalVisible={isModalVisible}
          closeModal={() => closeModal()}
          selectedJob={selectedJob!} 
          refetch={refetch}        
        />
                 
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


