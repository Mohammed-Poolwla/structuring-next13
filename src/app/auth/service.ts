import axiosInstance from '../../utills/axiosInstance';

export const loginPost = async (data: { email: string; password: string }) => {
    return axiosInstance.post('/api/v1/auth/login', data);
};
