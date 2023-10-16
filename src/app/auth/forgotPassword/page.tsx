'use client';

// pages/forgot-password.tsx

import React from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { forgotPwPost } from '../forgotPassword/service';
const { Title } = Typography;

const ForgotPasswordPage = () => {
    const onFinish = async (values: any) => {
        console.log('values...', values);
        const inputValues = {
            email: values.email,
            appUrl: `http://${window.location.host}/resetPassword`
        };
        await forgotPwPost(inputValues)
            .then((res) => {
                console.log('res...', res);
            })
            .catch((err) => {
                console.log('err...', err);
            });
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
                        Forgot Password
                    </Title>
                    <Form name="forgotPassword" onFinish={onFinish}>
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
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
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
                                Submit
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

export default ForgotPasswordPage;
