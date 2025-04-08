import api from "./config";


export const getAllJobs = async () => {
    try{
      const {data} = await api.get(`/Job/GetAll-Jobs`);
        console.log(data);
        
      return data;
    } catch (error) {
      console.error(error);    
    }
  }