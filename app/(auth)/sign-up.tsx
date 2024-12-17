import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from "expo-router"; 
//Redux

//UI
import { colors } from '@/constants/colors'
import { globalStyles } from '@/constants/globalStyles'
import  logo  from "../../assets/Images/icon.png"
import { ButtonLg } from '@/components/UI/CustomButton'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Staff from './signup-form/staff';
import Admin from './signup-form/admin';


const SignUp = () => {
  const [role, setRole] = useState<'staff'|'admin'|'none'>('none')
  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.paddingX, {backgroundColor: colors.primaryDark}]}> 

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={logo} style={{width:80, height:80}}  />
          <Text style={[globalStyles.titleText, {color:colors.white}]}>
            Sign Up
          </Text>

          {role === 'staff' &&
            <Text style={[globalStyles.subTitleText, {color:colors.white}]}>Staff</Text>
          }
          {role === 'admin' &&
            <Text style={[globalStyles.subTitleText, {color:colors.white}]}>Admin</Text>
          }

        </View>
        {role === 'none' && 
          <View style={styles.formContainer}>
            <ButtonLg 
              title='Staff'
              handlePress={() => setRole('staff')} 
              containerStyles={styles.btnOrange}
              textColor={colors.white} 
              isLoading={false} 
            />

            <ButtonLg 
              title='Admin'
              handlePress={() => setRole('admin')} 
              containerStyles={styles.btnBlue}
              textColor={colors.white} 
              isLoading={false} 
            />
          </View>
        }
        {role === 'staff' &&
          <>
            <Staff />

            <ButtonLg 
            title='Cancel'
            handlePress={() => setRole('none')} 
            containerStyles={styles.btnOutline}
            textColor={colors.white} 
            isLoading={false} 
            />      
          </>
        }
        {role === 'admin' &&
          <>
            <Admin />
            
            <ButtonLg 
            title='Cancel'
            handlePress={() => setRole('none')} 
            containerStyles={styles.btnOutline}
            textColor={colors.white} 
            isLoading={false} 
            />
          </>
        }

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={{color:colors.white, fontFamily:'Inter-Regular', fontSize:16}}>Do you already have an account? </Text>
          <Link href={"/(auth)/sign-in"} style={styles.link}>
            <Text>Sign In</Text>
          </Link>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
  btnOrange:{
    backgroundColor:colors.secondary,
    borderColor:colors.secondary,
  },
  btnBlue:{
    backgroundColor:colors.primary,
    borderColor:colors.primary
  },
  btnOutline:{
    borderColor:colors.white
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