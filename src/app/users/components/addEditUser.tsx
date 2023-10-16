'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Select, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { addUser, getCities, getCluster, getRoles, getUser, updateUserData } from '../service';
import { User, citiesI, clusterI, roleI } from '../interface';

const { Option }: any = Select;
interface IAddEditUserProps {
    id?: number;
}

const AddEditUser = ({ id }: IAddEditUserProps) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [cities, setCities] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitionLoading, setSubmitionLoading] = useState(false);

    useEffect(() => {
        getUserCities();
        getUserCluster();
        getUserRoles();
        if (id) {
            setLoading(true);
            getUser(id)
                .then((res) => {
                    const userData = res?.data;
                    const data = { ...userData[0], cluster_id: 15 };
                    form.setFieldsValue(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    }, []);

    const onFinish = (formData: User) => {
        setSubmitionLoading(true);
        if (id) {
            updateUserData(id, formData)
                .then((el) => {
                    notification.success({
                        message: 'User Updated',
                        description: el?.message
                    });
                    router.push('/users');
                    setSubmitionLoading(false);
                })
                .catch((error: any) => {
                    notification.error({
                        message: 'Error',
                        description: error?.response?.data.message
                    });
                    setSubmitionLoading(false);
                });
        } else {
            addUser(formData)
                .then((el) => {
                    notification.success({
                        message: 'User Added',
                        description: el?.message
                    });
                    router.push('/users');
                    setSubmitionLoading(false);
                })
                .catch((error: any) => {
                    notification.error({
                        message: 'Error',
                        description: error?.response?.data.message
                    });
                    setSubmitionLoading(false);
                });
        }
    };

    const getUserCities = () => {
        getCities()
            .then((res) => {
                setCities(res?.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    const getUserCluster = () => {
        getCluster()
            .then((res) => {
                setClusters(res?.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    const getUserRoles = () => {
        getRoles()
            .then((res) => {
                setRoles(res?.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    const renderCityOptions = () => {
        return cities?.map((city: citiesI) => (
            <Option key={city.id} value={city.id}>
                {city.name}
            </Option>
        ));
    };

    const renderClusterOptions = () => {
        return clusters?.map((cluster: clusterI) => (
            <Option key={cluster.id} value={cluster.id}>
                {cluster.name}
            </Option>
        ));
    };

    const renderRoleOptions = () => {
        return roles?.map((role: roleI) => (
            <Option key={role?.id} value={role?.id}>
                {role?.name}
            </Option>
        ));
    };

    return (
        <div>
            {loading === true ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}
                >
                    <Spin size="large" />
                </div>
            ) : (
                <div style={{ padding: '20px' }}>
                    <h1>Add User</h1>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        initialValues={{ status: 'active' }}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[{ required: true, message: 'Please enter First Name' }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[{ required: true, message: 'Please enter Last Name' }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                        {!id ? (
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please enter Password' }]}
                            >
                                <Input placeholder="Password" type="password" />
                            </Form.Item>
                        ) : (
                            ''
                        )}

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter Email' },
                                { type: 'email', message: 'Please enter a valid Email' }
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            name="role_id"
                            rules={[{ required: true, message: 'Please select a Role' }]}
                        >
                            <Select placeholder="Select a role">{renderRoleOptions()}</Select>
                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city_id"
                            rules={[{ required: true, message: 'Please select a City' }]}
                        >
                            <Select placeholder="Select a city">{renderCityOptions()}</Select>
                        </Form.Item>
                        <Form.Item
                            label="Cluster"
                            name="cluster_id"
                            rules={[{ required: true, message: 'Please select a Cluster' }]}
                        >
                            <Select placeholder="Select a cluster">{renderClusterOptions()}</Select>
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Select placeholder="Select a status">
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="inactive">Inactive</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                            <Button type="primary" htmlType="submit" loading={submitionLoading}>
                                Submit
                            </Button>
                            <Button type="primary" onClick={() => router.push('/users')}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default AddEditUser;
