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
    console.error('getMatchingJobs', error)
  }
}

// Get a list of all profession areas(categories)


export const getJobById = async (jobId: number) => {
  try {
    const {data} = await api.get(`/Job/GetJob-Id?Id=${jobId}`)
    return data
  } catch (error) {
    console.error(error)
  }
}
    
export const getProfessionAreas = async () => {
  try {
    const {data} = await api.get(`/Job/GetProfessionAreas`)

    return data
  } catch (error) {
    console.error('getProfessionAreas',error)
  }
}



// export const jobbTofavorite = async (id: number) => {
//   try {
//     const response = await api.post(`/Job/AddJobbToFavorite?jobId=${id}`)

//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }

// import axios from 'axios';

// // Din backend-metod
// export const jobbTofavorite = async (id: number) => {
//   try {
//     const response = await axios.post(
//       '/Job/AddJobbToFavorite', // Kontrollera att denna endpoint är korrekt
//       { jobId: id }, // Skicka `jobId` som JSON-data
//       {
//         headers: {
//           'Content-Type': 'application/json', // Specifik header för att servern ska förstå förfrågan
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error in jobbTofavorite:', error);
//     throw error; // Kasta vidare felet om det behöver hanteras
//   }
// };


// export const jobbTofavorite = async (id: number) => {
//   try {
//     const response = await api.post(
//       '/Job/AddJobbToFavorite',
//       { jobId: id }, // Skicka jobId i body
//       { headers: { 'Content-Type': 'application/json' } }
//     );
//     console.log('Response from backend:', response.data); // Logga backend-svaret
//     return response.data; // Returnera svaret från backend
//   } catch (error) {
//     console.error('Error in jobbTofavorite:', error);
//     throw error; // Kasta felet så att det kan hanteras av frontend
//   }
// };

// import axios from 'axios';

// export const getFavoriteJobs = async () => {
//   try {
//     const response = await axios.get('/Job/GetFavoriteJobs'); // Byt till rätt endpoint
//     return response.data; // Se till att returnera endast data-delen
//   } catch (error) {
//     console.error('Error in getFavoriteJobs:', error);
//     throw error; // Kasta felet för att hantera det korrekt
//   }
// };


export const getFavoriteJobs = async () => {
  try {
    const {data} = await api.get(`/Job/GetFavoriteJobs`)

    return data
  } catch (error) {
    console.error('getFavoriteJobs',error)
  }
}


export const deleteFavoriteJob = async (id: number) => {
  try {
    await api.delete(`/Job/DeleteFavoriteJob?jobId=${id}`)

  } catch (error) {
    console.error(error);   
  }
}

export const jobbToFavorite = async (id: number) => {
  try {
    const response = await api.post('/Job/AddJobbToFavorite', { jobId: id });
    return response.data;
  } catch (error) {
    console.error('Error adding job to favorite:', error);
    throw error; // Det är bra att kasta felet vidare om du vill hantera det högre upp.
  }
};

