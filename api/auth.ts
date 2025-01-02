// import { Staffin_API } from "./API";
// import { User } from "./user";

// export interface Authresponse {
//   token: string;
//   id: number;
//   role: number;
// }
// export interface AdminAuth {
//   auth:Authresponse
//   companyUserId: number
// }

// export interface CurrentUser {
//   currentUser: User
// }


// // Sign-in
// const login = async (email: string, password: string): Promise<Authresponse> => {
//   try {
//     const response = await Staffin_API.post<Authresponse>("/Auth/login", {
//       email,
//       password,
//     });
    
//     return response.data; 
    
//   } catch (error: any) {
//     console.error("Login error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "Login failed");
//   }
// };


// // Sign-up Register Staff
// const signUpStaff = async (userName: string, email: string, password: string): Promise<Authresponse> => {
//   try {
//     const response = await Staffin_API.post<Authresponse>("/Auth/register/staff", {
//       userName,
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error: any) {
//     console.error("SignUp error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "SignUp failed");
//   }
// };


// // Sign-up Register Admin
// const signUpAdmin = async (companyName: string, organisationNumber: string, email: string, password: string): Promise<Authresponse> => {
//   try {
//     const response = await Staffin_API.post<Authresponse>("/Auth/register/staff", {
//       companyName,
//       organisationNumber,
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error: any) {
//     console.error("SignUp error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "SignUp failed");
//   }
// };


// // Get Current User
// const getCurrentUser = async (userId: number): Promise<CurrentUser> => {
//   try {
//     const response = await Staffin_API.get<CurrentUser>(`/User/GetUser-id?userId=${userId}`);
//     return response.data;
//   } catch (error: any) {
//     console.error("GetCurrentUser error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "Failed to fetch current user");
//   }
// };

// // Log out
// const logout = async (token: string): Promise<{ message: string }> => {
//   try {
//     const response = await Staffin_API.post<{ message: string }>("/Auth/logout", null, {
//       headers: {
//         Authorization: `Bearer ${token}`, 
//       },
//     });
//     return response.data;
//   } catch (error: any) {
//     console.error("Logout error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "Failed to logout");
//   }
// };

// export { 
//   login, 
//   signUpStaff,
//   signUpAdmin,
//   getCurrentUser,
//   logout,
// }