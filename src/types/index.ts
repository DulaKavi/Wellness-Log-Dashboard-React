// Authentication types
export interface User {
  id: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Wellness Log types
export interface WellnessLog {
  id: string;
  userId: string;
  mood: 'Happy' | 'Stressed' | 'Tired' | 'Focused';
  sleepDuration: number;
  activityNotes: string;
  createdAt: string;
}

export interface WellnessLogForm {
  mood: 'Happy' | 'Stressed' | 'Tired' | 'Focused';
  sleepDuration: number;
  activityNotes: string;
}

// Form validation types
export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  mood?: string;
  sleepDuration?: string;
  activityNotes?: string;
}

// Theme types
export type Theme = 'light' | 'dark';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
} 