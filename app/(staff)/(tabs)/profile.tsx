import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from "@/store/reduxHooks";

const StaffProfile = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Control state
    console.log("Redux state - user:", user);
    console.log("Redux state - isLoading:", isLoading);
    console.log("Redux state - error:", error);
  }, [user, isLoading, error]);
  
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
        <Text>Firstnname: {user.firstName}</Text>
        <Text>Lastname: {user.lastName}</Text>
        <Text>E-mail: {user.email}</Text>
      </View>
    )}
    </View>
  )
}

export default StaffProfile