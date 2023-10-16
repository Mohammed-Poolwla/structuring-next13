'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import AddEditUser from '../components/addEditUser';

const EditUserPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return (
        <div>
            <AddEditUser id={id} />
        </div>
    );
};

export default EditUserPage;
