import React from 'react';
import { Form, Input } from 'antd';
interface PasswordInputProps {
    name: string;
    label: string;
    rules: { required: boolean; message: string }[];
}

const PasswordInput = ({ name, label, rules }: PasswordInputProps) => {
    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Input.Password />
        </Form.Item>
    );
};

export default PasswordInput;
