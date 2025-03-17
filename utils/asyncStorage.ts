import * as SecureStore from "expo-secure-store";

export const setItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log("Error storing value: ", error);
  }
};

export const getItem = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error retrieving value: ", error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error deleting value: ", error);
  }
};