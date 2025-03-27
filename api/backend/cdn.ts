import { CDN_PASSWORD, CDN_USERNAME } from "@/constants/key";
import axios from "axios";

export const baseURL = process.env.EXPO_PUBLIC_CDN_API_URL

const api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Action for CDN
 */

export const autoLoginToCDN = async () => {
  try {
    console.log("Attempting CDN login...");
    const response = await api.post(`/auth/login`, {
      username: CDN_USERNAME,
      password: CDN_PASSWORD,
    });

    console.log("Login response:", response.data);

    const token = response.data;
    if (!token) {
      throw new Error("CDN login failed: Missing token.");
    }

    localStorage.setItem("cdnToken", token);
    console.log("Token successfully saved:", token);

    return token;
  } catch (error) {
    console.error("CDN login failed:", error);
    throw error;
  }
};


export const updateProfileImage = async (userId: number, profileImage: string) => {
  try {
    const response = await api.put(`/User/update-ProfileImage`, {
      id: userId,
      profileImage,
    });

    console.log("Profile image updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
};

export const uploadContentImage = async (key: string, file: any, token: string, userId: number, contentFolder: any) => {
  console.log("uploadFile function called");
  console.log("Parameters:", { key, file, token, userId, contentFolder });

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post(
      `/content/${userId}/${contentFolder}/${key}`,
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

export const getContentImage = async (key: string, token: string, userId: number, contentFolder: any) => {
  try {
    const response = await api.get(
      `/content/${userId}/${contentFolder}/${key}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};


export const getPublicFile = async (key: string, userId: number, contentFolder: any) => {
  try {
    const response = await api.get(
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
    const response = await api.delete(
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

export const invalidateCache = async (
  pattern: any,
  token: string,
  userId: number,
  contentFolder: any
) => {
  try {
    const response = await api.delete(
      `/content/pattern/${userId}/${contentFolder}/${pattern}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error invalidating cache:", error);
    throw error;
  }
};