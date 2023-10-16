import loginData from './json/login.json';
import signupData from './json/signup.json';
import forgotPwData from './json/forgotPw.json';
import resetPwData from './json/resetPw.json';

const mockAuth = (mock: any) => {
    mock.onPost('/api/v1/auth/login').reply((data: any) => {
        return [200, loginData];
    });
    mock.onPost('/api/v1/auth/signup').reply((data: any) => {
        return [200, signupData];
    });
    mock.onPost('/api/v1/auth/forgot-password').reply((data: any) => {
        return [200, forgotPwData];
    });
    mock.onPost('/api/v1/auth/resetPassword/xyz').reply((data: any) => {
        return [200, resetPwData];
    });
};
export default mockAuth;
