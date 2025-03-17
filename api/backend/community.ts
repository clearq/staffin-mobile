import api from "./config";

// Get users posts and shares
export const getUserPostsAndShares = async (userId: string) => {
  try {
    const { data } = await api.get(
      `/Community/GetUserPostsAndShares?userId=${userId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};