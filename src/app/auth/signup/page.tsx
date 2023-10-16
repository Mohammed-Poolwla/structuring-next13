'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { signupPost } from '../signup/service';

const { Title } = Typography;

const SignupPage = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const onFinish = async (values: any) => {
        const { username } = values;
        console.log('values...', values);
        await signupPost(values)
            .then((res) => {
                console.log('res...', res);
                // if (res.status === 200) {
                //     // router.push('/auth/login');
                // }
            })
            .catch((err) => {
                console.log('err...', err);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-page">
            <div className="login-box">
                <div className="login-box-header">
                    <div className="logo">
                        <img src="/images/dummy_logo.png" alt="logo" height="50" />
                    </div>
                </div>
                <div className="login-box-content">
                    <Title className="text-center">Sign Up</Title>
                    <Form name="signup" onFinish={onFinish}>
                        <Form.Item
                            name="first_name"
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value) {
                                            return Promise.reject('Please input your first name!');
                                        }
                                    }
                                }
                            ]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value) {
                                            return Promise.reject('Please input your last name!');
                                        }
                                    }
                                }
                            ]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                },
                                {
                                    type: 'email',
                                    message: 'Invalid email format!'
                                }
                            ]}
                        >
                            <Input
                                // prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters long!'
                                }
                            ]}
                        >
                            <Input
                                // prefix={<LockOutlined className="site-form-item-icon" />}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                suffix={
                                    <span onClick={togglePasswordVisibility}>
                                        {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                    </span>
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="login-form-button"
                            >
                                Sign Up
                            </Button>
                        </Form.Item>
                        <div className="login-box-footer">
                            <Link href="./login">Login</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

// 'use client';

// import React, { useState } from 'react';
// import { Row, Col, Card, Form, Input, Button } from 'antd';
// import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
// import Link from 'next/link';
// // import { signup } from 'next-auth/react';
// import { signupPost } from '../signup/service';
// // import { useRouter } from 'next/router';

// const SignupPage = () => {
//     const dispatch = useDispatch();
//     const [showPassword, setShowPassword] = useState(false);
//     // const router = useRouter();

//     const onFinish = async (values: any) => {
//         const { username } = values;
//         /* await signUp('credentials', {
//             email: values.username,
//             password: values.password
//         }); */
//         console.log('values...', values);
//         await signupPost(values).then((res) => {
//             console.log('res...', res);
//             if (res.status === 200) {
//                 // router.push('/auth/login');
//             }
//         }).catch((err) => {
//             console.log('err...', err);
//         });
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
//             <Col xs={20} sm={16} md={12} lg={8}>
//                 <Card title="Sign Up">
//                     <Form name="signup" onFinish={onFinish}>
//                         <Form.Item
//                             name="first_name"
//                             rules={[
//                                 {
//                                     validator: async (_, value) => {
//                                         if (!value) {
//                                             return Promise.reject('Please input your first name!');
//                                         }
//                                     },
//                                 },
//                             ]}
//                         >
//                             <Input
//                                 placeholder="First Name"
//                             />
//                         </Form.Item>
//                         <Form.Item
//                             name="last_name"
//                             rules={[
//                                 {
//                                     validator: async (_, value) => {
//                                         if (!value) {
//                                             return Promise.reject('Please input your last name!');
//                                         }
//                                     },
//                                 },
//                             ]}
//                         >
//                             <Input
//                                 placeholder="Last Name"
//                             />
//                         </Form.Item>
//                         <Form.Item
//                             name="email"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input your email!'
//                                 },
//                                 {
//                                     type: 'email',
//                                     message: 'Invalid email format!'
//                                 }
//                             ]}>
//                             <Input
//                                 // prefix={<UserOutlined className="site-form-item-icon" />}
//                                 placeholder="Email"
//                             />
//                         </Form.Item>
//                         <Form.Item
//                             name="password"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input your password!'
//                                 },
//                                 {
//                                     min: 6,
//                                     message: 'Password must be at least 6 characters long!'
//                                 }
//                             ]}>
//                             <Input
//                                 // prefix={<LockOutlined className="site-form-item-icon" />}
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Password"
//                                 suffix={
//                                     <span onClick={togglePasswordVisibility}>
//                                         {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
//                                     </span>
//                                 }
//                             />
//                         </Form.Item>
//                         <Form.Item>
//                             <Button type="primary" htmlType="submit" className="login-form-button">
//                                 Sign up
//                             </Button>
//                         </Form.Item>
//                         <Form.Item>
//                             <Link href="./login">Login</Link>
//                         </Form.Item>
//                     </Form>
//                 </Card>
//             </Col>
//         </Row>
//     );
// };

// export default SignupPage;
