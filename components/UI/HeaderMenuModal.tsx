import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { colors } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type props = {
  onClose: () => void
  handleLogout: () => void
}

const HeaderMenuModal = ({onClose, handleLogout}: props) => {
  return (
    <View style={[styles.container]}>

      <TouchableOpacity
        style={[styles.menuContainer]}
        onPress={onClose}
      >
        <MaterialCommunityIcons 
          name='window-close' 
          size={24} 
          color={colors.gray} 
          style={[styles.closeBtn]}
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.menuContainer]}
        onPress={handleLogout}
      >
        <Text
          style={[styles.menuText]}
        >
          Log Out
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuContainer]}
      >
        <Text
          style={[styles.menuText]}
          onPress={onClose}
        >
          Setting
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderMenuModal

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    bottom:0, 
    width:'100%', 
    paddingVertical:16, 
    paddingTop:16,
    paddingBottom:40,
    backgroundColor:colors.white, 
  },
  menuContainer:{
    padding:16,
  },
  menuText:{
    fontFamily:'Inter-Regular',
    fontSize:16,
    textAlign:'center',
  },
  closeBtn:{
    alignSelf:'flex-end'
  }
})