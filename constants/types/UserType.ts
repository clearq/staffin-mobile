export interface User {
  id : number | null;
  title : string;
  firstName : string;
  lastName : string;
  phoneNumber : string;
  email : string;
  country : string;
  city : string;
  street : string;
  postalCode : string;
  about : string;
  profileImage : string;
  roleId : 1 | 2 | 3 | 4;
  educations : Education[];
  skills : Skills[];
  languages : Languages[];
  experience : Experience[];
}

export interface Education {
  id : number | null;
  name : string;
  institution : string;
  startDate : string;
  endDate : string;
  staffId : number | null;
  staff : null; 
}

export interface Skills {
  id : number;
  name : string;
}

export interface Languages {
  id : number;
  name : string;
  rating : number;
}

export interface Experience {
  id : number;
  position : string;
  description : number;
  companyName : string;
  location : string;
  startDate : string;
  endDate : string
}
