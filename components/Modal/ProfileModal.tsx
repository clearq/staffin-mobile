import { View, Text } from 'react-native'
import React from 'react'
import { IUser } from '@/types';

interface props {
  user: IUser;
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
}

const ProfileModal = ({user, visible, onClose, handleSuccess}: props) => {
  return (
    <View>
      <Text>ProfileModal</Text>
    </View>
  )
}

export default ProfileModal