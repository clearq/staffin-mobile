import React,{ Children, createContext, useContext, useEffect, useState } from "react";
import { View, Text } from 'react-native'
import { useAuth } from "./authContext";

export interface IActiveUser {
  userType: "company" | "owner" | null 
}

interface Props {
  children: React.ReactNode
}

interface UserTypeContext {
  userType: "company"|"owner"| null
  setActiveUserState: React.Dispatch<React.SetStateAction<IActiveUser>>
}

const UserTypeContext = createContext<UserTypeContext>({
  userType: null,
  setActiveUserState: () => {}
})


export const useUserType = () => {
  const context = useContext(UserTypeContext)

  if(!context) {
    console.error('Error: User type does not find');
  }

  return context
}

export const UserTypeProvider: React.FC<Props> = ({ children }) => {

  const {authState: {userData, userId}} = useAuth()
  
  const values = {
    userType: null,
    setActiveUserState: () => {}
  }
  
  useEffect(() => {
    
  },[])
  

  return (
    <UserTypeContext.Provider
      value={values}
    >
      {children}
    </UserTypeContext.Provider>
  )
}