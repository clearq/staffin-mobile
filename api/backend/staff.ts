import { IEducation, IExperience, IRating, ISkill, IUser } from "@/types";
import api from "./config";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";


// Update Staff
export const updateStaff = async (values: Partial<IUser>) => {
  try {
    const data = await api.put("/Staff/UpdateStaff", values );

    return data;

  } catch (error) {
    console.error('updateStaff', error);   
  }
};

// Get Staff Experience
export const getExperience = async () => {
  try {
    const { data } = await api.get("/Staff/StaffExperience-Get");

    return data
    
  } catch (error) {
    console.error(error)
  };  
};


// Add Staff Experience
export const addExperience = async (values:Partial<IExperience>) => {
  try {
    const data = await api.post("/Staff/StaffExperience-Add", values);

    return data;

  } catch(error:any){
    console.error(error);    
  }
};


// Update Staff Experience
export const updateExperience = async (id: number, values:Partial<IExperience>) => {
  try {
    const data = await api.put(`/Staff/StaffExperience-Update?experienceId=${id}`, values);

    return data;

  } catch(error){
    console.error(error);    
  }
};


// Delete Staff Experience
export const deleteExperience = async (id: number) => {
  try {
      await api.delete(`/Staff/StaffExperience-Remove?experienceId=${id}`);

  } catch (error) {
    console.error(error);  
  }
};



// Get Staff Education
export const getEducation = async () => {
  try {
    const { data } = await api.get("/Staff/GetStaff-Education");

    return data;
    
  } catch (error: any) {
    console.error(error);   
  }
};


// Add Staff Education
export const addEducation = async (values:Partial<IEducation>) => {
  try {
    const data = await api.post("/Staff/StaffEducation-Add", values)

    return data;

  } catch(error){
    console.error(error);   
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
    console.error(error);  
  }
};


// Get Staff Skills
export const getStaffSkills = async (id: number) => {
  try {
    const data = await api.get(`/Staff/GetStaff-Skills?staffId=${id}`);

    return data

  } catch (error) {
    console.error(error);    
  }
}


// Add Staff Skill
export const addStaffSkill = async (values: ISkill) => {
  try {
    const data = await api.post('/Staff/StaffSkills-Add', values);

    return data

  } catch (error) {
    console.error(error);
    
  }
}


// Remove Staff Skill
export const deleteStaffSkill = async (id: number) => {
  try {
    await api.delete(`/Staff/StaffSkills-Remove?skillId=${id}`)

  } catch (error) {
    console.error(error);   
  }
}

// Get Staff All languages
export const getStaffAllLanguages = async () => {
  try {
    const response = await api.get(`/Staff/AllLanguages`)

    return response.data
  } catch (error) {
    console.error(error);
    return
  }
}


// Get Staff Language
export const getStaffLanguages = async (userId: number) => {
  try {
    const response = await api.get(`/Staff/GetStaff-Language?staffId=${userId}` )

    return response.data

  } catch (error) {
    console.error(error);
    return
  }
}


// Rating (Update) Staff Language
export const updateStaffLanguage = async (values:IRating) => {
  try {
    const data = await api.put('/Staff/StaffLanguage-Rating', values);

    return data;

  } catch (error) {
    console.error(error);    
  }
}


// Add Staff Language
export const addStaffLanguage = async (values: any) => {
  try {
    const data = await api.post('/Staff/AddStaff-Language', values);

    return data;

  } catch (error) {
    console.error(error);   
  }
}


// Remove Staff Language
export const deleteStaffLanguage = async (values: any) => {
  try {
    await api.delete('/Staff/StaffLanguage-Remove', {
      data: values
    } )

  } catch (error: any) {
    console.error(error);   
  }
}

export const generateCv = async () => {
  try {
    const response = await api.post('/Staff/Generate-CV');
    return response.data;

  } catch (error) {
    console.error(error)
  }
}

export const getCv = async () => {
  try {
    const response = await api.get('/Staff/Get-CV');

    return response.data; 

  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
}

export const downloadCv = async () => {
  try {
    const response = await api.get("/Staff/Download-CV", {
      responseType: "blob", // or "arraybuffer" based on API response format
    });
    
    // Convert blob to base64 (Required for React Native)
    const reader = new FileReader();
    reader.readAsDataURL(response.data);
    reader.onloadend = async () => {
      if (!reader.result || typeof reader.result !== "string") {
        console.error("Error", "Failed to process the CV file.");
        return;
      }

      const base64Data = reader.result.split(",")[1]; // Extract base64 string

      // Define file path
      const fileUri = `${FileSystem.documentDirectory}StaffCV.pdf`;

      // Write file
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        console.log("Download Complete", "CV has been saved in the app's storage.");
      }
    };
  } catch (error) {
    console.error(error);
  }
}

export const postNewApplication = async (values: {jobId: number}) => {
  try {
    const response = await api.post(`/Staff/New-Application`, values)

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getMyApplications = async () => {
  try {
    const { data } = await api.get(`/Staff/GetMyApplications`)

    return data
  } catch (error) {
    console.error(error)
    return []
  }
}