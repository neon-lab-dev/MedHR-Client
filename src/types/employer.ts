export interface IEmployer {
  company_avatar: {
    public_id: string;
    url: string;
    thumbnailUrl: string;
  };
  verified: boolean;
  createdAt: string;
  _id: string;
  full_name: string;
  email: string;
  mobilenumber: number;
  otp: null;
  otp_expiry: null;
  address: [
    {
      _id: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    }
  ];
  companyDetails: [
    {
      soicalLink: {
        linkedin: string;
        github: string;
      };
      _id: string;
      companyName: string;
      industryType: string;
      websiteLink: string;
      contactEmail: string;
      contactPhone: number;
      companyLocation: string;
      bio: string;
    }
  ];
  __v: number;
}

export type TEmployee = {
  full_name: string;
  email: string;
  mobilenumber: number;
  password: string;
  dob?: string;
  gender?: "Male" | "Female" | "Other";
  guardian?: {
    guardianName?: string;
    phoneNumber?: string;
    occupation?: string;
  };
  preferredLanguages: string[];
  areasOfInterests: string[];
  currentlyLookingFor: string[];
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    country?: string;
  };
  education?: Array<{
    designationType?: string;
    institutionName?: string;
    city?: string;
    courseName?: string;
    grade?: string;
    startDate?: string;
    endDate?: string;
  }>;
  projects?: Array<{
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    link?: string;
  }>;
  experience?: Array<{
    designation?: string;
    companyName?: string;
    workType?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    companyLocation?: string;
    projectLinks?: string[];
  }>;
  certifications?: Array<{
    name?: string;
    issuingOrganization?: string;
    issueDate?: string;
    credentialID?: string;
    credentialURL?: string;
  }>;
  resumes?: {
    public_id?: string;
    url?: string;
  };
  avatar?: {
    public_id?: string;
    url?: string;
  };
  skills: string[];
  socialLinks: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
    dribble?: string;
    behance?: string;
    medium?: string;
    stackoverflow?: string;
    reddit?: string;
    tiktok?: string;
    snapchat?: string;
    pinterest?: string;
    telegram?: string;
    discord?: string;
  };
  interests: string[];
  verified?: boolean;
  otp?: number;
  otp_expiry?: string;
  createdAt?: string;
};
