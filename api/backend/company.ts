import { ICompany } from "@/types";
import api from "./config";


export const getAllCompanies = async () => {
  try {
    const response = await api.get(`/Company/GetAll-Companies`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Get Company Profile By CompanyId
export const getCompanyProfileUserId = async (id: number) => {
  try {
    const response = await api.get(`/Company/GetCompanyProfileUserIdByCompanyId?companyId=${id}`)

    return response.data
  } catch (error) {

  }
}

export const getCompanyById = async (companyId: number) => {
  try {
    const { data } = await api.get(`/Company/GetCompany-id?Id=${companyId}`)
    
    return data
  } catch (error) {
    console.error(error)
  }
}

export const createCompany = async (value:any) => {
  try {
    const data = await api.post(`/Company/Create-company`, value)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateCompanyInformation = async (companyId: number, value:Partial<ICompany>) => {
  try {
    const data = await api.put(`/Company/Update-CompanyInformation?id=${companyId}`, value)

    return data
  } catch (error) {
    console.error(error)
  }
}

