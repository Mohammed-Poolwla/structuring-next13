// axiosInstance.js
import axios from 'axios';
import applyMockAdapter from '../mock';

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL,

    headers: {
        'Content-Type': 'application/json'
    }
});

const mockAPi = false;

if (mockAPi) {
    applyMockAdapter(axiosInstance);
}
// Alter defaults after instance has been created
export default axiosInstance;
