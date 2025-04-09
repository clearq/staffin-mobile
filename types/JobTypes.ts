export interface IJob {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    applicationDeadline: Date;
    jobSkills:[id: number, name:string, description: string]
    jobType: number;
    onSiteOrRemote: number;
    occupationType: number;
    numberofPosition: number;
    companyName: string;
    createdAt: Date;
    status: string;

}