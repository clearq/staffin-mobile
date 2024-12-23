import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

// Redux
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { signUpStaff } from "@/store/slice/authSlice"

// UI
import { TextInput } from 'react-native-paper';
import { colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ButtonLg } from '@/components/UI/CustomButton';
import { globalStyles } from '@/constants/globalStyles';


const Staff = () => {
  const router = useRouter();
  const dispatch = useAppDispatch(); 
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoading } = useAppSelector((state) => state.auth)

  const handleSignUp = async () => {
    if (!userName || !email || !password) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const result = await dispatch(signUpStaff({ userName, email, password }));
  
      if (signUpStaff.fulfilled.match(result)) {
        console.log("Sign-up successful:", result.payload);
  
        const { role } = result.payload;
  
        if (role === 3) {
          router.push("/(staff)/(tabs)/home");
          console.log("Navigating to staff home...");
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
          label="User Name"
          placeholder="User Name"
          placeholderTextColor={colors.white70}
          value={userName}
          onChangeText={userName => setUserName(userName)}
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

export default Staff

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