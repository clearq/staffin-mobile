import { CDN_PASSWORD, CDN_TOKEN, CDN_USERNAME } from "@/constants/key";
import { setItem } from "@/utils/asyncStorage";
import axios from "axios";

export const baseURL = process.env.EXPO_PUBLIC_CDN_API_URL

const cdn_api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Action for CDN
 */


export const autoLoginToCDN = async () => {
  try {   
    const response = await cdn_api.post(`/Auth/Login`, {
      username: CDN_USERNAME,
      password: CDN_PASSWORD,
    });
    const cdnToken = response.data;

    if (!cdnToken) {
      throw new Error("CDN login failed: Missing cdnToken.");
    }

    // localStorage.setItem(CDN_TOKEN, cdnToken);
    setItem(CDN_TOKEN, cdnToken) // use AsyncStrage instead of LocalStrage

    return cdnToken;
  } catch (error) {
    console.error("CDN login failed:", error);
    throw error;
  }
};


export const updateProfileImage = async (userId: number, profileImage: string) => {
  try {
    const response = await cdn_api.put(`/User/update-ProfileImage`, {
      id: userId,
      profileImage,
    });

    console.log("Profile image updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error( '[profile image] ', error, ':', userId);
    throw error;
  }
};


export const uploadContentFile = async (key: string, file: any, token: any, userId: number, contentFolder: any) => {
  const formData = new FormData();
  const fileUri = file.uri;
  const fileName = file.fileName
  const fileType = file.mimeType

  try {
    const res = await (fetch(fileUri));
    const blob = await res.blob();
    
    formData.append("file", {
      uri: fileUri,
      type: fileType,
      name: fileName,
    } as any);
    
    // console.log('blob:', blob);
    // console.log('form data:', formData);
    
    const response = await cdn_api.post(
      `/Content/${userId}/${contentFolder}/${key}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};


export const getContentFile = async (key: string, token: any, userId: number, contentFolder: any) => {
  try {
    const response = await cdn_api.get(
      `/content/${userId}/${contentFolder}/${key}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching file:", error, 'user:', userId);
    throw error;
  }
};


export const getPublicFile = async (key: string, userId: number, contentFolder: any) => {
  try {
    const response = await cdn_api.get(
      `/public/${userId}/${contentFolder}/${key}`,
      {
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching public file:", error);
    throw error;
  }
};


export const deleteContentFile = async (
  key: string, 
  token: string, 
  userId: number, 
  contentFolder: any
) => {
  try {
    const response = await cdn_api.delete(
      `/content/${userId}/${contentFolder}/${key}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

// export const invalidateCache = async (
//   pattern: any,
//   token: string,
//   userId: number,
//   contentFolder: any
// ) => {
//   try {
//     const response = await cdn_api.delete(
//       `/content/pattern/${userId}/${contentFolder}/${pattern}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error invalidating cache:", error);
//     throw error;
//   }
// };