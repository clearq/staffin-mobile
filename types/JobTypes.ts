import { ReactNode } from "react";

export interface IJob {
    salary: ReactNode;
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;  
    location: string;
    applicationDeadline: Date;
    jobSkills: IJobSkills[]
    jobType: number; // InstantJob: 1 | RegularJob:2  
    onSiteOrRemote: number; // Onsite: 1 | Remote: 2 | Hybrid: 3
    occupationType: number; // FullTime: 1 | PartTime: 2 | Internship: 3
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