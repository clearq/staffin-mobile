import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@rneui/themed';
import JobDetail from './jobDetail';
import { jobbToFavorite, deleteFavoriteJob, getFavoriteJobs, getMatchingJobs } from '@/api/backend';
import pageStyle from '@/constants/Styles';
import { IJob } from '@/types';

interface Props {
  job: IJob[];
  refetch: () => void;
}

const Jobsindex = ({ job, refetch }: Props) => {
  const toast = useToast();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [favoriteJobs, setFavoriteJobs] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'favorite' | 'match'>('all');
  const [jobTypeFilter, setJobTypeFilter] = useState<number | null>(null);
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState<number | null>(null);
  const [isJobTypeFilterVisible, setJobTypeFilterVisible] = useState(false);
  const [isEmploymentTypeFilterVisible, setEmploymentTypeFilterVisible] = useState(false);
  const [workplaceTypeFilter, setWorkplaceTypeFilter] = useState<number | null>(null); // New state for workplaceTypes
  const [isWorkplaceTypeFilterVisible, setWorkplaceTypeFilterVisible] = useState(false);


  const { data: favoriteJobId, isLoading, isError, refetch: favoriteJobRefetch } = useQuery({
    queryKey: ['favoriteJobs'],
    queryFn: async () => {
      const response = await getFavoriteJobs();
      return response.map((job: { jobId: number }) => job.jobId);
    },
  });

  const { data: matchingJobs, refetch: matchingJobRefetch } = useQuery({
    queryKey: ['matchingJobs'],
    queryFn: async () => {
      const response = await getMatchingJobs();
      return response;
    },
  });

  useEffect(() => {
    if (favoriteJobId) {
      setFavoriteJobs(favoriteJobId);
    }
  }, [favoriteJobId]);

  const toggleFavorite = async (jobId: number) => {
    try {
      if (favoriteJobs.includes(jobId)) {
        await deleteFavoriteJob(jobId);
        setFavoriteJobs(favoriteJobs.filter((id) => id !== jobId));
        toast.show(t('Job removed from favorites'), { type: 'success' });
      } else {
        await jobbToFavorite(jobId);
        setFavoriteJobs([...favoriteJobs, jobId]);
        toast.show(t('Job added to favorites'), { type: 'success' });
      }
      favoriteJobRefetch();
      matchingJobRefetch();
      refetch();
    } catch (error) {
      toast.show(t('Error updating favorites'), { type: 'danger' });
    }
  };

  const handlePress = (item: IJob) => {
    setSelectedJob(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalVisible(false);
  };

    const clearFilters = () => {

    setJobTypeFilter(null);

    setEmploymentTypeFilter(null);

    setWorkplaceTypeFilter(null);

  };

  const filteredJobs = job
    .filter((item) => {
      if (filter === 'favorite') {
        return favoriteJobs.includes(item.id);
      } else if (filter === 'match') {
        return matchingJobs?.some((match: IJob) => match.id === item.id);
      }
      return true;
    })
    .filter((item) => {
      if (jobTypeFilter !== null) {
        return item.jobTypeId === jobTypeFilter;
      }
      return true;
    })
    .filter((item) => {
      if (employmentTypeFilter !== null) {
        return item.employmentTypeId === employmentTypeFilter; // Assuming item has employmentTypeId
      }
      return true;
    })
    .filter((item) => {

      if (workplaceTypeFilter !== null) {

        return item.workplaceTypeId === workplaceTypeFilter; // Assuming item has workplaceTypeId

      }

      return true;

    });

  if (isLoading) {
    return <Text>{t('Loading...')}</Text>;
  }

  if (isError) {
    return <Text>{t('Error loading jobs')}</Text>;
  }

  return (
    <ScrollView style={{ padding: theme.spacing?.md }}>
      {/* Filter Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.md }}>
        <TouchableOpacity onPress={() => setFilter('all')}>
          <Text
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: filter === 'all' ? theme.colors.primary : theme.colors.grey4,
              color: filter === 'all' ? theme.colors.white : theme.colors.black,
            }}
          >
            {t('All')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('favorite')}>
          <Text
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: filter === 'favorite' ? theme.colors.primary : theme.colors.grey4,
              color: filter === 'favorite' ? theme.colors.white : theme.colors.black,
            }}
          >
            {t('Favorites')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('match')}>
          <Text
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: filter === 'match' ? theme.colors.primary : theme.colors.grey4,
              color: filter === 'match' ? theme.colors.white : theme.colors.black,
            }}
          >
            {t('Match')}
          </Text>
        </TouchableOpacity>
      </View>
      

    <View style={styles.filterSectionContainer}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{t('Filtrera resultat')}</Text>
      <TouchableOpacity onPress={clearFilters}>
        <Text style={{ padding: 6, borderRadius: 8, backgroundColor: theme.colors.primary, color: theme.colors.white }}>
          {t('Rensa Filter')} 
        </Text>
      </TouchableOpacity>
    </View>

       
      
          <TouchableOpacity
        onPress={() => setJobTypeFilterVisible(!isJobTypeFilterVisible)}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}
      >
        <MaterialCommunityIcons
          name={isJobTypeFilterVisible ? 'chevron-down' : 'chevron-right'}
          size={24}
          color={theme.colors.black}
        />
        <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>{t('Job Type')}</Text>
      </TouchableOpacity>
      {isJobTypeFilterVisible && (
        // Ändrad: Använd flexWrap och justera justifyContent för att hantera rader
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: theme.spacing.md, gap: theme.spacing.sm }}>
          <TouchableOpacity onPress={() => setJobTypeFilter(jobTypeFilter === 1 ? null : 1)} style={styles.jobTypeButton}>
            <Text
              style={{
                ...styles.jobTypeButtonText,
                backgroundColor: jobTypeFilter === 1 ? theme.colors.primary : theme.colors.grey4,
                color: jobTypeFilter === 1 ? theme.colors.white : theme.colors.black,
              }}
            >
              {t('Akutbemanning')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setJobTypeFilter(jobTypeFilter === 2 ? null : 2)} style={styles.jobTypeButton}>
            <Text
              style={{
                ...styles.jobTypeButtonText,
                backgroundColor: jobTypeFilter === 2 ? theme.colors.primary : theme.colors.grey4,
                color: jobTypeFilter === 2 ? theme.colors.white : theme.colors.black,
              }}
            >
              {t('Förhandsbemanning')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setJobTypeFilter(jobTypeFilter === 3 ? null : 3)} style={styles.jobTypeButton}>
            <Text
              style={{
                ...styles.jobTypeButtonText,
                backgroundColor: jobTypeFilter === 3 ? theme.colors.primary : theme.colors.grey4,
                color: jobTypeFilter === 3 ? theme.colors.white : theme.colors.black,
              }}
            >
              {t('Ospecifierat')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Employment Type Filter */}
      <TouchableOpacity
        onPress={() => setEmploymentTypeFilterVisible(!isEmploymentTypeFilterVisible)} // Koppla till nytt state
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.md, marginBottom: theme.spacing.md }}
      >
        <MaterialCommunityIcons
          name={isEmploymentTypeFilterVisible ? 'chevron-down' : 'chevron-right'} // Använd nytt state
          size={24}
          color={theme.colors.black}
        />
        <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>{t('Omfattning')}</Text>
      </TouchableOpacity>
      {isEmploymentTypeFilterVisible && ( 
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: theme.spacing.md, gap: theme.spacing.sm }}>
        {[
          { id: 1, name: 'Heltid' },
          { id: 2, name: 'Deltid' },
          { id: 3, name: 'Extraarbete' },
          { id: 4, name: 'Praktik' },
          { id: 5, name: 'Ospecifierat' },
        ].map((type) => (
          <TouchableOpacity key={type.id} onPress={() => setEmploymentTypeFilter(employmentTypeFilter === type.id ? null : type.id)} style={styles.jobTypeButton}>
            <Text
              style={{
                ...styles.jobTypeButtonText,
                backgroundColor: employmentTypeFilter === type.id ? theme.colors.primary : theme.colors.grey4,
                color: employmentTypeFilter === type.id ? theme.colors.white : theme.colors.black,
              }}
            >
              {t(type.name)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      )}

       {/* Workplace Type Filter */}

      <TouchableOpacity

        onPress={() => setWorkplaceTypeFilterVisible(!isWorkplaceTypeFilterVisible)}

        style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.md, marginBottom: theme.spacing.md }}

      >

        <MaterialCommunityIcons

          name={isWorkplaceTypeFilterVisible ? 'chevron-down' : 'chevron-right'}

          size={24}

          color={theme.colors.black}

        />

        <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>{t('Arbetsplats')}</Text>

      </TouchableOpacity>

      {isWorkplaceTypeFilterVisible && (

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: theme.spacing.md, gap: theme.spacing.sm }}>

          {[

            { id: 1, name: 'På plats' },

            { id: 2, name: 'Distans' },

            { id: 3, name: 'Hybrid' },

            { id: 4, name: 'Ospecifierat' },

          ].map((type) => (

            <TouchableOpacity

              key={type.id}

              onPress={() => setWorkplaceTypeFilter(workplaceTypeFilter === type.id ? null : type.id)}

              style={styles.jobTypeButton}

            >

              <Text

                style={{

                  ...styles.jobTypeButtonText,

                  backgroundColor: workplaceTypeFilter === type.id ? theme.colors.primary : theme.colors.grey4,

                  color: workplaceTypeFilter === type.id ? theme.colors.white : theme.colors.black,

                }}

              >

                {t(type.name)}

              </Text>

            </TouchableOpacity>

          ))}

        </View>

      )}

      </View>



      {/* Render job list */}
      {filteredJobs?.length > 0 && filteredJobs.map((item: IJob) => (
        <Card
          key={item.id}
          style={{
            backgroundColor: theme.mode === 'light' ? theme.colors.white : theme.colors.black,
            marginBottom: theme.spacing?.md,
          }}
        >
          <Card.Content style={{ gap: theme.spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flexShrink: 1, marginRight: theme.spacing.md }}>
                <Text style={{ ...pageStyle.headline02, color: theme.colors.grey0 }}>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ paddingLeft: theme.spacing.xs }}>
                <MaterialCommunityIcons
                  name={favoriteJobs.includes(item.id) ? 'heart' : 'heart-outline'}
                  size={24}
                  color={favoriteJobs.includes(item.id) ? theme.colors.primary : theme.colors.grey3}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{ color: theme.colors.grey0 }}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>

            {item.description.length > 150 && (
              <TouchableOpacity onPress={() => handlePress(item)}>
                <Text style={{ color: theme.colors.primary, marginTop: -theme.spacing.sm }}>
                  {t('Visa mer...')}
                </Text>
              </TouchableOpacity>
            )}

            <View style={{ flexDirection: 'row', gap: theme.spacing.xs }}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color={theme.mode === 'light' ? theme.colors.grey3 : theme.colors.white}
              />
              <Text style={{ color: theme.colors.grey0 }}>{item.location}</Text>
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
              <Text style={{ ...pageStyle.button16, color: theme.colors.primary }}>{t('see-more')}</Text>
            </TouchableOpacity>
          </Card.Actions>
        </Card>
      ))}



      <JobDetail
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        selectedJob={selectedJob!}
        refetch={refetch}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  newsContainer: {
    maxWidth: 800,
    marginHorizontal: 'auto',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 8,
  },
  readMore: {
    marginTop: 10,
    color: '#7476b4',
    textDecorationLine: 'underline',
    fontWeight: 'normal',
  },
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
  // Nya stilar för jobbtypknapparna
  jobTypeButton: {
    // Du kan lägga till padding eller margin här om du vill, men flexWrap med gap brukar räcka
  },
  jobTypeButtonText: {
    padding: 10,
    borderRadius: 10,
  },
  
  filterSectionContainer: {
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 10, 
    padding: 10,
    marginBottom: 15,

  },
});

export default Jobsindex;