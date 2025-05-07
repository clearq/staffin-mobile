import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dialog, Header, useTheme } from "@rneui/themed";
import { Sizes, theme } from "@/constants/Theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import pageStyle from '@/constants/Styles';

interface Props {
  children: React.ReactNode;
  visible: boolean;
  setVisible: () => void;
}

const BottomSheetCustom :React.FC<Props> = ({ children, visible, setVisible }) => {
  const { theme } = useTheme();

  return (
    <Dialog
      animationType="slide"
      overlayStyle={{
        backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black,
        width: "90%",
        //height: "82%",
        marginHorizontal: 5,
        margin: 0,
        paddingBottom: 0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
      }}
      backdropStyle={{ backgroundColor: theme.colors.background, opacity: 0.8 }}
      isVisible={visible}
      onBackdropPress={setVisible}
      style={{
        ...styles.container, 
      }}
    >
      <TouchableOpacity
        style={{...styles.closeButton,}}
        onPress={setVisible}
      >
        <MaterialCommunityIcons name='close' size={20} color={theme.colors.grey0} />
      </TouchableOpacity>
      {children}
    </Dialog>
  )
}
export default BottomSheetCustom

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 0,
    padding: theme.spacing?.md,
  },
  headerContainer: {
    position: "relative",
    zIndex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 10,
    borderRadius: 100,
  },
});