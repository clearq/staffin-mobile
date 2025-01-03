import { Alert } from "react-native";
import { api } from "./API";
import { LanguageData, SkillData } from "./skill";

export interface User {
  id: number;
  title?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  profileImage?: string;
  phoneNumber?: string;
  about?: string;
  roleId: number;
  companyId?: number;
  companyName?: string;
  educations?: Education[];
  skills?: SkillData[];
  languages?: StaffLanguage[];
  experience?: Experience[];
}

interface Experience {
  id: number;
  position: string;
  description: string;
  companyName: string;
  location: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
}

export interface StaffLanguage {
  id: number
  name: string 
  rating: number;
}

interface Education {
  id: number;
  name: string;
  institution: string;
  startDate: string;
  endDate: string; // ISO 8601 format
  staffId: number // ISO 8601 format
}

// Get User Info
const getUser = async (userId: number) => {
  try {
    const response = await api.get(`/User/GetUser-id?userId=${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("GetUser error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch current user");
  }
};



// CDN

// Update profile image
const updateProfileImage = async (token:string) => {

}

export { 
  getUser,
  updateProfileImage
}