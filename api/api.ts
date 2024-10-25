import axios from "axios";


const BASE_URL = "https://staffin.clearq.se/api";

const Staffin_API = {
  BASE_URL,
}

const get = async (endpoint:string) => {
  const response = await axios.get(endpoint)
  return response.data
}

const getUserById = async (id:number) => {
  return get(`/User/GetUser-id?userId${id}`)
}

export default Staffin_API
