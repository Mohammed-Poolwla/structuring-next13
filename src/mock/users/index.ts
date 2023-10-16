import usersData from './json/users.json';
const mockUsers = (mock: any) => {
    mock.onGet('/api/v1/users').reply(200, {
        data: usersData
    });

    mock.onPost('/api/v1/users').reply((config: any) => {
        const userData = JSON.parse(config.data);
        usersData.push(userData);
        return [200, { message: 'Added successfully', data: userData }];
    });

    // mock.onPut(`/api/v1/users/3`).reply((config: any) => {
    //     const { userId } = config.params;
    //     const updatedUserData = JSON.parse(config.data);
    //     const updatedUserIndex = usersData.findIndex((user) => user.id === userId);
    //     if (updatedUserIndex !== -1) {
    //         usersData[updatedUserIndex] = { ...usersData[updatedUserIndex], ...updatedUserData };
    //         return [200, { data: usersData[updatedUserIndex] }];
    //     } else {
    //         return [404, { message: 'User not found' }];
    //     }
    // });

    mock.onPut('/api/v1/users/').reply((config: any) => {
        return [
            200,
            {
                success: true,
                message: 'User updated successfully.'
            }
        ];
    });

    mock.onDelete('/api/v1/users/:userId').reply((config: any) => {
        const userId = parseInt(config.url.split('/').pop(), 10);
        const index = usersData.findIndex((user: any) => user.id === userId);
        if (index !== -1) {
            usersData.splice(index, 1);
            return [200];
        } else {
            return [404, { message: 'User not found' }];
        }
    });
};
export { mockUsers };

// const mockUpdateUser = (mock: any, id: number) => {
//     mock.onPut(`/api/v1/users/:userId`).reply((config: any) => {
//       const { userId } = config.params;
//       const updatedUserData = JSON.parse(config.data);
//       const updatedUserIndex = usersData.findIndex((user) => user.id === userId);
//       if (updatedUserIndex !== -1) {
//         usersData[updatedUserIndex] = { ...usersData[updatedUserIndex], ...updatedUserData };
//         return [200, { data: usersData[updatedUserIndex] }];
//       } else {
//         return [404, { message: 'User not found' }];
//       }
//     });
//   };

//   export { mockUpdateUser };

//   const mockDeleteUser = (mock: any) => {
//     mock.onDelete('/api/v1/users/:userId').reply((config: any) => {
//         const userId = parseInt(config.url.split('/').pop(), 10);
//         const index = usersData.findIndex((user: any) => user.id === userId);
//         if (index !== -1) {
//             usersData.splice(index, 1);
//             return [200];
//         } else {
//             return [404, { message: 'User not found' }];
//         }
//     });
// };

// export { mockDeleteUser };
