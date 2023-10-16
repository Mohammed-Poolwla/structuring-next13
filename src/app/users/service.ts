import axiosInstance from '@/utills/axiosInstance';
import { UserCities, UserPayload } from './interface';

export async function getUsers(filter: UserPayload) {
    try {
        const response = await axiosInstance.get('/api/v1/users', {
            params: {
                page: filter.current_page,
                pageSize: filter.per_page,
                username: filter.filters?.username,
                sort: filter.sort,
                email: filter.filters?.email,
                city_id: filter.filters?.city_id,
                cluster_id: filter.filters?.cluster_id,
                role: filter.filters?.role_id,
                status: filter.filters?.status
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failes to fetch Users');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCities() {
    try {
        const response = await axiosInstance.get('/api/v1/masters/cities', {
            // params: {
            //     page: filter.current_page,
            //     pageSize: filter.per_page
            // }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failes to fetch user cities');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCluster() {
    try {
        const response = await axiosInstance.get('/api/v1/masters/clusters', {});
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failes to fetch user clusters');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getRoles() {
    try {
        const response = await axiosInstance.get('/api/v1/roles', {});
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failes to fetch user roles');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getUser(id: number) {
    const response = await axiosInstance.get(`/api/v1/users/${id}`);
    return response.data;
}

export async function addUser(data: any) {
    try {
        const response = await axiosInstance.post('/api/v1/users', data);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to add user');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateUserData = async (userId: number, userData: any) => {
    try {
        const response = await axiosInstance.patch(`/api/v1/users/${userId}`, userData);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update user');
        }
    } catch (error) {
        throw error;
    }
};

export const deleteUserData = async (userId: number) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/users/${userId}`);
        if (response.status === 200) {
            return { success: true };
        } else {
            throw new Error('Failed to delete user');
        }
    } catch (error) {
        throw error;
    }
};
