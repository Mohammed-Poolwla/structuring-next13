'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';

import './globals.css';

import StyledComponentsRegistry from '../components/lib/AntdRegistry';
import ReduxProvider from '../store/provider';
import AuthProvider from '@/context/client-provider';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StyledComponentsRegistry>
                    <ReduxProvider>
                        <AuthProvider>{children}</AuthProvider>
                    </ReduxProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
};

export default RootLayout;
