import api from "./config";

// Get user by id
export const getUserById = async (userId: string) => {
  try{
    const { data } = await api.get(`/User/GetUser-id?userId=${userId}`);

    return data;
  } catch (error) {
    console.log(error);    
  }
}

