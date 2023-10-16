'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import NavBarComponent from '@/components/navBar';
import HeaderComponent from '@/components/header';
import '../../app/globals.css';
import './css/custom-style.css';
import { ConfigProvider, Layout } from 'antd';
import theme from '../../theme/themeConfig';

const { Content } = Layout;

const inter = Inter({ subsets: ['latin'] });

const AfterLoginLayout = ({ children }: React.PropsWithChildren) => {
    const [collapsed, setCollapsed] = useState(false);
    // const {
    //     token: { colorBgContainer }
    // } = theme.useToken();

    return (
        <ConfigProvider theme={theme}>
            <Layout>
                <NavBarComponent collapsed={collapsed} />
                <Layout>
                    <HeaderComponent
                        collapsed={collapsed}
                        toggleCollapsed={() => setCollapsed(!collapsed)}
                    />
                    <Content className="after-login-main-content">{children}</Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default AfterLoginLayout;
