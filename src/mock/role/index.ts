import rolesData from './json/role.json';
import featuresData from './json/feature.json';
import permissionsData from './json/permission.json';
import { Role, Feature } from '@/app/role/slice';
import getPermissionData from './json/getPermission.json';

// Mock API for roles
const mockRoles = (mock: any) => {
    mock.onGet('/api/v1/roles').reply(200, {
        data: rolesData
    });

    // Mock for getting features list
    mock.onGet('/api/v1/masters/features').reply(200, {
        data: featuresData
    });

    // get role based permissions
    mock.onGet('/api/v1/permissions/${role_id}').reply((role_id: number) => {
        return [200, { data: getPermissionData }];
    });

    // Mock for adding roles
    mock.onPost('/api/v1/roles/create').reply((data: Role) => {
        const newRole = {
            id: Math.floor(Math.random() * 1000),
            name: data.name,
            label: data.label
        };
        rolesData.push(newRole);
        return [200, { message: 'Added successfully', data: newRole }];
    });

    // Mock for set permissions
    mock.onPost('/api/v1/permissions').reply((data: Feature) => {
        const newPermissions = {
            id: Math.floor(Math.random() * 1000),
            role_id: Math.floor(Math.random() * 1000),
            feature_id: Math.floor(Math.random() * 1000),
            name: data.name,
            slug: data.slug
        };
        permissionsData.push(newPermissions);
        return [200, { message: 'Added successfully', data: newPermissions }];
    });

    // Mock for editing roles
    mock.onPatch('/api/v1/roles/{data.id}').reply((data: Role) => {
        console.log('data', data);
        const roleId = data.id;
        const updatedRolesData = rolesData.map((role: Role) =>
            role.id === roleId ? { ...role, name: data.name, label: data.label } : role
        );
        return [200, { message: 'Edited successfully', data: updatedRolesData }];
    });

    // Mock for deleting roles
    mock.onDelete('/api/v1/roles/{data.id}').reply((id: number) => {
        const updatedRolesData = rolesData.filter((role) => role.id !== id);
        return [200, { message: 'Deleted successfully', data: updatedRolesData }];
    });
    mock.onGet('/api/v1/roles/${id}').reply((id: any) => {
        const role = rolesData.find((r: Role) => r.id === id);

        if (role) {
            return [200, { message: 'Fetched successfully', data: role }];
        } else {
            return [404, { message: 'Role not found', data: null }];
        }
    });
};

export { mockRoles };
