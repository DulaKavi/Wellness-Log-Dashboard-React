import { LoginData, SignupData, AuthResponse, WellnessLog, WellnessLogForm } from '../types';

// Fallback mock implementation for local testing
// This runs when Postman Mock Server is not configured

let users: Array<{ id: string; email: string; password: string }> = [];
let wellnessLogs: WellnessLog[] = [
  {
    id: 'demo_log_1',
    userId: 'demo_user',
    mood: 'Happy',
    sleepDuration: 8,
    activityNotes: 'Great day! Had an excellent workout and felt energized throughout the day.',
    createdAt: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'demo_log_2',
    userId: 'demo_user',
    mood: 'Focused',
    sleepDuration: 7.5,
    activityNotes: 'Deep work session in the morning. Completed important project milestones.',
    createdAt: '2024-01-14T09:15:00.000Z'
  }
];

const generateId = (): string => `fallback_${Math.random().toString(36).substr(2, 9)}`;
const generateToken = (): string => `fallback_jwt_${Math.random().toString(36).substr(2, 20)}`;
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const fallbackAuthApi = {
  async login(data: LoginData): Promise<AuthResponse> {
    await delay(500);
    
    // For demo purposes, accept any valid email format with password123
    if (!data.email.includes('@') || data.password !== 'password123') {
      throw new Error('Invalid credentials. Use any email with password: password123');
    }

    return {
      token: generateToken(),
      user: {
        id: 'demo_user',
        email: data.email,
      },
    };
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    await delay(500);
    
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: generateId(),
      email: data.email,
      password: data.password,
    };

    users.push(newUser);

    return {
      token: generateToken(),
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  },
};

export const fallbackWellnessApi = {
  async getLogs(userId: string): Promise<WellnessLog[]> {
    await delay(300);
    return wellnessLogs.filter(log => log.userId === userId || log.userId === 'demo_user');
  },

  async createLog(userId: string, data: WellnessLogForm): Promise<WellnessLog> {
    await delay(300);
    
    const newLog: WellnessLog = {
      id: generateId(),
      userId,
      ...data,
      createdAt: new Date().toISOString(),
    };

    wellnessLogs.unshift(newLog);
    return newLog;
  },

  async updateLog(logId: string, data: Partial<WellnessLogForm>): Promise<WellnessLog> {
    await delay(300);
    
    const logIndex = wellnessLogs.findIndex(log => log.id === logId);
    if (logIndex === -1) {
      throw new Error('Log not found');
    }

    wellnessLogs[logIndex] = { ...wellnessLogs[logIndex], ...data };
    return wellnessLogs[logIndex];
  },

  async deleteLog(logId: string): Promise<void> {
    await delay(300);
    
    const logIndex = wellnessLogs.findIndex(log => log.id === logId);
    if (logIndex === -1) {
      throw new Error('Log not found');
    }

    wellnessLogs.splice(logIndex, 1);
  },
}; 