import { colors } from "./Colors";
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
  paddingY:{
    paddingVertical:16,
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
  smText:{
    fontFamily: 'Inter-Regular',
    fontSize:12,
  },

  // logo-image
  logoFullSize:{
    maxWidth: 380,
    width: '100%',
    height: 298,
    resizeMode: 'contain'
  },

  // Button
  btnBlack:{
    backgroundColor:colors.black,
    borderColor:colors.black
  },
  btnWhite:{
    backgroundColor:colors.white,
    borderColor:colors.white
  },
  btnOrange:{
    backgroundColor:colors.secondary,
    borderColor:colors.secondary,
  },
  btnBlue:{
    backgroundColor:colors.primary,
    borderColor:colors.primary
  },
  btnOutlineWhite:{
    borderColor:colors.white,
    borderWidth:1
  },
  btnOutlineBlue:{
    borderColor:colors.primary,
    borderWidth:1,
  },
  iconButtonBlack: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.black, 
    borderRadius:8,
    paddingHorizontal:8,
    height:32,
    flexShrink:2,
  },
  iconButtonOutlineBlack: {
    justifyContent:'center',
    alignItems:'center',
    borderColor:colors.black, 
    borderWidth:1,
    borderRadius:8,
    paddingHorizontal:8,
    height:32,
    flexShrink:2,
  },
})
