import { ISkill, IUser } from "@/types/UserTypes";
import api from "./config";

// Get All Skills List
export const getSkillsList = async () => {
  try {
    return await api.get("/Skills")
  } catch (error) {
    console.log(error)
  }
}
