// FilterPopup.tsx
import React, { useState } from 'react';
import { Modal, Input, Form, Select } from 'antd';
import { UserFilter } from '../interface';
import FormItem from 'antd/es/form/FormItem';

interface FilterPopupProps {
    visible: boolean;
    onFilter: (filter: UserFilter) => void;
    onCancel: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ visible, onFilter, onCancel }) => {
    const [form] = Form.useForm();
    const handleApplyFilter = (filter: UserFilter) => {
        onFilter(filter);
        onCancel();
    };

    const handleOk = () => {
        form.submit();
    };

    return (
        <Modal title="Filter Users" visible={visible} onOk={handleOk} onCancel={onCancel}>
            <Form form={form} onFinish={handleApplyFilter} layout="vertical">
                <FormItem name="username" label="First Name">
                    <Input placeholder="Filter by Name" style={{ marginBottom: 16 }} />
                </FormItem>
                <FormItem name="email" label="Email">
                    <Input placeholder="Filter by Email" style={{ marginBottom: 16 }} />
                </FormItem>
                <FormItem name="city_id" label="City">
                    <Input placeholder="Filter by city" style={{ marginBottom: 16 }} />
                </FormItem>
                <FormItem name="cluster_id" label="Cluster">
                    <Input placeholder="Filter by cluster" style={{ marginBottom: 16 }} />
                </FormItem>
                <FormItem name="role_id" label="Role">
                    <Input placeholder="Filter by role" style={{ marginBottom: 16 }} />
                </FormItem>
                <FormItem name="status" label="Status">
                    <Select>
                        <Select.Option value="">All</Select.Option>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    );
};

export default FilterPopup;
