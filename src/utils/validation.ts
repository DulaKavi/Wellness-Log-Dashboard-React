import { ValidationErrors, LoginData, SignupData, WellnessLogForm } from '../types';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = (data: LoginData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  return errors;
};

export const validateSignupForm = (data: SignupData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateWellnessLogForm = (data: WellnessLogForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.mood) {
    errors.mood = 'Mood is required';
  }

  if (data.sleepDuration < 0 || data.sleepDuration > 12) {
    errors.sleepDuration = 'Sleep duration must be between 0 and 12 hours';
  }

  if (!data.activityNotes) {
    errors.activityNotes = 'Activity notes are required';
  } else if (data.activityNotes.length > 200) {
    errors.activityNotes = 'Activity notes must be less than 200 characters';
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
}; 