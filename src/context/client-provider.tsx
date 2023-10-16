'use client';
import React, { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import axiosInstance from '@/utills/axiosInstance';
import Layout from '../components/layouts/layout';
import LayoutLogin from '../components/layouts/layoutLogin';

// eslint-disable-next-line @next/next/no-async-client-component
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<string | boolean | undefined>();
    useEffect(() => {
        async function setAuthenticate() {
            const getSess = await getSession();
            if (getSess) {
                axiosInstance.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${getSess.user.accessToken}`;
                setAuth(getSess.user.accessToken);
            } else {
                setAuth(false);
            }
        }
        setAuthenticate();
    }, []);
    if (auth) {
        return (
            <SessionProvider>
                <Layout>{children}</Layout>
            </SessionProvider>
        );
    }
    if (auth === false) {
        return <LayoutLogin>{children}</LayoutLogin>;
    }
    return <div className="page-loading">Loading...</div>;
}
