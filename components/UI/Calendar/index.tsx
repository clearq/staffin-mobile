import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { useTheme } from '@rneui/themed';
import { useToast } from "react-native-toast-notifications";
import { useTranslation } from 'react-i18next';
import { DateType, getDefaultStyles } from 'react-native-ui-datepicker';
import { useRouter } from 'expo-router';
import DateTimePicker from 'react-native-ui-datepicker'
import Button from '@/components/UI/Button'
import dayjs from 'dayjs';



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
  const router = useRouter()
  const defaultStyles = getDefaultStyles();

  
  return (
    <Modal
      transparent={true}
      animationType='slide'
      onRequestClose={onClose}
      style={{flex: 1,}}
    >    
      <View
        style={{
          ...styles.calendarContainer,
          backgroundColor: theme.colors.modal
        }}
      >
        <View
          style={{
            ...styles.calendar,
            backgroundColor: theme.colors.background
          }}
        >
          <DateTimePicker
            styles={{
              ...defaultStyles,
              today: { 
                color: theme.colors.secondary, 
                borderWidth: 1 
              }, // Add a border to today's date
              selected: { 
                backgroundColor: theme.colors.primary 
              }, // Highlight the selected day
              selected_label: { color: 'white' }, // Highlight the selected day label
            }}
            startDate={1}
            date={date}
            mode="single"
            onChange={({date}) => setDate(date)}
          />    

          {/* Button Group */}
          <View
            style={{...styles.buttonGroup}}
          >
            <Button 
              title={`${t("cancel")}`}
              onPress={onClose}
            />
            <Button
              title={`${"submit"}`}
              onPress={onSubmit}
            />
          </View>
        </View>
      </View>            
    </Modal>  
  )
}

export default DateCalendar

const styles = StyleSheet.create({
  calendarContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
})