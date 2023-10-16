import regionData from './json/cluster.json';

const mockCluster = (mock: any) => {
    // Mock API endpoint for getting regions
    mock.onGet('/api/v1/masters/clusters').reply(200, {
        data: regionData
    });

    mock.onPost('/api/v1/masters/clusters').reply((data: any) => {
        const newRegion = {
            name: data.name,
            slug: Math.floor(Math.random() * 1000),
            status: 'active'
        };
        regionData.push(newRegion);
        return [200, { message: 'added successfully', data: newRegion }];
    });

    // Mock API endpoint for editing a region
    mock.onPatch('/api/v1/masters/clusters/{id}`').reply((data: any) => {
        const slug = data.slug;
        const updatedRolesData = regionData.map((region: any) =>
            region.slug === slug ? { ...region, name: data.name } : region
        );
        return [200, { message: 'Edited successfully', data: updatedRolesData }];
    });

    // Mock API endpoint for deleting a region
    mock.onDelete(`/api/v1/masters/clusters/{data.id}`).reply((data: any) => {
        const updatedRegion = regionData.filter((region) => region.slug !== data.id);
        return [200, { message: 'Deleted successfully', data: updatedRegion }];
    });
};

export { mockCluster };
