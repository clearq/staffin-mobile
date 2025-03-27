import { autoLoginToCDN, getContentImage } from "@/api/backend";
import avatarSkeleton from "@/assets/Images/avatarSkeleton.jpeg"
import { IUser } from "@/types/UserTypes";



export const getImageUrl = (key: string, userId: string, contentFolder: any) => {
  if (!key || !userId || !contentFolder) {
    console.error("Invalid parameters for getImageUrl:", {
      key,
      userId,
      contentFolder,
    });
    return avatarSkeleton.src;
  }

  console.log(userId);

  const url = `https://staffin-cdn.clearq.se/api/public/${userId}/${contentFolder}/${key}`;
  console.log("Generated CDN URL:", url);
  return url;
};


export const fetchImageFromCDN = async (user: IUser) => {
  const userId = user?.id;
  const contentFolder = "profile";
  const key = user?.profileImage;

  if (!userId || !key) {
    console.error("Missing required parameters for fetching file.");
    return avatarSkeleton.src;
  }

  try {
    const token = localStorage.getItem("cdnToken") || (await autoLoginToCDN());
    console.log("Fetching file with key:", key);
    const file = await getContentImage(key, token, userId, contentFolder);
    const fileUrl = URL.createObjectURL(file);
    console.log("Generated Blob URL:", fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Error fetching file from CDN:", error);
    return avatarSkeleton.src;
  }
};