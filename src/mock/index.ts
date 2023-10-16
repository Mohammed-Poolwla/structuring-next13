import MockAdapter from 'axios-mock-adapter';
import { mockUsers } from './users';
import { mockRoles } from './role';
import { mockGroup } from './group';
import mockAuth from './auth';
import { mockCluster } from './cluster';
export default function applyMockAdapter(axiosInstance: any) {
    const mock = new MockAdapter(axiosInstance);
    mockUsers(mock);
    mockRoles(mock);
    mockCluster(mock);
    mockGroup(mock);
    mockAuth(mock);
}
