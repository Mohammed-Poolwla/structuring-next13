import { ListMeta } from '@/interfaces/common';

export interface UserFilter {
    username?: string;
    email?: string;
    city_id?: number;
    cluster_id?: number;
    role_id?: number;
    status?: string;
}

export interface UserPayload {
    current_page: number;
    per_page: number;
    sort: any;
    filters?: UserFilter;
}

export interface User {
    users: any;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    status: 'active' | 'inactive';
    city_id: number;
    cluster_id: number;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
    role_id: number;
    role: string;
    cluster_name: string;
    city_name: string;
}

export interface UserState {
    users: User[];
    listLoading: boolean;
    status: 'loading' | 'succeeded' | 'failed';
    error: string | null;
    usersMeta: ListMeta;
    user: User | null;
}

export interface UserCities {
    current_page: number;
    per_page: number;
}

export interface citiesI {
    id: number;
    name: string;
    status: string;
}

export interface clusterI {
    id: number;
    name: string;
    status: string;
}

export interface roleI {
    id: number;
    name: string;
    status: string;
}
