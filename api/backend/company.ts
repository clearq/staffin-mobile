import api from "./config";

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