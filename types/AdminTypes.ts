import { number } from "yup"

export interface IAdmin {
  id: number;
  title?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  profileImage?: string;
}