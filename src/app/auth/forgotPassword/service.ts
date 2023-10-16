import axiosInstance from '@/utills/axiosInstance';

export const forgotPwPost = async (data: { email: string; appUrl: string }) => {
    return axiosInstance.post('/api/v1/auth/forgot-password', data);
    // return axios.post('https://housiey-be.siplsolutions.com/api/v1/auth/signup',data)
};
