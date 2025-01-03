import { api } from "./API";

export interface LanguageData {
  id: number
  name: string
}

export interface SkillData {
  id: number
  name: string
}

/**
 * Languages
 */
// Get All Languages
const getAllLanguages = async () => {
  try {
    const response = await api.get('/Staff/AllLanguages')

    return response.data
  } catch (error:any) {
    console.error("Error:", error.response?.data || error.message);
  }
}


/**
 * Skills
 */

export {
  getAllLanguages,
}