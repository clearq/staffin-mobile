import { CDN_PASSWORD, CDN_USERNAME } from "@/constants/key";
import api from "./config";



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


