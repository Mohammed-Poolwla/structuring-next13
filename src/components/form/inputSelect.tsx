// SearchableSelect.tsx

import React from 'react';
import { Form, Select, SelectProps } from 'antd';
const { Option } = Select;
interface SearchableSelectProps {
    options: { id: number | string; label: string }[];
    onSelect: (value: number | string) => void;
    isSearchable?: boolean;
    name: string;
    label: string;
    rules: { required: boolean; message: string }[];
}
const InputSelect: React.FC<SearchableSelectProps & SelectProps<number>> = ({
    name,
    label,
    rules,
    options,
    onSelect,
    isSearchable = false,
    ...selectProps
}) => {
    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Select<number>
                showSearch={isSearchable}
                filterOption={(input, option) => {
                    if (option && option.children && typeof option.children === 'string') {
                        return (
                            (option.children as string)
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        );
                    }
                    return false;
                }}
                onChange={onSelect}
                {...selectProps}
            >
                {options.map((item) => (
                    <Option key={item.id} value={item.id}>
                        {item.label}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default InputSelect;
