import { View, Text, TouchableOpacity, StyleSheet, Modal,  } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '@/constants/Colors';
import { ButtonLg } from '../UI/CustomButton';
import { globalStyles } from '@/constants/globalStyles';

type props = {
  modalclose: () => void;
  children: React.ReactNode;
  onSubmit: () => void
  title: string
}

const ModalCard = ({modalclose, children, onSubmit, title}:props) => (
  <SafeAreaProvider>
    <SafeAreaView
      style={{flex:1, justifyContent:'center', alignContent:'center'}}
    >
      <Modal
        transparent={true}
        style={[styles.container]}
      >
        <View
          style={[styles.modalBg]}
        >

          <View style={[styles.cardContainer]}>
            {/** Card Header */}
            <View style={[styles.headerContainer]}>
              <Text style={[globalStyles.titleText]}>{title}</Text>

              <TouchableOpacity
                onPress={modalclose}
              >
                <MaterialCommunityIcons name='close' size={24} color={colors.gray} />
              </TouchableOpacity>
            </View>

            {/** Card Body */}
            <View style={[styles.bodyContaner]}>
              {children}
            </View>

            {/** Card Footer */}
            <View
              style={[styles.footerContainer]}
            >
              <ButtonLg 
                title={'Submit'} 
                handlePress={onSubmit} 
                containerStyles={globalStyles.btnBlack} 
                textColor={colors.white} 
                isLoading={false} 
              />
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  </SafeAreaProvider>
)

export default ModalCard

const styles = StyleSheet.create({

  container: {
    flex:1,
  },
  modalBg:{
    width:'100%',
    height:'100%',
    backgroundColor:colors.black60,
    justifyContent:'center'
  },
  cardContainer: {
    padding:16,
    backgroundColor:colors.white,
  },
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:16,
  },
  bodyContaner: {
    paddingVertical:0,
  },
  footerContainer:{
    marginTop:24,
  },
})