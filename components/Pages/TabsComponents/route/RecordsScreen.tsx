"use client";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { Fonts, Sizes, theme } from "@/constants/Theme";
import { Divider, useTheme } from "@rneui/themed";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInLeft, BounceIn, BounceInDown} from "react-native-reanimated";
import { useAuth } from "@/contexts/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pageStyle from "@/constants/Styles";
import ModalHeader from "../ModalHeader";

type RecordItem = {
  id: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  value: string;
  path: `${string}`;
};

const screenWidth = Dimensions.get("window").width

export default function RecordsScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const {
    authState: { userData },
  } = useAuth();

  // const userData = null;

  const recordsList:RecordItem[] = [
    {
      id: 1,
      icon: "account-box-outline",
      title: t("overviwe"), // overview
      value: t("overview"),
      path: "profile",
    },
    {
      id: 2,
      icon: "playlist-check", // My Application
      title: t("my-application"),
      value: t("my-application"),
      path: "application",
    },
    {
      id: 3,
      icon: "file-document-outline", // My Document
      title: t("my-document"),
      value: t("my-document"),
      path: "document",
    },
  ];

 

  return (
    <Animated.View entering={BounceInDown.delay(300).duration(1000).springify()}>
      <ModalHeader title={t("profile")} />

      <View
        style={{
          ...styles.itemContainer,
        }}
      >
        {/* Staff */}
        {userData?.roleId === 3 && recordsList.map((item) => 
          <TouchableOpacity 
            key={item.id}
            style={{
              ...styles.recordInfoBox
            }}
            onPress={() =>{
              if(item.path) {
                router.push(`/(app)/(tabs)/${item.path}`)
              }
            }}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color={theme.colors.grey0}/>
            <Text
              style={{
                ...pageStyle.headline02,
                color: theme.colors.grey0,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>          
        )}
        {/* add Employer */}
        {/* add Admin */}
      </View>
    </Animated.View>
  );
}



const styles = StyleSheet.create({
  itemContainer:{
    padding: Sizes.fixPadding,
    flexDirection: 'column',
    gap: theme.spacing?.md
  },
  recordInfoBox: {
    flexDirection: "row",
    padding: Sizes.fixPadding,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing?.md,
  },
});