import { Config } from 'types';

export const MAX_CALENDAR_ROWS = 5;

export const MAX_CALENDAR_ITEMS_PER_ROW = 7;

export const MAX_CALENDAR_ITEMS =
  MAX_CALENDAR_ROWS * MAX_CALENDAR_ITEMS_PER_ROW;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FONTS = {
  'Square Peg': require('@assets/fonts/SquarePeg-Regular.ttf'),
  Poppins: require('@assets/fonts/Poppins-Regular.ttf'),
};

export const DEFAULT_LOGO_WIDTH = 200;

export const DEFAULT_LOGO_HEIGHT = 200;

export const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'Email already in use',
  'auth/invalid-login-credentials': 'Invalid login credentials',
};

export const STORAGE_KEYS = {
  WELCOME: 'welcome',
  ROLE: 'role',
  SCHEDULE_LOCATION: 'scheduleLocation',
  SCHEDULE_DATES: 'scheduleDates',
  SCHEDULE_WORKERS: 'scheduleWorkers',
};

export const FEATURES: Config = {
  search: false,
};

export const WORKER_EXPERIENCES: Record<string, string> = {
  excavation: 'Excavation',
  utility: 'Utility Work',
  landscaping: 'Landscaping',
  foundation: 'Foundation',
  siding: 'Siding',
  'window-installing': 'Window Installing',
  framing: 'Framing',
  flooring: 'Flooring',
  drywall: 'Drywall',
};

export const COLORS = [
  '#001F3F',
  '#333333',
  '#36454F',
  '#8B4513',
  '#228B22',
  '#800000',
  '#FF4500',
  '#6A5ACD',
  '#8A2BE2',
  '#483D8B',
  '#2E8B57',
  '#9932CC',
  '#B22222',
  '#20B2AA',
  '#4169E1',
  '#DC143C',
  '#556B2F',
  '#FF8C00',
  '#9932CC',
  '#8B008B',
];
