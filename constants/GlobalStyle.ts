import Colors from "./Colors";
import { StyleSheet } from "react-native";


export const globalStyles = StyleSheet.create({
  // screen
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal:16,
  },

  // Auth
  authContainerThema:{
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: Colors.primaryDark,
  },
  authCardContainer:{
    width: '100%',  
    flexDirection:'column',
    justifyContent: 'center',
    paddingHorizontal:16,
    paddingVertical: 24,
    borderRadius: 16,
  },
  logo: {
    width: 64,
    height: 64,
    marginHorizontal: 'auto',
  },


  // Text
  centerText:{
    textAlign: 'center', 
    marginVertical: 16,
  },
  titleText:{
    fontFamily:'Inter-Bold',
    fontSize: 20,
  },
  pText: {
    fontFamily:'Inter-Regular',
    fontSize: 16,
  },
  inputText:{
    fontFamily:'Inter-Regular',
    fontSize:16,
  },
  textSm:{
    fontFamily:'Inter-Regular',
    fontSize:14,
  },
  
  textWhite:{
    color: Colors.textWhite,
  },
  textBlack:{
    color: 'black',
  },
  textPrimary:{
    color: Colors.primary,
  },
  textSecondary:{
    color: Colors.secondary,
  },

  fontSemibold: {
    fontFamily:'Inter-SemiBold',
  },

  textUnderline:{
    textDecorationLine: 'underline',
    textDecorationColor: Colors.secondary,
  },


  // Form
  formContainer: {
    marginVertical: 16,
    gap: 24,
  },
  inputLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,   
  },
  borderWhite:{
    borderBottomWidth: 0.5,
    borderColor: Colors.white70,
  },


  // btn
  btnGroup:{
    marginVertical: 16,
    gap: 16,
  },

  // UI: Auth
  dividerDark:{
    width: '100%',
    marginVertical: 24,
    borderWidth: 0.5,
    borderColor: Colors.white70
  },
  divider:{
    width: '100%',
    marginVertical: 24,
    borderWidth: 0.5,
    borderColor: Colors.textGray
  },
  logoFullSize:{
    maxWidth: 380,
    width: '100%',
    height: 298,
    resizeMode: 'contain'
  },
})