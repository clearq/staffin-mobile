import { CDN_PASSWORD, CDN_USERNAME } from "@/constants/key";
import api from "./config";
import { values } from "lodash";
import { IPreference } from "@/types/UserTypes";



// Get user by id
export const getUserById = async (userId: any) => {
  try{
    const { data } = await api.get(`/User/GetUser-id?userId=${userId}`);

    return data;
  } catch (error) {
    console.error('[getUserById]',error, userId);    
  }
}

export const updateUserProfileImage = async ({imageData, userId}:{imageData: string, userId: number}) => {
  console.log("Updating profile image in database...");
  console.log('imageData', imageData, 'userid', userId);
  
  try {
    const response = await api.put(`/User/update-profileImage`, {
      profileImage: imageData,
      userId: userId
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
    console.error('getPreferredCities', error)
    return []
  }
}

export const deletePreferredCity = async (cityId: number) => {
  try {
    const response = await api.delete(`/User/DeletePreferredCity?cityId=${cityId}`)

    return response
  } catch (error) {
    console.error('deletePreferredCity:',error)
  }
}

export const getAllCities = async () => {
  try {
    const {data} = await api.get(`/User/GetAllCities`)
  
    return data
  } catch (error) {
    console.error('getAllCities', error)
  }
}

export const updateProfessionArea = async (id: number[]) => {
  try {
    const response = await api.put(`/User/UpdateProfessionArea`, {
      professionAreaId: id
    })
    
    return response.data
  } catch (error) {
    console.error('updateProfessionArea', error)
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
    console.error('getUserPreferences:', error)
  }
}

export const getPreferenceOptions = async () => {
  try {
    const {data} = await api.get(`/User/GetPreferenceOptions`)

    return data
  } catch (error) {
    console.error('getPreferenceOptions', error)
  }
}

export const getWorkProfileOptions = async () => {

}

export const getSuggestedUsers = async () => {
  try {
    const {data} = await api.get(`/User/GetSuggestedUsers`)

    return data
  } catch (error) {
    console.error('get suggested users:', error);
    
  }
}

export const checkOnBoardingStatus = async (userId: number) => {
  try {
    const response = await api.post(`/User/CheckOnBoardingStatus?userId=${userId}`)

    return response.data
  } catch (error) {
    console.error('[checkOnBoardingStatus]', error, userId);
    
  }
}
