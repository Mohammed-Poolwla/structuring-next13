import axiosInstance from '@/utills/axiosInstance';

export const resetPwPost = async (data: { password: string }) => {
    return axiosInstance.post('/api/v1/auth/resetPassword/xyz', data);
    // return axios.post('https://housiey-be.siplsolutions.com/api/v1/auth/signup',data)
};
