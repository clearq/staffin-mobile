import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";

import api from "@/api/backend/config"

import { useStorageState } from "@/utils/useStorageState";
import { removeItem, setItem } from "@/utils/asyncStorage";
import { AUTH_TOKEN, CDN_TOKEN, USER_ID } from "@/constants/key";
import { jwtDecode } from "jwt-decode";

import { IUser } from "@/types/UserTypes"
import { AxiosError } from "axios";
import { getItem } from "expo-secure-store";
import { getUserById } from "@/api/backend";
import { useTranslation } from "react-i18next";
import { setProfileImage } from "@/store/slice/userSlice";
import { useDispatch } from "react-redux";
import { fetchImageFromCDN } from "@/utils/CDN-action";


export interface IAuthState {
  userData: IUser | null;
  userId: string | null;
  token: string | null;
  profileImage: string 
}

export interface IAuthInfo {
  email: string;
  password: string;
  userName?: string;
  companyName?: string;
  organisationNumber?: string;
}

export interface TokenPayload {
  userId: string;
  username: string;
  roleId: string;
  // Include other token payload properties that you might use
  exp?: number; // Optional expiration field, commonly included in tokens
  iat?: number; // Issue at timestamp
}

interface IAuthContext {
  SignIn: ({email, password}: IAuthInfo) => Promise<void>;
  SignUp: (role: "staff" | "admin", data: IAuthInfo) => Promise<void>;
  SignOut: () => Promise<void>;
  authState: IAuthState;
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
  session?: string | null;
  isLoading: boolean;
  loadingLocation: boolean;
  setLoadingLocation: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<IAuthContext>({
  SignIn: async () => {
    return Promise.resolve();
  },
  SignUp: async () => {
    return Promise.resolve();
  },
  SignOut: async () => {
    return Promise.resolve();
  },
  authState: {
    userData: null,
    userId: null,
    token: null,
    profileImage: "",
  },
  setAuthState: () => { },
  session: null,
  isLoading: false,
  loadingLocation: false,
  setLoadingLocation: () => null,
});

export function useAuth() {
  const value = React.useContext<IAuthContext>(AuthContext);
  if(!value) {
    throw new Error("useAuth must be wrapped in a <AuthProvider />")
  }
  return value
}


export function AuthProvider (props: any) {
  const toast = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(false);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
  const [[isLoading, session], setSession] = useStorageState(AUTH_TOKEN);
  const [authState, setAuthState] = useState<IAuthState>({
    userId: null,
    userData: null,
    token: null,
    profileImage: "",
  });

  const initializeAuth = async () => {
    // console.log("✅start initializeAuth"); 
    setIsLoadingSession(true);
    try {
      const token = await getItem(AUTH_TOKEN);

      if (token) {
        // console.log("✅initializeAuth-token", token); 
  
        const decoded: TokenPayload = jwtDecode<TokenPayload>(token);
        // console.log("✅Decoded token:", decoded); 

        let response;
      
        try {
          response = await getUserById(decoded.userId);
          // console.log("✅getUserById response:", response); 
        } catch (err) {
          console.error("Error fetching user data:", err);
          throw new Error("Failed to fetch user data");
        }
  
        if (response && response.id) { 
          
          let imageUrl
          if(response && response.profileImage) {
            imageUrl = await fetchImageFromCDN(response)
          } else {
            imageUrl = ""
          }
          setAuthState({
            userData: response,
            userId: response.id,
            token,
            profileImage: imageUrl
          });
          setSession(token);
  
          router.replace("/");
        } else {
          throw new Error("User data not found or invalid response");
        }
      } else {
        router.replace("/sign-in");
      }
    } catch (error) {
      console.error("Initialization error:", error);
      await handleSignOut();
    } finally {
      setIsLoadingSession(false);
    }
  };


  const SignIn = async ({ email, password }: IAuthInfo) => {
    setIsLoadingSession(true);
    try {

      const response = await api.post(
        `/Auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );  
      // console.log("Login response:", response.data);      
      const { token, id } = response.data;
      
      if (token) {
        setAuthState({
          userData: null,
          userId: id,
          token: token,
          profileImage: ""
        });
        setSession(token);
        // console.log('session:', session)
        // console.log('token:', token); 
        toast.show(`${t("log-in-successful-message")}`, {
          type: "success",
          placement: "top",
          duration: 3000,
        });
      
        router.replace("/");

      } else {
        throw new Error("Invalid login response");
      }
  
    } catch (error: unknown) {
      const err = error as AxiosError
      toast.show(
        `${err as AxiosError}.response?.data?.title`,
        {type: "error"}
      );

    } finally {
      setIsLoadingSession(false);
    }
  };

  const SignUp = async (role: "staff" | "admin", data: IAuthInfo) => {
    setIsLoadingSession(true);
    try {

      const response = await api.post(`/Auth/register/${role}`, data, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("SignUp response:", response.data);
  
      const { token, id } = response.data;
      if (token) {
        setAuthState({
          userData: null,
          userId: id,
          token,
          profileImage: ""
        });
        setSession(token);
  
        toast.show(`${t("sign-up-successful-message")}`, {
          type: "success",
          placement: "top",
          duration: 3000,
        });
  
        router.replace("/");
      } else {
        throw new Error("Invalid sign-up response");
      }
    } catch (error: unknown) {
      const err = error as AxiosError;
      //console.log("SignUp error response:", err.response?.data); // ✅
      toast.show(
        `${err as AxiosError}.response?.data?.title`,
        {type: 'error'}
      );
    } finally {
      setIsLoadingSession(false);
    }
  };

  useEffect(() => {
    if (authState.token) {
      initializeAuth();
    }
  }, [authState.token]); 

  async function handleSignOut() {
    setAuthState({
      userData: null,
      userId: null,
      token: null,
      profileImage: ""
    });
    setSession(null);
    await removeItem(AUTH_TOKEN);
    await removeItem(USER_ID)
    await removeItem(CDN_TOKEN)
    router.replace("/signin")
    console.log('--- log out ---');
    
  }

  const values = {
    SignIn,
    SignUp,
    SignOut: handleSignOut,
    authState,
    setAuthState,
    session,
    isLoading: isLoadingSession,
    loadingLocation,
    setLoadingLocation,
  }

  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
} 
