import { autoLoginToCDN, getContentFile } from "@/api/backend";
import avatarSkeleton from "../assets/Images/avatarSkeleton.jpeg"
import { IUser } from "@/types/UserTypes";
import { getItem } from "./asyncStorage";
import { CDN_TOKEN } from "@/constants/key";
import * as ImageManipulator from 'expo-image-manipulator';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const baseURL = process.env.EXPO_PUBLIC_CDN_API_URL


export const getImageUrl = (key: string, userId: number, contentFolder: any) => {
  if (!key || !userId || !contentFolder) {
    console.error("Invalid parameters for getImageUrl:", {
      key,
      userId,
      contentFolder,
    });
    return avatarSkeleton.src;
  }

  console.log(userId);

  const url = `${baseURL}/api/public/${userId}/${contentFolder}/${key}`;
  console.log("Generated CDN URL:", url);
  return url;
};


export const fetchImageFromCDN = async (user: IUser) => {
  console.log('cdn action', user.id);
  
  const userId = user?.id;
  const contentFolder = "profile";
  const key = user?.profileImage;

  if (!userId || !key) {
    console.error("Missing required parameters for fetching file.");
    return "";
  }

  try {
   
    let token = await getItem(CDN_TOKEN);
    if (!token) {
      token = await autoLoginToCDN()
    }
    const file = await getContentFile(key, token, userId, contentFolder); 

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    
    const localUri = await new Promise<string>((resolve, reject) => {
      fileReader.onloadend = () => resolve(fileReader.result as string); 
      fileReader.onerror = reject;
    });
    
    
    // Save to local file system
    /**
     * 🚧 Keep Using 'manipulateAsync' Until a New API is Available 🚧
     */
    const manipResult = await ImageManipulator.manipulateAsync(
      localUri, // URI of the image (base64 or file path)
      [
        { resize: { width: 300 } }, // Resize action (resize to width of 300px)
      ],
      {
        compress: 1, // No compression (highest quality)
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    return manipResult.uri;

  } catch (error) {
    console.error("Error fetching file from CDN:", error);
    
    return "";
  }
};

