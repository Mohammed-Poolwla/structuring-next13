'use client';

import React from 'react';

import '../../app/globals.css';
import './css/custom-style.css';

import { Layout, ConfigProvider } from 'antd';

import theme from '../../theme/themeConfig';

const { Content } = Layout;

const BeforeLoginLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <ConfigProvider theme={theme}>
            <Layout>
                <Content className="before-login-main-content">{children}</Content>
            </Layout>
        </ConfigProvider>
    );
};

export default BeforeLoginLayout;
