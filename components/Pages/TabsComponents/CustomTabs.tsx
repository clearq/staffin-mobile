
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Divider, useTheme } from "@rneui/themed";
import { Sizes, theme } from "@/constants/Theme";
import { useAuth } from "@/contexts/authContext";
import { ImageManipulator, manipulateAsync, SaveFormat, useImageManipulator } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import index from "./ModalHeader";
import { formToJSON } from "axios";


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
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.divider,
      }}
    >
      
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;

        const isFocused = state.index === index;

        //console.log('route:', route.name); // Debugging the route name
        //console.log('state', route.name);
        
        //console.log('index:', index); // Debugging the route index
        //console.log('state.index:', state.index); // Debugging state.index
        //console.log('option:', options.tabBarIcon, '|', options.headerTitle );
        
                
        if (label === "Route") {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => {
                if (isFocused) return;

                // Navigate to the respective route
                navigation.navigate(route.name, route.params);
              }}
              style={[
                styles.tabBarItem,
                styles.middleTab,
                {
                  backgroundColor: isFocused ? theme.colors.primary :  theme.colors.background 
                },
              ]}
            >
              {avatar 
                ? <Avatar size={60} rounded source={{uri: avatar}} />      
                :<Avatar size={60} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
              }
            </TouchableOpacity>
          );
        } else {
          const isFocused = state.index === index;
          const renderTextBelow = index !== Math.floor(state.routes.length / 2) && options.tabBarIcon; // Render text below for non-middle tabs
          
          // console.log('option:', options.tabBarIcon, '|', options.headerTitle );
          
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => {
                navigation.navigate(route.name, route.params);
              }}
              style={[styles.tabBarItem]}
            >
              <View style={{ alignItems: "center" }}>
                {options && options.tabBarIcon && options?.tabBarIcon({ focused: isFocused })}

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 40,
    marginBottom: isIOS ? 20 : 15,
    zIndex: 1,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  middleTab: {
    position:'absolute',
    left:'50%',
    right:'50%',
    top: "-50%",
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});
