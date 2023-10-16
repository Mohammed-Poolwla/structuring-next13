import React from 'react';
import { Form, Input } from 'antd';

interface InputTextProps {
    name: string;
    label: string;
    rules: { required: boolean; message: string }[];
}
const InputText: React.FC<InputTextProps> = ({ name, label, rules }) => {
    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Input />
        </Form.Item>
    );
};

export default InputText;
