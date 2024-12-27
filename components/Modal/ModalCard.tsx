import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '@/constants/Colors';
import { ButtonLg } from '../UI/CustomButton';
import { globalStyles } from '@/constants/globalStyles';

type props = {
  modalclose: () => void;
  children: React.ReactNode;
  onSubmit: () => void
}

const ModalCard = ({modalclose, children, onSubmit, }:props) => (
  <SafeAreaView style={[styles.container, styles.modalPosition]}>

    <View style={[styles.cardContainer]}>
      <View style={[styles.headerContainer]}>
        <Text style={[globalStyles.titleText]}>Add Experience</Text>

        <TouchableOpacity
          onPress={modalclose}
        >
          <MaterialCommunityIcons name='close' size={24} color={colors.gray} />
        </TouchableOpacity>
      </View>

      <View style={[styles.bodyContaimer]}>
        {children}
      </View>

      <ButtonLg 
        title={'Submit'} 
        handlePress={onSubmit} 
        containerStyles={globalStyles.btnBlack} 
        textColor={colors.white} 
        isLoading={false} 
      />

    </View>
  </SafeAreaView>
)

export default ModalCard

const styles = StyleSheet.create({
  modalPosition:{
    position:'absolute', 
    width:'100%', 
    height:'100%',
    zIndex:1000,
  },
  container: {
    height:'100%',
    width:'100%',
    backgroundColor:colors.black60,
    padding:16,
    justifyContent:'center',
  },
  cardContainer: {
    padding:16,
    backgroundColor:colors.white,
    gap:16,
    height:'auto',
  },
  bodyContaimer: {
  },
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

})