'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { Descriptions } from 'antd';

const UserDetails = () => {
    const searchParams = useSearchParams();
    const [urlId, setUrlID] = useState(null);
    const user = useSelector((state: any) => {
        return state?.users?.users?.find((user: any) => `id=${user.id}` === urlId);
    });
    console.log('user', user);

    useEffect(() => {
        const url: any = `${searchParams}`;
        setUrlID(url);
    }, [searchParams]);

    if (!user) {
        return <p>User not found.</p>;
    }

    return (
        <div>
            <Descriptions title="User Information" bordered>
                <Descriptions.Item label="Name">{user.first_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="City">{user.city_name}</Descriptions.Item>
                <Descriptions.Item label="Cluster">{user.cluster_name}</Descriptions.Item>
                <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
                <Descriptions.Item label="Status">{user.status}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default UserDetails;
