// InputField.tsx
import React, { useState } from "react";
import { TextInput, StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { Sizes, theme } from "@/constants/Theme"
import { Text } from "@rneui/base";
import { commonStyles, Fonts } from "@/constants/Theme";
import pageStyle from "@/constants/Styles";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onBlur?: (e: any) => void;
  onChangeText?: (text: string) => void;
  styles?: any;
  leftIcon?: any;
  rightIcon?: any;
  errorMessage?: string;
  disabled?: boolean;
  //secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad' |'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
  multiline?: boolean;
  openDatePicker?: () => void
}



export const TextField: React.FC<Props> = (props) => {
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, borderColor: theme.colors.divider }}>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          ...props.styles,
          ...pageStyle.inputText,
          borderColor: theme.colors.divider,
          backgroundColor: theme.colors.searchBg,
          width: "100%",
        }}
        placeholder={props.placeholder}
        value={props.value}
        placeholderTextColor={theme.colors.divider}
        cursorColor={theme.colors.primary}
        selectionColor={theme.colors.primary}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        autoCapitalize="none"
      />
      {props.errorMessage ? (
        <Text
          style={{
            ...pageStyle.smText,
            color: theme.colors.error,
            marginHorizontal: theme.spacing.xs,
          }}
        >
          {props.errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

export const MultiTextField: React.FC<Props> = (props) => {
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, borderColor: theme.colors.divider }}>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          ...props.styles,
          ...pageStyle.inputText,
          borderColor: theme.colors.divider,
          backgroundColor: theme.colors.searchBg,
          width: "100%",
          height: 150,
          color: theme.colors.grey0,
        }}
        placeholder={props.placeholder}
        value={props.value}
        placeholderTextColor={theme.colors.divider}
        cursorColor={theme.colors.primary}
        selectionColor={theme.colors.primary}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        autoCapitalize="none"
        multiline={true}
      />
      {props.errorMessage ? (
        <Text
          style={{
            ...pageStyle.smText,
            color: theme.colors.error,
            marginHorizontal: theme.spacing.xs,
          }}
        >
          {props.errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

export const IconTextField: React.FC<Props> = (props) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <View style={{ ...styles.container, borderColor: theme.colors.divider }}>
      <View
        style={{
          ...styles.input,
          ...props.styles,
          borderColor: theme.colors.divider,
          backgroundColor: theme.colors.searchBg,
          width: "100%",
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >

        <TextInput
          {...props}  
          style={{
            ...pageStyle.inputText,
             width:'80%'
          }}      
          secureTextEntry={showPassword}
          placeholder={props.placeholder}
          value={props.value}
          placeholderTextColor={theme.colors.divider}
          cursorColor={theme.colors.primary}
          selectionColor={theme.colors.primary}
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={20} color={theme.colors.divider} />
        </TouchableOpacity>
      </View>

      {props.errorMessage ? (
        <Text
          style={{
            ...pageStyle.smText,
            color: theme.colors.error,
            marginHorizontal: theme.spacing.xs,
          }}
        >
          {props.errorMessage}
        </Text>
      ) : null}
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    borderRadius: theme.spacing?.sm,
    marginBottom: theme.spacing?.xs,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 10, 
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});


