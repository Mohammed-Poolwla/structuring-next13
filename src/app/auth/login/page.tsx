'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
const { Title } = Typography;

const LoginPage = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const onFinish = async (values: any) => {
        const { username } = values;
        const res = await signIn('credentials', {
            email: values.username,
            password: values.password,
            callbackUrl: '/users'
        });

        console.log(res);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-page">
            <div className="login-box">
                <div className="login-box-header">
                    <div className="logo">
                        <img src="/images/logo.png" alt="logo" height="50" />
                    </div>
                </div>
                <div className="login-box-content">
                    <Title className="text-center">Login</Title>
                    <Form name="login" onFinish={onFinish}>
                        <Form.Item
                            name="username"
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
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                                size="large"
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
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                size="large"
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
                                Log in
                            </Button>
                        </Form.Item>
                        <div className="login-box-footer">
                            <Link href="./signup">Sign Up</Link>
                        </div>
                        <div className="login-box-footer">
                            <Link href="./forgotPassword">Forgot Password?</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
