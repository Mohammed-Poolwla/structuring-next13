import { RolesState } from '@/app/role/interface';
import { UserState } from '@/app/users/interface';

export interface RootStates {
    users: UserState;
    roleMapping: RolesState;
    roles: RolesState;
}
