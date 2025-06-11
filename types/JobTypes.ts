import { ReactNode } from "react";

export interface IJob {
    jobTitle: ReactNode;
    jobId: number;
    salary: ReactNode;
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;  
    location: string;
    applicationDeadline: Date;
    jobSkills: IJobSkills[]
    jobTypeId: number;
    // jobType: number; // InstantJob: 1 | RegularJob:2  
    // onSiteOrRemote: number; // Onsite: 1 | Remote: 2 | Hybrid: 3
    // occupationType: number; // FullTime: 1 | PartTime: 2 | Internship: 3
    workplaceTypeId: number;
    employmentTypeId: number;
    numberofPosition: number;
    companyName: string;
    companyId: number;
    createdAt: Date;
    updatedAt?: Date;
    status: string; // Open | Assigned | Closed 
    professionAreaId?: number;
    createAsTemplate?: boolean;
    templateName?: string;
    createdByUserId: number;
    employerId?: number;
    userId: number;
    branchId?: number;
}

export interface IJobSkills {
    id: number;
    name: string;
    description: string
}

export interface IProfessionArea {
    id: number;
    name: string;
}

export interface IMatchingJob {
    jobId : number;
    jobTitle: string;
    jobDescription: string;
    matchScore: number;
    companyId: number; 
}

export interface IMyJobApplication {
    jobId : number;
    contant : string;
 
}