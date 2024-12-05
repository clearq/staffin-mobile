import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import { UserIconProfile } from '@/components/UI/UserIcons';
import { globalStyles } from '@/constants/GlobalStyle';
import { User } from '@/constants/types/UserType';



// Header
interface MenuItem {
  id: number;
  title: string;
  link: string;
}

interface prorps {
  name: string
  title?: string 
  menus:MenuItem[]
  data: User
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    gap:8,
    width: '100%',
  },
  col:{
    flex:1,
    flexDirection:'column',
    gap:8,
    width:'100%'
  },
  rowWrap:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    gap:8,
  },
  skillButton:{
    backgroundColor:`${Colors.primaryLight}`,
    padding:8,
    borderRadius:4
  },
  headerCcontainer:{
    width:'100%',
    margin:0,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  layout:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:16,
  },
  menuContainer:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    padding:16, 
    marginTop: 16,
  },
})

const ProfileHeader = ({name, title, menus, data}: prorps) => {
  
  return (
    <View style={{flexDirection:'column',}}>
      <View
        style={[styles.headerCcontainer, {height:120}]}
      >
        <LinearGradient 
          colors={[`${Colors.primaryLight}`, `${Colors.secondary}`]}
          style={styles.background}
          start={{ x: 0, y: 0}}
          end={{x: 1, y: 1}}
        >
          <View style={[styles.layout]}>

            <View style={{flexDirection:'row', alignItems:'flex-end', gap:16}}>
              <UserIconProfile data={data} />

              <View style={{flexDirection:'column', alignItems:'baseline'}}>
                <Text style={[globalStyles.titleText]}>
                  {name}
                </Text>
                {title &&
                  <Text style={[globalStyles.textSm,]}>
                    {title}
                  </Text>
                }
              </View>

            </View>
          </View>
        </LinearGradient>
      </View>

    
      {/* Menu */}
      <View style={[styles.headerCcontainer, styles.menuContainer]}>
        {menus && menus.map(menu => 
          <Text key={menu.id}>{menu.title}</Text>
        )}
      
      </View>
    </View>
  )
}

export default ProfileHeader