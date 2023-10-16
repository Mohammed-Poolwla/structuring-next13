'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, fetchUsers } from './slice';
import { Table, Button, Input, Spin, notification, Space, Typography, Tag, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import FilterPopup from './components/filterPopup';
import { User, UserFilter, UserPayload } from './interface';
import { RootStates } from '@/store/interface';
import { useRouter } from 'next/navigation';
import { LIST_META } from '@/utills/constant';
const { Title } = Typography;

const UserPage = () => {
    const { users, usersMeta, listLoading } = useSelector((state: RootStates) => state.users);
    const router = useRouter();
    const [filter, setFilter] = useState<UserFilter>({
        username: '',
        email: '',
        city_id: 0,
        cluster_id: 0,
        role_id: 0
    });
    const dispatch: any = useDispatch();

    const [showFilterPopup, setShowFilterPopup] = useState<any>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nFil = {
            ...filter,
            username: e.target.value
        };
        setFilter(nFil);
        getUsers({
            current_page: 1,
            per_page: usersMeta.per_page,
            sort: { column: 'first_name', order: 'ascend' },
            filters: nFil
        });
    };

    useEffect(() => {
        getUsers({
            current_page: 1,
            per_page: LIST_META.per_page,
            sort: { column: 'first_name', order: 'ascend' }
        });
    }, []);

    const getUsers = (filter: UserPayload) => {
        dispatch(fetchUsers(filter));
    };

    const handleApplyFilter = (userFilter: UserFilter) => {
        const nFil = {
            ...filter,
            ...userFilter
        };
        setFilter(nFil);
        getUsers({
            current_page: 1,
            per_page: usersMeta.per_page,
            sort: { column: 'first_name', order: 'ascend' },
            filters: nFil
        });
    };

    const handleDeleteUser = (userId: number) => {
        dispatch(deleteUser(userId))
            .then(() => {
                console.log('User deleted successfully!');
                notification.success({
                    message: 'User Deleted',
                    description: 'The user has been deleted successfully.'
                });
                getUsers({
                    ...filter,
                    current_page: 1,
                    per_page: usersMeta.per_page,
                    sort: { column: 'first_name', order: 'ascend' }
                });
            })
            .catch((error: any) => {
                console.error('Error deleting user:', error);
            });
    };

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        getUsers({
            current_page: pagination.current,
            per_page: pagination.pageSize,
            sort: {
                sortOrder: sorter?.order === 'ascend' ? 'asc' : 'desc',
                column: sorter?.field
            },
            filters
        });
    };

    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter: (a, b) => a.first_name.localeCompare(b.first_name),
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'City',
            dataIndex: 'city_name',
            key: 'city_name',
            sorter: (a, b) => a.city_name.localeCompare(b.city_name),
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'Cluster',
            dataIndex: 'cluster_name',
            key: 'cluster_name',
            sorter: (a, b) => a.cluster_name.localeCompare(b.cluster_name),
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
            key: 'status',
            className: 'w-1 nowrap',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            className: 'w-1 nowrap text-right',
            render: (record) => (
                <Space size="small">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EyeOutlined />}
                        size="middle"
                        onClick={() => router.push(`/users/view-user?id=${record.id}`)}
                        title="View"
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        size="middle"
                        onClick={() => router.push(`/users/edit-user?id=${record.id}`)}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this item?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            size="middle"
                            title="Delete"
                            danger
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <>
                <div className="page-header">
                    <Title level={2}>User List</Title>
                    <Space size="middle">
                        <Input
                            placeholder="Search by Name"
                            value={filter.username}
                            onChange={handleChange}
                            style={{ marginBottom: 16 }}
                        />
                        <FilterPopup
                            visible={showFilterPopup}
                            onFilter={handleApplyFilter}
                            onCancel={() => setShowFilterPopup(false)}
                        />
                        <Button onClick={() => setShowFilterPopup(true)}>Filter</Button>
                        <Button type="primary" onClick={() => router.push('/users/add-user')}>
                            Add User
                        </Button>
                    </Space>
                </div>
                <Table
                    dataSource={users}
                    columns={columns}
                    loading={listLoading}
                    pagination={{
                        current: usersMeta.current_page,
                        pageSize: usersMeta.per_page,
                        total: usersMeta.total
                    }}
                    onChange={handleTableChange}
                />
            </>
        </div>
    );
};

export default UserPage;
