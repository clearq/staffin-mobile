
import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";

import { Avatar, Divider, useTheme } from "@rneui/themed";
import { Sizes, theme } from "@/constants/Theme";
import { useAuth } from "@/contexts/authContext";

import { ProfileAvatar } from "@/components/UI/ProfileAvatar";
import { useUserData } from "@/hooks/useUserData";


const isIOS = Platform.OS === "ios";

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const { theme } = useTheme();
  const { authState: { userData, userId }, isLoading, } = useAuth();

  // Get User Info
  const {
    data: user,
    refetch: userRefetch,
    isLoading: userIsLoading,
    isPending,
  } = useUserData(Number(userId));  
 

  return (
    <View
      style={{
        paddingHorizontal: Sizes.fixPadding,                                 
      }}
    >
      <View
        style={{
          ...styles.tabBarContainer,
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.divider,
        }}
      >
        
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;

          const isFocused = state.index === index;
          
                  
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
                    backgroundColor: theme.colors.background 
                  },
                ]}
              >
                <ProfileAvatar 
                  userId={user?.id}
                  image={user?.profileImage}
                  size={60}
                  handleUpdate={userRefetch}
                />
                {/* {avatar !== ""
                  ? <Avatar size={60} rounded source={{uri: avatar}} />      
                  :<Avatar size={60} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
                } */}
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
    paddingHorizontal: theme.spacing?.xl,
    borderRadius: 40,
    marginBottom: isIOS ? 20 : 15,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
    transform:[{translateX: 8}],
  },
  middleTab: {
    position:'absolute',
    left:'50%',
    right: '50%',
    transform: [{ translateX: -16 }],
    top: "-50%",
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});
