import type { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export interface CreateUserProps {
  id: string;
  email: string;
  name: string;
}

export interface SignUpProps {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export type UpdateUserProps = Optional<CreateUserProps> & {
  company?: Record<string, string>;
  worker?: Record<string, string>;
};

export interface Day {
  date: Date;
  isActive: boolean;
  key: string;
}

export type CalendarRange = Array<Day>;
