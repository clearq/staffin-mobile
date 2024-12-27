import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react'
// API
import { updateStaff } from '@/api/staff';
import { User } from '@/api/user';
// Components
import StaffInformation from './(Edit)/information';
import StaffExperience from './(Edit)/experience';
import StaffEducations from './(Edit)/educations';
// UI
import { ButtonMd } from '@/components/UI/CustomButton';
import { colors } from '@/constants/Colors';
import { globalStyles } from '@/constants/globalStyles';


type StaffProfileEditProps = {
  user:User
  initialScreen: 'information' | 'experience' | 'education';
  token:string
  handleEditInfo:()=> void
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


const StaffProfileEdit = ({ initialScreen, user, token, handleEditInfo }: StaffProfileEditProps) => {
  const [screen, setScreen] = useState(initialScreen);
  const [isSaving, setIsSaving] = useState(false); 
  
  const handleUserInfo = async (updatedUser: User) => {
    setIsSaving(true);
    try {
      await updateStaff(updatedUser, token);
      handleEditInfo(); // Switch page
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Failed to save user data.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={[globalStyles.container, {gap:8,}]}>

      {/* Sub menu buttons */}
      <View style={styles.btnGroup}>
        {editMenu.map(menu => (
          <View key={menu.id}>
            <ButtonMd
              title={menu.title} 
              handlePress={()=> setScreen(menu.screen)}
              containerStyles={screen === menu.screen
                ? globalStyles.iconButtonBlack
                : globalStyles.iconButtonOutlineBlack
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

      {/* Informations */}
      {screen === 'information' &&       
        <StaffInformation
          user={user} 
          onSubmit={handleUserInfo}
          isSaving={isSaving}
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
    justifyContent:'flex-end',
    flex:1,
    paddingHorizontal:16,
    marginBottom:24
  },
})