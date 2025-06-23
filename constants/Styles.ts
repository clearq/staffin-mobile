import { StyleSheet } from "react-native"
import { Sizes, theme } from "./Theme"
import { darkColors } from "@rneui/themed"

const pageStyle = StyleSheet.create({
  pageComponent:{
    flex:1,
    paddingHorizontal:Sizes.fixPadding,
  },
  headline01:{
    fontFamily: "Coolvetica",
    fontSize: 24,
  },
  headline02:{
    fontFamily: "Coolvetica",
    fontSize: 20,
  },
  headline03:{
    fontFamily: "Coolvetica",
    fontSize: 16,
  },
  button20:{
    fontFamily: "Coolvetica",
    fontSize: 20,
  },
  button16:{
    fontFamily: "Coolvetica",
    fontSize: 16,
  },
  smText:{
    fontFamily: "InterRegular",
    fontSize: 12,
  },
  xsText: {
    fontFamily: "InterRegular",
    fontSize: 10,
  },
  inputText: {
    fontFamily: "InterRegular",
    fontSize: 16,
  },
  paraText: {
    fontFamily: "InterRegular",
    fontSize: 14
  },
  inputLabel: {
    fontFamily: "InterRegular",
    fontSize: 12,
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
  inputBox: {
    paddingHorizontal: Sizes.fixPadding,
    // paddingVertical: Sizes.fixPadding,
    borderRadius: theme.spacing?.sm,
    // marginBottom: theme.spacing?.xs,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%", 
    height: 48,
    alignItems: 'center'
  },
  multilineInputBox: {
    paddingHorizontal: Sizes.fixPadding,
    //paddingVertical: Sizes.fixPadding,
    borderRadius: theme.spacing?.sm,
    marginBottom: theme.spacing?.xs,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%", 
    height: 150,
    alignItems: 'flex-start'
  },
  buttonGroup:{
    flexDirection: 'row',
    gap: theme.spacing?.md,
    width: '100%',
    marginTop: theme.spacing?.xl,
    marginBottom: theme.spacing?.lg,
  },
  // buttonContainer: {
  //   flex: 1,
  //   height: "100%",
  //   paddingHorizontal: 0,
  //   //borderWidth: 2
  // },
  // buttonBorder: {
  //   borderWidth: 2
  // },
  dropdown: {
    position: "absolute",
    top: '100%',
    left: 0,
    width: "100%",
    maxHeight: 200,
    borderWidth: 1,
    borderRadius: theme.spacing?.md,
    zIndex: 9999,
    elevation: 5
  },
  suggestionItem: {
    padding: theme.spacing?.sm,
  },
  cardPrimaryColor: {
    backgroundColor: "rgb(213, 213, 235)"
  },
  cardThemeColor: {
    backgroundColor: theme.mode === "light" ? theme.lightColors?.white : theme.darkColors?.black
  },
  cardTextPrimaryColor: {
    color: theme.mode === "light" ? theme.lightColors?.secondary : theme.darkColors?.secondary
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  likeColor: {
    backgroundColor: "rgb(255, 45, 85)",
  }
})

export default pageStyle