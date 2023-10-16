import React from 'react';
import { Form, Input } from 'antd';
interface TextareaInputProps {
    name: string;
    label: string;
    rules: { required: boolean; message: string }[];
}

const TextareaInput = ({ name, label, rules }: TextareaInputProps) => {
    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Input.TextArea />
        </Form.Item>
    );
};

export default TextareaInput;
