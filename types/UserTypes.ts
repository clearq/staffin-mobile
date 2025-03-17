import * as Location from "expo-location"

export interface IUser {
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
  educations?: IEducation[];
  skills?: ISkill[];
  languages?: ILanguage[];
  experience?: IExperience[];
}


export interface IExperience {
  id?: number;
  position: string;
  description: string;
  companyName: string;
  location: string;
  startDate: string; // ISO 8601 format
  endDate?: string | null; // ISO 8601 format
}

export interface ILanguage {
  id: number
  name: string 
  rating: number;
}

export interface IEducation {
  id: number;
  name: string;
  institution: string;
  startDate: string;
  endDate?: string | null; // ISO 8601 format
  staffId: number // ISO 8601 format
}

export interface ISkill {
  id: number
  name: string
}
