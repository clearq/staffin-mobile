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
import React, { useCallback, useEffect, useState } from "react";
import { Fonts, Sizes, theme } from "@/constants/Theme";
import { Divider, useTheme } from "@rneui/themed";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInLeft, BounceIn, BounceInDown} from "react-native-reanimated";
import { useAuth } from "@/contexts/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pageStyle from "@/constants/Styles";
import ModalHeader from "../ModalHeader";
import { IActiveUser, useUserType } from "@/contexts/userTypeContext";
import { values } from "lodash";


const screenWidth = Dimensions.get("window").width

export default function RecordsScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const {
    authState: { userData, userId},
  } = useAuth();

  const {setActiveUserState, userType} = useUserType()

  // const userData = null;

  const staffRecordsList = [
    {
      id: 1,
      icon: "account-box-outline",
      title: t("profile"), // overview
      value: t("profile"),
      path: "/profile",
    },
    {
      id: 2,
      icon: "playlist-check", // My Application
      title: t("my-application"),
      value: t("my-application"),
      path: "/application",
    },
    {
      id: 3,
      icon: "file-document-outline", // My Document
      title: t("my-document"),
      value: t("my-document"),
      path: "/document",
    },
    {
      id: 4,
      icon: "post-outline", // My Document
      title: t("my-activity"),
      value: t("my-activity"),
      path: "/activity",
    },
  ];

  const adminRecordsList = [
    {
      id: 1,
      icon: "account-box-outline",
      title: t("profile"), // overview
      value: t("profile"),
      path: "/profile",
    },
    {
      id: 2,
      icon: "post-outline", // My Document
      title: t("activity"),
      value: t("activity"),
      path: "/activity",
    },
  ]

  useEffect(() => {
    if(!userId) {
      setActiveUserState({ userType: null })
      }      
      setActiveUserState({ userType:"admin" })   
      console.log(userId);
         
  },[userId])


  return (
    <View style={{flex:1, backgroundColor: theme.colors.background}}>
      <ModalHeader title={t("my-page")} />

      {userData && (
        <>
          {recordsInfo()}
        </>
      )}
    </View>    
  );

  function recordsInfo() {
    interface props {
      item: any
      index: number
    }
    const renderItem = ({item, index}:props) => (
      <TouchableOpacity 
        key={item.id}
        style={{
          ...styles.recordInfoBox
        }}
        onPress={() =>{
          if(item.path) {
            router.replace(item.path)
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
    );

    return (
      <Animated.View entering={BounceInDown.delay(300).duration(1000).springify()}>

        {userData?.roleId === 3 && 
          <FlatList 
            data={staffRecordsList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            numColumns={1}
            contentContainerStyle={{ padding: Sizes.fixPadding }}
            showsVerticalScrollIndicator={false}
          />
        }

        { userData?.roleId === 1 &&
          <FlatList 
            data={adminRecordsList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            numColumns={1}
            contentContainerStyle={{ padding: Sizes.fixPadding }}
            showsVerticalScrollIndicator={false}
          />
        }
        
      </Animated.View>
    )
  }

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