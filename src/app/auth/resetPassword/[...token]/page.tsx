'use client';

// pages/reset-password.tsx

import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { resetPwPost } from '../service';

const { Title } = Typography;

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const onFinish = async (values: any) => {
        console.log('New password submitted:', values.password);
        await resetPwPost({ password: values.password })
            .then((res) => {
                console.log('res...', res);
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
                        <img src="/images/logo.png" alt="logo" height="50" />
                    </div>
                </div>
                <div className="login-box-content">
                    <Title level={2} className="text-center">
                        Reset Password
                    </Title>
                    <Form name="resetPassword" onFinish={onFinish}>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new password!'
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters long!'
                                }
                                // Add more rules as needed
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                size="large"
                                suffix={
                                    <span onClick={togglePasswordVisibility}>
                                        {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                    </span>
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your new password!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('The two passwords do not match!')
                                        );
                                    }
                                })
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="login-form-button"
                            >
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
