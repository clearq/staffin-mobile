import { ISkill, IUser } from "@/types/UserTypes";
import api from "./config";

// Get All Skills List
export const getSkillsList = async () => {
  try {
    const response = await api.get("/Skill")

    return response.data
  } catch (error) {
    console.log(error)
    return 
  }
}
