import axios from "axios";
import API_URL from "./API_URL";


const registerStaff = (username:string, email:string, password:string) => {
  return axios.post(`${API_URL}/Auth/register/staff`, {
    username,
    email,
    password,
  });
};

const registerAdmin = (companyName:string, organisationNumber:string, email:string, password:string) => {
  return axios.post(`${API_URL}/Auth/register/admin`, {
    companyName,
    organisationNumber,
    email,
    password,
  });
};

const login = (email:string, password:string) => {
  return axios
    .post(`${API_URL}/Auth/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("email", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  registerStaff,
  registerAdmin,
  login,
  logout,
}

export default AuthService
