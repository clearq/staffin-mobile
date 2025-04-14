import { IBranch, ICompany } from "@/types";
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

export const createCompany = async (values:any) => {
  try {
    const data = await api.post(`/Company/Create-company`, values)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateCompanyInformation = async (companyId: number, values:Partial<ICompany>) => {
  try {
    const data = await api.put(`/Company/Update-CompanyInformation?id=${companyId}`, values)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getAllBranches = async () => {
  try {
    const { data } = await api.get(`/Company/GetAll-Branches`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getBranchById = async (id: number) => {
  try {
    const { data } = await api.get(`/Company/GetBranch-id?Id=${id}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const addBranchCompany = async (values: Partial<ICompany>) => {
  try {
    const response = await api.post(`/Company/AddBranch-Company`, values)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateBranch = async (id: number, values: Partial<IBranch>) => {
  try {
    const data = await api.put(`/Company/UpdateBranch-Company?branchId=${id}`, values)

    return data
  } catch (error) {
    console.error(error)
  }
}