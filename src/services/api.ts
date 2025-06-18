import { LoginData, SignupData, AuthResponse, WellnessLog, WellnessLogForm } from '../types';
import { fallbackAuthApi, fallbackWellnessApi } from './mockFallback';

// POSTMAN MOCK SERVER CONFIGURATION
// Replace this URL with your actual Postman Mock Server URL
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Check if Postman Mock Server is configured
const isPostmanConfigured = API_BASE_URL && !API_BASE_URL.includes('your-mock-server-url');

// Utility function for making HTTP requests
const makeRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers: defaultHeaders,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('wellness_token');
};

// Authentication API
export const authApi = {
  async login(data: LoginData): Promise<AuthResponse> {
    if (!isPostmanConfigured) {
      console.warn('Postman Mock Server not configured. Using fallback mock. See postman/README.md for setup.');
      return fallbackAuthApi.login(data);
    }

    const response = await makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response;
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    if (!isPostmanConfigured) {
      console.warn('Postman Mock Server not configured. Using fallback mock. See postman/README.md for setup.');
      return fallbackAuthApi.signup(data);
    }

    const response = await makeRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response;
  },
};

// Wellness Logs API
export const wellnessApi = {
  async getLogs(userId: string): Promise<WellnessLog[]> {
    if (!isPostmanConfigured) {
      console.warn('Postman Mock Server not configured. Using fallback mock. See postman/README.md for setup.');
      return fallbackWellnessApi.getLogs(userId);
    }

    const token = getAuthToken();
    
    const response = await makeRequest<WellnessLog[]>('/wellness-logs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response;
  },

  async createLog(userId: string, data: WellnessLogForm): Promise<WellnessLog> {
    if (!isPostmanConfigured) {
      console.warn('Postman Mock Server not configured. Using fallback mock. See postman/README.md for setup.');
      return fallbackWellnessApi.createLog(userId, data);
    }

    const token = getAuthToken();
    
    const response = await makeRequest<WellnessLog>('/wellness-logs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  },

  async updateLog(logId: string, data: Partial<WellnessLogForm>): Promise<WellnessLog> {
    if (!isPostmanConfigured) {
      console.warn('Postman Mock Server not configured. Using fallback mock. See postman/README.md for setup.');
      return fallbackWellnessApi.updateLog(logId, data);
    }

    const token = getAuthToken();
    
    const response = await makeRequest<WellnessLog>(`/wellness-logs/${logId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  },

  async deleteLog(logId: string): Promise<void> {
    if (!isPostmanConfigured) {
      console.warn('Postman Mock Server not configured. Using fallback mock. See postman/README.md for setup.');
      return fallbackWellnessApi.deleteLog(logId);
    }

    const token = getAuthToken();
    
    await makeRequest<{ success: boolean; message: string }>(`/wellness-logs/${logId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
}; 