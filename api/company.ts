import {api } from "./API";

export interface Company {
  id: number;
  companyName: string;
  about: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
  organisationNumber: string;
  website: string;
  createdAt: string;
  updatedAt: string; 
  branchNames: string[];
}

const getCompanyDetails = async (companyId: number): Promise<Company> => {
  try {
    const response = await api.get(`/Company/GetCompany-id?Id=${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw new Error("Failed to fetch company details");
  }
};

export {
  getCompanyDetails,
}