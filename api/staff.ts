import { Alert, Platform } from "react-native";
import { Staffin_API } from "./API";
import { User } from "./user";
import * as FileSystem from 'expo-file-system';

export interface CVResponse {
  name: string;
  url: string;
}

// Generate CV
const generateCV = async (token: string): Promise<string> => {
  try {

    const response = await Staffin_API.post(
      '/Staff/Generate-CV', 
      {}, 
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'accept': '*/*', 
        }
      }
    );
    const { message, url } = response.data;

    console.log(message);  // "CV generated and saved."
    console.log(url);      // "https://staffin.clearq.se/Staff/Download-CV"

    return url; 
  } catch (error: any) {
    console.error("Error generating CV:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to generate CV");
  }
};

// Download CV
const downloadCV = async (token: string): Promise<void> => {
  try {
    const response = await Staffin_API.get('/Staff/Download-CV', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*',
      },
      responseType: 'blob', 
    });

    const fileData = response.data;

    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
      : 'StaffCV.pdf'; 

    const fileUri = FileSystem.documentDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, fileData, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Alert.alert('Success', `CV downloaded successfully to: ${fileUri}`);
    console.log('File saved to:', fileUri);
  } catch (error: any) {
    console.error('Error downloading CV:', error.response?.data || error.message);
    Alert.alert('Error', error.response?.data?.message || 'Failed to download CV');
    throw new Error(error.response?.data?.message || 'Failed to download CV');
  }
};


// Get CV
const getCV = async (token: string): Promise<CVResponse> => {
  try {
    const response = await Staffin_API.get<CVResponse>("/Staff/Get-CV", {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching CV:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch CV");
  }
};

// Update Staff
const updateStaff = async (userData: Partial<User>, token: string) => {
  try {
    const response = await Staffin_API.put("Staff/UpdateStaff", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Full response data:", response.data); 
    return response.data;
  } catch (error: any) {
    console.error("UpdateUser error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update user profile");
  }
};

export { generateCV, downloadCV, getCV, updateStaff };