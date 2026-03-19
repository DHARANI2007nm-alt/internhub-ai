// InternHub Types

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  locationType: 'Remote' | 'Onsite' | 'Hybrid';
  stipend: {
    amount: number;
    currency: string;
    period: 'month' | 'week' | 'total';
  } | null;
  eligibility: {
    degrees: string[];
    years: string[];
    skills: string[];
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  applicationDeadline: string;
  duration: string;
  applyLink: string;
  source: 'LinkedIn' | 'Internshala' | 'Government' | 'Company' | 'Other';
  postedDate: string;
  category: string;
  isPaid: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  profile: {
    degree: string;
    year: string;
    skills: string[];
    interests: string[];
    location: string;
    resumeUrl?: string;
  };
  savedInternships: string[];
  appliedInternships: {
    internshipId: string;
    appliedDate: string;
    status: 'applied' | 'under_review' | 'shortlisted' | 'rejected' | 'selected';
  }[];
  notifications: Notification[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'new_internship' | 'deadline_reminder' | 'status_update' | 'recommendation';
  read: boolean;
  createdAt: string;
  internshipId?: string;
}

export interface FilterOptions {
  domain: string[];
  location: string[];
  locationType: ('Remote' | 'Onsite' | 'Hybrid')[];
  isPaid: boolean | null;
  stipendRange: {
    min: number;
    max: number;
  } | null;
  eligibility: string[];
}

export interface SearchParams {
  keyword: string;
  filters: FilterOptions;
  sortBy: 'relevance' | 'newest' | 'deadline' | 'stipend_high' | 'stipend_low';
}

export interface ResumeTip {
  category: string;
  tips: string[];
}
