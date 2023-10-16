import axiosInstance from '@/utills/axiosInstance';

export const signupPost = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}) => {
    return axiosInstance.post('/api/v1/auth/signup', data);
    // return axios.post('https://housiey-be.siplsolutions.com/api/v1/auth/signup',data)
};
