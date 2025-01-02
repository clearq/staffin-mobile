import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import dayjs from 'dayjs'

import { colors } from '@/constants/Colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import DateTimePicker from 'react-native-ui-datepicker'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ButtonLg } from '@/components/UI/CustomButton'
import { globalStyles } from '@/constants/globalStyles'



type props = {
  label: string
  value: string
  handleChange: (e:string)=> void
  formStyle?: {}
  multilineText: boolean
  placholderColor?: string
}

const EditTextInput = ({label, value, handleChange,formStyle, multilineText, placholderColor}:props) => {
  const [onFocus, setOnFocus] = useState<boolean>(false)

  return ( 
    <View style={[styles.textInputContainer, formStyle]}>
      <View style={{flex:1, justifyContent:'space-around'}}>
        <Text style={[onFocus? styles.onLabelText : styles.labelText]}>
          {label}:
        </Text>
        <TextInput
          style={[onFocus? styles.onTextInputStyle : styles.textInputStyle]}
          placeholder={label}
          placeholderTextColor={placholderColor}
          value={value}
          onFocus={()=> setOnFocus(true)}
          onBlur={()=> setOnFocus(false)}
          onChangeText={handleChange}
          multiline={multilineText}       
        />
      </View>
    </View>
        
  )
}


const EditTextInputMultiline = ({label, value, handleChange,formStyle, multilineText, placholderColor}:props) => {
  const [onFocus, setOnFocus] = useState<boolean>(false)

  return ( 
    <View style={[styles.textInputContainer, formStyle]}>
      <View style={{flex:1, justifyContent:'space-around'}}>
        <Text style={[onFocus? styles.onLabelText : styles.labelText]}>
          {label}:
        </Text>
        <TextInput
          style={[onFocus? styles.onTextInputStyle : styles.textInputStyle, {minHeight:80}]}
          placeholder={label}
          placeholderTextColor={placholderColor}
          value={value}
          onFocus={()=> setOnFocus(true)}
          onBlur={()=> setOnFocus(false)}
          onChangeText={handleChange}
          multiline={multilineText}       
        />
      </View>
    </View>
        
  )
}


const EditTextInputDate = ({label, value, handleChange,formStyle, multilineText, placholderColor}:props) => {
  const [date, setDate] = useState(dayjs())
  const [onFocus, setOnFocus] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false)

  const handleDateSubmit = () => {
    handleChange(date.format('YYYY-MM-DD'))
    setOpenModal(false)
  }

  return (
    <View style={[styles.textInputContainer, formStyle]}>
      <View style={{flex:1, justifyContent:'space-around'}}>
        <Text style={[onFocus? styles.onLabelText : styles.labelText]}>
          {label}:
        </Text>
        <View style={[
          onFocus? styles.onTextInputStyle : styles.textInputStyle, 
          styles.iconStyle,
        ]}>
          <TextInput
            placeholder='YYYY-MM-DD'
            placeholderTextColor={placholderColor}
            value={value}
            onFocus={()=> setOnFocus(true)}
            onBlur={()=> setOnFocus(false)}
            onChangeText={handleChange}
            multiline={multilineText}    
          />
          <TouchableOpacity
            onPress={()=> setOpenModal(true)} 
          >
            <MaterialCommunityIcons name={'calendar-range-outline'} size={20} color={colors.gray} />
          </TouchableOpacity>

        </View >
      </View>
        {openModal && (
          <SafeAreaProvider>
            <SafeAreaView
              style={{flex:1,}}
            >
              <Modal
                style={[styles.modalContainer]}
                transparent={true}
              >
                <View
                  style={[styles.modalBg]}
                >
                  <View
                    style={[styles.cardContainer]}
                  >
                    <DateTimePicker 
                      mode='single'
                      date={date}
                      onChange={(e:any) => setDate(e.date)}
                    />

                    <ButtonLg
                      title='Submit'
                      handlePress={handleDateSubmit}
                      textColor={colors.white}
                      containerStyles={globalStyles.btnBlack}
                      isLoading={false}
                    />
                  </View>

                </View>
              </Modal>
            </SafeAreaView> 
          </SafeAreaProvider>        
        )}
    </View>
  )
}

export {EditTextInput, EditTextInputMultiline, EditTextInputDate}

const styles = StyleSheet.create({
  textInputContainer:{
    width:'100%',
    flexDirection:'column',
    gap:4,
    justifyContent:'flex-start',
    minHeight:40,
  },
  textInputStyle:{
    width:'100%',
    borderColor:colors.gray,
    borderWidth:0.5,
    padding:8,
    borderRadius:4,
  },
  onTextInputStyle:{
    width:'100%',
    borderColor:colors.secondary,
    borderWidth:1,
    padding:8,
    borderRadius:4,
  },
  labelText:{
    fontFamily: 'Inter-Regular',
    fontSize:12,
    color:colors.gray,
  },
  onLabelText:{
    fontFamily: 'Inter-Regular',
    fontSize:12,
    color:colors.secondary,
  },
  iconStyle:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  modalContainer:{
    flex:1,
  },
  modalBg:{
    width:'100%',
    height:'100%',
    backgroundColor:colors.black60,
    justifyContent:'center'
  },
  cardContainer:{
    padding:16,
    backgroundColor:colors.white,
  },
});