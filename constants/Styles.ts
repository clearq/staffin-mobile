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
  inputLabel: {
    fontFamily: "Coolvetica",
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
  inputBox: {
    paddingHorizontal: Sizes.fixPadding,
    //paddingVertical: Sizes.fixPadding,
    borderRadius: theme.spacing?.sm,
    marginBottom: theme.spacing?.xs,
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
  buttonContainer: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 0,
  },
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
})

export default pageStyle