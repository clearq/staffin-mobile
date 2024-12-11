import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from "@/store/reduxHooks";
import { Company, getCompanyDetails } from '@/api/company';

const AdminProfile = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Control state
    console.log("Redux state - user:", user);
    console.log("Redux state - isLoading:", isLoading);
    console.log("Redux state - error:", error);
  }, [user, isLoading, error]);
  
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (user?.companyId) {
        try {
          const companyData = await getCompanyDetails(user.companyId);
          setCompany(companyData); 
        } catch (err) {
          setErrorMessage("Failed to fetch company details");
        } finally {
          setLoading(false);
        }
      } else {
        setErrorMessage("No companyId found");
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  },[user])


  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>No user data available</Text>;
  }
  
  return (
    <View>
    { user !== null && !isLoading && (
      <View>
        <Text>Staff Profile</Text>
        <Text>Name: {user.firstName}</Text>
        <Text>Email: {user.lastName}</Text>
      </View>
    )}
    { company && (
      <Text>Co.name: {company.companyName}</Text>
    )}
    </View>
  )
}

export default AdminProfile