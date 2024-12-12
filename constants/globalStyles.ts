import { colors } from "./colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  // container
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  btnGroup:{
    marginVertical: 16,
    gap: 16,
  },

  //padding
  paddingX:{
    paddingHorizontal:16,
  },

  //Text
  titleText:{
    fontFamily:'Inter-Bold',
    fontSize:24,
  },
  subTitleText:{
    fontFamily:'Inter-SemiBold',
    fontSize:18,
  },

  // logo-image
  logoFullSize:{
    maxWidth: 380,
    width: '100%',
    height: 298,
    resizeMode: 'contain'
  },
})