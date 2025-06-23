import { autoLoginToCDN, getContentFile } from "@/api/backend";
import avatarSkeleton from "../assets/image/avatarSkeleton.jpeg"
import { IUser } from "@/types";
import { getItem } from "./asyncStorage";
import { CDN_TOKEN } from "@/constants/key";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImageManipulator from 'expo-image-manipulator';
import { string } from "yup";

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


export const fetchImageFromCDN = async ({
  userId,
  contentFolder,
  key,
}: {
  userId: number;
  contentFolder: "profile" | "posts_images";
  key: string;
}) => {
  if (!userId || !key) {
    console.error("Missing required parameters for fetching file.");
    return "";
  }

  try {
    let token = await getItem(CDN_TOKEN);
    if (!token) {
      token = await autoLoginToCDN();
    }

    const file = await getContentFile(key, token, userId, contentFolder);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    const localUri = await new Promise<string>((resolve, reject) => {
      fileReader.onloadend = () => resolve(fileReader.result as string);
      fileReader.onerror = reject;
    });

    const manipResult = await ImageManipulator.manipulateAsync(
      localUri,
      [{ resize: { width: 300 } }],
      {
        compress: 1,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    return manipResult.uri;
  } catch (error) {
    console.error("Error fetching file from CDN:", error, 'user:', userId, 'key:', key);
    return "";
  }
};

