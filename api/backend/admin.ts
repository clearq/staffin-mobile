import { IAdmin } from "@/types";
import api from "./config";


// Update Admin Profile
export const updateAdminProfile = async (values:Partial<IAdmin>) => {
  try {
    const data = await api.put(`/Admin/Update-AdminProfile`, values)

    return data
  } catch (error) {
    console.error(error)
  }
}