import { StyleSheet } from "react-native"
import { Sizes, theme } from "./Theme"

const pageStyle = StyleSheet.create({
  pageComponent:{
    flex:1,
    padding:Sizes.fixPadding,
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
    fontFamily: "Coolvetica",
    fontSize: 14,
  },
  xsText: {
    fontFamily: "Coolvetica",
    fontSize: 10,
  },
  inputText: {
    fontFamily: "Coolvetica",
    fontSize: 16,
    letterSpacing: 1
  },
})

export default pageStyle