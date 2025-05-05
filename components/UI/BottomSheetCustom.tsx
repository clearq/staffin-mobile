import { View, Text } from 'react-native'
import React from 'react'

interface Props {
  children: React.ReactNode;
  visible: boolean;
  setVisible: () => void;
}

const BottomSheetCustom :React.FC<Props> = ({ children, visible, setVisible }) => {


  return (
    <View>

    </View>
  )
}
export default BottomSheetCustom