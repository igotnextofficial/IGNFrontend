export interface Mentor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  profileImage: string;
  hourlyRate: number;
  genres: string[];
  skills: string[];
  experience: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  timezone: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
} 