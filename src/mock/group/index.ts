import groupsData from './json/groups.json';
const mockGroup = (mock: any) => {
    mock.onGet('/api/v1/masters/cities').reply(200, {
        data: groupsData
    });

    // Mock for adding groups

    mock.onPost('/api/v1/masters/cities').reply((data: any) => {
        // const requestData = JSON.parse(data);

        const newGroups = {
            id: Math.floor(Math.random() * 1000),

            name: data.name,

            status: data.status
        };

        // groupsData.push(newGroups);

        return [200, { message: 'added successfully', data: newGroups }];
    });

    // Mock for editing groups
    mock.onPatch('/api/v1/masters/cities/{data.id}').reply((data: any) => {
        console.log(data);

        const requestData = JSON.parse(data.data);
        console.log('data', requestData);

        const groupId = requestData.id;
        console.log(groupId);

        const updatedGroupsData = groupsData.map((group: any) =>
            group.id === groupId ? { name: requestData.name } : group
        );

        return [200, { message: 'edited successfully', data: updatedGroupsData }];
    });

    mock.onGet('/api/v1/masters/cities/{id}').reply(200, {
        data: groupsData
    });

    mock.onDelete('/api/v1/masters/cities/{id}').reply((config: any) => {
        const group_id = parseInt(config.url?.split('/').pop() || '');

        const updatedGroupsData = groupsData.filter((group: any) => group.id !== group_id);

        return [200, { message: 'Deleted successfully', data: updatedGroupsData }];
    });
};

export { mockGroup };
