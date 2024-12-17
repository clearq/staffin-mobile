import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ButtonMd } from '@/components/UI/CustomButton';
import { colors } from '@/constants/colors';
import { globalStyles } from '@/constants/globalStyles';
import { User } from '@/api/user';
import StaffInformation from './(Edit)/information';
import StaffExperience from './(Edit)/experience';
import StaffEducations from './(Edit)/educations';

type StaffProfileEditProps = {
  user:User
  initialScreen: 'information' | 'experience' | 'education';
};

type Menu = {
  id: number;
  title: string;
  screen:'information' | 'experience' | 'education';
}

const editMenu:Menu[] = [
  {
    id:1,
    title:'Information',
    screen:'information',
  },
  {
    id:2,
    title:'Experience',
    screen:'experience',
  },
  {
    id:3,
    title:'Education',
    screen:'education',
  },
]

const StaffProfileEdit = ({ initialScreen, user }: StaffProfileEditProps) => {
  const [screen, setScreen] = useState(initialScreen);
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [street, setStreet] = useState(user.street)
  const [city, setCity] = useState(user.city)
  const [postalCode, setPostalCode] = useState(user.postalCode)
  const [country, setCountry] = useState(user.country)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [email, setEmail] = useState(user.email)
  const [about, setAbout] = useState(user.about)


  return (
    <View style={[globalStyles.container, globalStyles.paddingX, {gap:8}]}>

      {/* Sub menu buttons */}
      <View style={styles.btnGroup}>
        {editMenu.map(menu => (
          <View key={menu.id}>
            <ButtonMd
              title={menu.title} 
              handlePress={()=> setScreen(menu.screen)}
              containerStyles={screen === menu.screen
                ? styles.iconButton
                : styles.iconButtonOutline
              }
              textColor={screen === menu.screen
                ? colors.white
                : colors.black
              }
              isLoading={false}
            />
          </View>
        ))}
      </View>

      <Text>StaffProfileEdit</Text>
      {/* Informations */}
      {screen === 'information' &&
        <StaffInformation
          user={user} 
        />
      }

      {/* Experience */}
      {screen === 'experience' &&
        <StaffExperience 
          user={user}
        />
      }

      {/* Education */}
      {screen === 'education' &&
        <StaffEducations
          user={user} 
        />
      }
    </View>
  )
}

export default StaffProfileEdit

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  btnGroup: {
    flexDirection:'row', 
    gap:8, 
    justifyContent:'flex-end'
  },
  btnOrange:{
    backgroundColor:colors.secondary,
    borderColor:colors.secondary,
  },
  iconButton: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.black, 
    borderRadius:8,
    paddingHorizontal:8,
    height:32,
  },
  iconButtonOutline: {
    justifyContent:'center',
    alignItems:'center',
    borderColor:colors.black, 
    borderWidth:1,
    borderRadius:8,
    paddingHorizontal:8,
    height:32,
  }
})