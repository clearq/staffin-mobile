import { Text, useTheme } from "@rneui/themed";
import React from "react";

import { Sizes } from "@/constants/Theme";
import { StyleSheet, View } from "react-native";

interface HeaderProps {
  title: string;
  description: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <Text style={{ ...styles.title, color: theme.colors.grey0 }}>{title}</Text>
      <Text style={{ ...styles.description, color: theme.colors.grey2 }}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding - 3,
  },
  title: {
    fontFamily: "Coolvetica",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontFamily: "Coolvetica",
    fontSize: 16,
  },
});