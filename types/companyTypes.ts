export interface ICompany {
  id: number;
  companyName: string;
  about: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
  organisationNumber: string;
  website: string;
  image: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  branchNames: IBranch[];
}

export interface IBranch {

}