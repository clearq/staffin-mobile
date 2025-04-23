import api from "./config";


export const getAllJobs = async () => {
    try{
      const {data} = await api.get(`/Job/GetAll-Jobs`);
      // console.log(data);
        
      return data;
    } catch (error) {
      console.error(error);    
    }
  }

// Get Archived Jobs - Admin or Employer  
export const getArchivedJobs = async () => {
  try {
    const {data} = await api.get(`/Job/GetArchivedJobs`)
    return data
  } catch (error) {
    console.error(error);
  }
}

// Get all public jobs
export const getAllJobsPublic = async () => {
  try {
      const {data} = await api.get(`/Job/GetAll-JobPublic`)
  return data
  } catch (error) {
    console.error(error)
  }
}

// Get All jobs for the admin's company
export const getAllJobsAdmin = async () => {
  try {
    const {data} = await api.get(`/Job/GetAllJobs-Admin`)
    return data
  } catch (error) {
    console.error(error)
  }
}
 
// Get matching jobs for staff
export const getMatchingJobs = async () => {
  try {
    const {data} = await api.get(`/Job/GetMatchingJobs`)
    return data
  } catch (error) {
    console.error(error)
  }
}

// Get a list of all profession areas(categories)
export const getProfessionAreas = async () => {
  try {
    const {data} = await api.get(`/Job/GetProfessionAreas`)

    return data
  } catch (error) {
    console.error(error)
  }
}
 