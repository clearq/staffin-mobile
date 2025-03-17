import React from "react";
import { StyleSheet, View, Pressable, Platform, StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import { Sizes } from "@/constants/Theme";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

interface Props {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: any;
  showBackIcon?: boolean;
  heightStatusBar?: boolean;
}

export default function MyStatusBar({ children, onPress, style, showBackIcon = false, heightStatusBar = false }: Props) {
  const { theme } = useTheme();

  const isIOS = Platform.OS === "ios";
  const insets = useSafeAreaInsets();

  return (
    <>
      <ExpoStatusBar
        networkActivityIndicatorVisible={true}
        translucent={true}
        backgroundColor={theme.colors.cardBg}
        style={Platform.OS === "android" ? "light" : theme.mode === "light" ? "dark" : "light"}
        hidden={heightStatusBar ? true : false}
        animated={true}
      />
      <SafeAreaView 
        style={{ 
          //backgroundColor: theme.colors.cardBg, 
          marginTop: isIOS 
            ? (StatusBar.currentHeight || 0) - 25 
            : (StatusBar.currentHeight || 0) - 30
        }}
      >
        {showBackIcon && (
          <View style={{ ...styles.topContainer, paddingTop: insets.top }}>
            <Pressable onPress={onPress} style={styles.linkStyle}>
              <MaterialIcons name="arrow-back" size={isIOS ? 16 : 20} color={theme.mode === "dark" ? theme.colors.white : theme.colors.black} />
            </Pressable>
            <View style={styles.rightText}>{children}</View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 0,
    margin: 0,
  },
  linkStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
    //backgroundColor: "transparent",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 8,
    marginBottom: 5,
    fontWeight: "bold",
  },
  rightText: {
    marginBottom: 5,
    textAlign: "right",
  },
  topContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
});