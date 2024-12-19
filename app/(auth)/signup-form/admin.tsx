import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

// Redux
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { signUpAdmin } from "@/store/Slice/authSlice"

// UI
import { TextInput } from 'react-native-paper';
import { colors } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ButtonLg } from '@/components/UI/CustomButton';
import { globalStyles } from '@/constants/globalStyles';

const Admin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch(); 
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [organisationNumber, setOrganisationNumber] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoading, error } = useAppSelector((state) => state.auth)

  const handleSignUp = async () => {
    if (!companyName || !organisationNumber || !email || !password) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const result = await dispatch(signUpAdmin({ companyName, organisationNumber, email, password }));
  
      if (signUpAdmin.fulfilled.match(result)) {
        console.log("Sign-up successful:", result.payload);
  
        const { role } = result.payload;
  
        if (role === 1) {
          router.push("/(admin)/(tabs)/dashboard");
        } else {
          console.log("Unhandled role:", role);
        }
      } else {
        console.error("Sign-up failed:", result.payload || result.error);
      }
    } catch (error) {
      console.error("Unexpected error during sign-up:", error);
    }
  };

  
  return (
    <View style={[styles.container, {width:'100%'}]}>

      <View style={styles.formContainer}>
        <TextInput
          textColor={colors.white}
          style={styles.textInputStyle}
          label="Company Name"
          placeholder="Company Name"
          placeholderTextColor={colors.white70}
          value={companyName}
          onChangeText={companyName => setCompanyName(companyName)}
          mode="outlined"
          autoCapitalize="none"
          theme={theme}
        />

        <TextInput
          textColor={colors.white}
          style={styles.textInputStyle}
          label="Organisation Number"
          placeholder="Organisation Number"
          placeholderTextColor={colors.white70}
          value={organisationNumber}
          onChangeText={organisationNumber => setOrganisationNumber(organisationNumber)}
          mode="outlined"
          autoCapitalize="none"
          theme={theme}
        />

        <TextInput
          textColor={colors.white}
          style={styles.textInputStyle}
          label="Email"
          placeholder="Email"
          placeholderTextColor={colors.white70}
          value={email}
          onChangeText={email => setEmail(email)}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          theme={theme}
        />
            
        <TextInput
          textColor={colors.white}
          style={styles.textInputStyle}
          label="Password"
          placeholder="Password"
          placeholderTextColor={colors.white70}
          value={password}
          onChangeText={password => setPassword(password)}
          mode="outlined"
          theme={theme}
          secureTextEntry = {!showPassword}
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={!showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={colors.white}
                />
              )}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

      
      </View>

      <ButtonLg
        title={isLoading ? "Loading..." : "Sign Up"}
        containerStyles={globalStyles.btnBlack}
        textColor={colors.white}
        isLoading={isLoading} 
        handlePress={handleSignUp}      
      />
    </View>
  )
}

export default Admin

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap:24,
  },
  titleContainer:{
    alignItems:'center',
    width:'100%',
    gap:8,
  },
  formContainer:{
    width:'100%',
    gap:8,
  },
  link:{
    fontFamily:'Inter-Regular',
    fontSize:16,
    color:colors.secondary,
    textDecorationLine:'underline'
  },
  textInputStyle:{
    width:'100%',
  },
});

// TextInput Theme
const theme = {
  colors:{
    primary:colors.secondary, 
    secondary:colors.white40, 
    onSurfaceVariant:colors.white40, 
    onBackground:colors.primaryDark,
    background:colors.primaryDark
  },    
}