import { IEducation, IExperience, ISkill, IUser } from "@/types/UserTypes";
import api from "./config";


// Update Staff
export const updateStaff = async (values: Partial<IUser>) => {
  try {
    const data = await api.put("/Staff/UpdateStaff", values );

    return data;

  } catch (error) {
    console.log(error);   
  }
};

// Get Staff Experience
export const getExperience = async () => {
  try {
    const { data } = await api.get("/Staff/StaffExperience-Get");

    return data
    
  } catch (error) {
    console.log(error)
  };  
};


// Add Staff Experience
export const addExperience = async (values:Partial<IExperience>) => {
  try {
    const data = await api.post("/Staff/StaffExperience-Add", values);

    return data;

  } catch(error:any){
    console.log(error);    
  }
};


// Update Staff Experience
export const updateExperience = async (id: number, values:Partial<IExperience>) => {
  try {
    const data = await api.put(`/Staff/StaffExperience-Update?experienceId=${id}`, values);

    return data;

  } catch(error){
    console.log(error);    
  }
};


// Delete Staff Experience
export const deleteExperience = async (id: number) => {
  try {
      await api.delete(`/Staff/StaffExperience-Remove?experienceId=${id}`);

  } catch (error) {
    console.log(error);  
  }
};



// Get Staff Education
export const getEducation = async () => {
  try {
    const { data } = await api.get("/Staff/GetStaff-Education");

    return data;
    
  } catch (error: any) {
    console.log(error);   
  }
};


// Add Staff Education
export const addEducation = async (values:Partial<IEducation>) => {
  try {
    const data = await api.post("/Staff/StaffEducation-Add", values)

    return data;

  } catch(error){
    console.log(error);   
  }
};


// Update Staff Education
export const updateEducation = async () => {
  
};


// Delete Staff Education
export const deleteEducation = async (id: number) => {
  try {
    await api.delete(`/Staff/StaffEducation-Remove?educationId=${id}`);
    
  } catch (error) {
    console.log(error);  
  }
};


// Get Staff Skills
export const getStaffSkills = async (id: number) => {
  try {
    const data = await api.get(`/Staff/GetStaff-Skills?staffId=${id}`);

    return data

  } catch (error) {
    console.log(error);    
  }
}


// Add Staff Skill
export const addStaffSkill = async (values: ISkill) => {
  try {
    const data = await api.post('/Staff/StaffSkills-Add', values);

    return data

  } catch (error) {
    console.log(error);
    
  }
}


// Remove Staff Skill
export const deleteStaffSkill = async (id: number) => {
  try {
    await api.delete(`/Staff/StaffSkills-Remove?skillId=${id}`)

  } catch (error) {
    console.log(error);   
  }
}


// Get Staff Language
export const getStaffLanguages = async (userId: number) => {
  try {
    const data = await api.get(`/Staff/GetStaff-Language?staffId=${userId}` )

    return data

  } catch (error) {
    console.log(error);
  }
}


// Rating (Update) Staff Language
export const updateStaffLanguage = async (values: any) => {
  try {
    const data = await api.put('/StaffLanguage-Rating', values);

    return data;

  } catch (error) {
    console.log(error);    
  }
}


// Add Staff Language
export const addStaffLanguage = async (values: any) => {
  try {
    const data = await api.post('/Staff/AddStaff-Language', values);

    return data;

  } catch (error) {
    console.log(error);   
  }
}


// Remove Staff Language
export const deleteStaffLanguage = async (values: any) => {
  try {
    await api.delete('/Staff/StaffLanguage-Remove')

  } catch (error: any) {
    console.log(error);
    
  }
}