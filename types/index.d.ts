import type { ReactNode } from 'react';

export type LayoutProps = {
    children: ReactNode;
}

export interface CreateUserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

type UpdateUserProps = Optional<CreateUserProps> & {
    company?: any;
    worker?: any;
}