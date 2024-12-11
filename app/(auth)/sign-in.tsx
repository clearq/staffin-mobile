import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Link, useRouter } from "expo-router"; 

import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { login, getCurrentUser } from "@/store/Slice/authSlice";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch(); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authUser, isLoading, error } = useAppSelector((state) => state.auth)

  const handleLogin = async () => {
    const result = await dispatch(login({ email, password }))

    if(login.fulfilled.match(result)) {
      console.log("Login successful:", result.payload);
      
      // Login successful: dispatch getCurrentUser
      const userId = result.payload.id;
      const currentUserResult = await dispatch(getCurrentUser(userId));

      if (getCurrentUser.fulfilled.match(currentUserResult)) {
        console.log("Fetched current user:", currentUserResult.payload);
    

      } else {
        console.error("Failed to fetch current user:", currentUserResult.payload);
      }
    } else {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && authUser) {
      if (authUser.role === 1) {       
        router.push('/(admin)/(tabs)/dashboard');
        console.log('role:', authUser.role);      
      } else if (authUser.role === 3) {
        router.push('/(staff)/(tabs)/home');
        console.log('role:', authUser.role);
      }
    }
  }, [authUser, isLoading]);

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isLoading ? "Logging in..." : "Sign In"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      <Link href={"/(staff)/(tabs)/home"} style={styles.link}>
        <Text>Staff</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  link: {
    marginTop: 16,
    color: "blue",
  },
});

export default SignIn;