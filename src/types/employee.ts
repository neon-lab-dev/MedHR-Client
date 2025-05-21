export interface IEmployee {
  resumes?: {
    public_id: string;
    url: string;
  };
  socialLinks?: {
    linkedin: string;
    github: string;
  }[];
  skills?: string[];
  interests?: string | null;
  verified: boolean;
  createdAt: string;
  _id: string;
  full_name: string;
  email: string;
  mobilenumber: number;
  otp: string | null;
  otp_expiry: string | null;
  address?: {
    _id: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }[];
  education?: {
    _id: string;
    institutionName: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }[];
  experience?: {
    _id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  projects?: {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    link: string;
  }[];
  certifications?: {
    _id: string;
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expirationDate: string;
    credentialID: string;
    credentialURL: string;
  }[];
}
