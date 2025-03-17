
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Divider, useTheme } from "@rneui/themed";
import { Sizes, theme } from "@/constants/Theme";
import { useAuth } from "@/contexts/authContext";

const isIOS = Platform.OS === "ios";

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const { theme } = useTheme();
  const { authState } = useAuth();

  const user = authState.userData
  const avatar = user?.profileImage
  

  return (
    <View
      style={{
        ...styles.tabBarContainer,
        backgroundColor: theme.colors.searchBg,
        borderColor: theme.colors.divider,
      }}
    >
      

      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key] 
        const label = options.tabBarLabel || route.name
        const isFocused = state.index === index


        if (label === "Route") {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => {
                navigation.navigate(route.name, route.params);
              }}
              style={[
                styles.tabBarItem,
                styles.middleTab,
                {
                  backgroundColor: isFocused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey5 : theme.colors.grey2,
                },
              ]}
            >
              {avatar 
                ? <Avatar size={60} rounded source={{uri: user?.profileImage}} />      
                :<Avatar size={60} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
              }
            </TouchableOpacity>
          );
        } else {
          const isFocused = state.index === index;
          const renderTextBelow = index !== Math.floor(state.routes.length / 2) && options.tabBarIcon; // Render text below for non-middle tabs
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => {
                navigation.navigate(route.name, route.params);
              }}
              style={[styles.tabBarItem]}
            >
              <View style={{ alignItems: "center" }}>
                {options && options.tabBarIcon && options.tabBarIcon({ focused: isFocused })}

              </View>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingHorizontal: theme.spacing?.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 88,
    borderWidth: 0,
    zIndex: 1, // Ensure the TabBar stays on top of the TabView,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
    width:70,
    height:70,
    borderRadius: 100,
    top:"-20%"
  },
  middleTab: {
    top: "-40%",
  },
});
