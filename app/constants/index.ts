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
  SCHEDULE_WORKERS: 'scheduleWorkers',
};

export const FEATURES: Config = {
  search: false,
};
