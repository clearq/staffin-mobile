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
    jobType: number;
    onSiteOrRemote: number;
    occupationType: number;
    numberofPosition: number;
    companyName: string;
    createdAt: Date;
    status: string;
}

export interface IJobSkills {
    id: number;
    name: string;
    description: string
}