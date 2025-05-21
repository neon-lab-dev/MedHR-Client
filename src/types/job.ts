export interface IJob {
  companyDetails: {
    companyName: string;
    industryType: string;
    websiteLink: string;
    logo: string;
    bio: string;
  };
  requiredSkills: string[];
  status: string;
  applicants: {
    employee: string;
    appliedDate: string;
    isViewed: boolean;
    status: string;
    _id: string;
  }[];
  _id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  locationType: string;
  employmentType: string;
  employmentDuration: string;
  salary: string;
  postedBy: string;
  applicationDeadline: string;
  extraBenefits: string;
  experience: string;
  location: string;
  postedAt: string;
  __v: number;
}
