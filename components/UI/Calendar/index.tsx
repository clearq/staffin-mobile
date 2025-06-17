import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { useTheme } from '@rneui/themed';
import { useToast } from "react-native-toast-notifications";
import { useTranslation } from 'react-i18next';
import { DateType } from 'react-native-ui-datepicker';
import { useRouter } from 'expo-router';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker'
import { Button } from '@/components/UI/Button'
import dayjs from 'dayjs';
import pageStyle from '@/constants/Styles';



interface props {
  onClose: () => void;
  setDate: (date: DateType) => void
  onSubmit?: () => void
  date: DateType
}
const DateCalendar = ({onClose, setDate, onSubmit, date}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter();

  const defaultStyles = useDefaultStyles();

  
  return (
    <SafeAreaView style={{...styles.centeredView}}>
      <Modal
        transparent={true}
        animationType='slide'
        onRequestClose={onClose}
      >    
        <View
          style={{...styles.centeredView }}
        >
          <View
            style={{
              ...styles.modalView,
              backgroundColor: theme.colors.background
            }}
          >
            <DateTimePicker
              styles={{
                ...defaultStyles,
                today: {
                  ...defaultStyles.today,
                  borderWidth: 2,
                  borderColor: theme.colors.primary,
                  borderRadius: 10,
                  backgroundColor: theme.colors.background,
                },
                today_label:{
                  fontWeight: '700',
                  color: theme.colors.primary,
                },
                selected: { 
                  borderRadius: 10,
                  backgroundColor: theme.colors.primary, 
                },
                selected_label: { 
                  color: 'white' 
                },
                day_label:{
                  color: theme.colors.grey0
                }
                
              }}
              startDate={1}
              date={date}
              mode="single"
              onChange={({date}) => setDate(date)}
            />    

            {/* Button Group */}
              <View
                style={{
                  ...pageStyle.buttonGroup,
                  marginTop: Sizes.fixPadding * 2,
                }}
              >
                <View
                  style={{
                    ...styles.btnContainer
                  }}
                >
                  <Button
                    title={`${t("cancel")}`}
                    onPress={() => {
                      onClose()
                    }}
                    size='lg'
                    type={'outline'}
                    color={'primary'}
                    titleColor={theme.colors.primary}
                  />                      
                </View>  

                <View
                  style={{
                    ...styles.btnContainer
                  }}
                >
                  <Button
                    title={`${t("save")}`}
                    onPress={onSubmit}
                    size={'lg'}
                    color={'primary'}
                    titleColor={theme.colors.white}
                  />
                </View>          

              </View>
          </View>
        </View>            
      </Modal>  
    </SafeAreaView>
  )
}

export default DateCalendar

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: theme.spacing?.md,
    padding: theme.spacing?.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputLabel: {
    ... pageStyle.smText,
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
  calendarContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.fixPadding,
  },
  calendar:{
    padding: Sizes.fixPadding,
    height: '50%'
  },
  buttonGroup:{
    flexDirection: 'row',
    justifyContent:'flex-end',
    gap: theme.spacing?.md,
  },
  btnContainer: {
    flexShrink: 2,
  }
})