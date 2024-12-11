import { Staffin_API } from "./API";

export interface User {
  id: number;
  title: string | null;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  profileImage: string | null;
  phoneNumber: string;
  about: string | null;
  roleId: number;
  companyId?: number;
  companyName?: string;
  educations?: any[];
  skills?: any[];
  languages?: any[];
  experience?: any[];
}

// Get User Info
const getUser = async (userId: number): Promise<User> => {
  try {
    const response = await Staffin_API.get<User>(`/User/GetUser-id?userId=${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("GetUser error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch current user");
  }
};

export { 
  getUser
}