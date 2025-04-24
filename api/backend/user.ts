import { CDN_PASSWORD, CDN_USERNAME } from "@/constants/key";
import api from "./config";
import { values } from "lodash";
import { IPreference } from "@/types/UserTypes";



// Get user by id
export const getUserById = async (userId: string) => {
  try{
    const { data } = await api.get(`/User/GetUser-id?userId=${userId}`);

    return data;
  } catch (error) {
    console.error(error);    
  }
}

export const updateUserProfileImage = async (imageData: string) => {
  console.log("Updating profile image in database...");
  
  try {
    const response = await api.put(`/User/update-profileImage`, {
      profileImage: imageData
    })
    //console.log('response:', response);
    
    console.log("Profile image updated in database.");
    return response
  } catch (error){
    console.error(error);
  }
}

export const changePassword = async (values: any) => {
  try {
    const response = await api.put(`/User/Change-password`, values)

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getUserLocation = async () => {
  try {
    const {data} = await api.get(`/GetUserLocation`)
  } catch (error) {
    console.error(error)
  }
}

export const deleteMyLocation = async (locationId: number, userId: number) => {
  try {
    return await api.delete(`/User/DeleteMyLocation?locationId=${locationId}&userId=${userId}`)
  } catch (error) {
    console.error(error)
  }
}

export const addPreferredCity = async (id: number) => {
  try {
    const response = await api.post(`/User/AddPreferredCity`, {
      cityId: id
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getPreferredCities = async () => {
  try {
    const {data} = await api.get(`/User/GetPreferredCities`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const deletePreferredCity = async (cityId: number) => {
  try {
    const response = await api.delete(`/User/DeletePreferredCity?cityId=${cityId}`)

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getAllCities = async () => {
  try {
    const {data} = await api.get(`/User/GetAllCities`)
  
    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateProfessionArea = async (values: any) => {
  try {
    const response = await api.put(`/User/UpdateProfessionArea`, values)
    
    return response
  } catch (error) {
    console.error(error)
  }
}

export const setUserPreferences = async (values: IPreference) => {
  try {
    const response = await api.post(`/User/SetUserPreferences`, values)

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getUserPreferences = async () => {
  try {
    const {data} = await api.get(`/User/GetUserPreferences`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPreferenceOptions = async () => {
  try {
    const {data} = await api.get(`/User/GetPreferenceOptions`)

    return data
  } catch (error) {
    console.error(error)
  }
}