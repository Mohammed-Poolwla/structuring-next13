import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';
import useDebounce from '@/hooks/useDebounce';
interface InputSearchProps {
    onSearch: (filter: any) => void; // Update the type to include the expected parameter
}
const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        onSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    return (
        <div>
            <AutoComplete
                placeholder="Search by Name"
                value={searchQuery}
                onChange={handleSearch}
                style={{ width: 200, marginLeft: 10 }}
            />
        </div>
    );
};

export default InputSearch;
