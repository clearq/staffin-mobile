import axios from "axios";
import API_URL from "./API_URL";


// get a user by id

const getUserById = (id:number) => {
  axios(`${API_URL}/User/GetUser-id?userId=${id}`)
  .then((res) => res.data.firstName )
  .catch((err) => console.log(err))
};



const UserService = {
  getUserById,
}

export default UserService