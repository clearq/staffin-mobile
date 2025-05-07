import { theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';

const CommentInput = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const handlePostComment = async () => {

  } 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            style={styles.input}
            placeholder={t("post-content-placeholder")}
            value={text}
            onChangeText={setText}
          />

          <TouchableOpacity
            onPress={handlePostComment}
          >
            <MaterialCommunityIcons name='send' color={theme.colors.grey0} size={24} />
          </TouchableOpacity>
          
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing?.md,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing?.md,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    height: 50,
    flexGrow: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: theme.spacing?.md,
  },
});