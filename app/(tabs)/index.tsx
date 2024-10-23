import { View, Text, StyleSheet } from 'react-native';
import gStyle from '@/constants/GlobalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  return (
    <View style={gStyle.container}>
      <Text>Home</Text>
    </View>
  );
}


