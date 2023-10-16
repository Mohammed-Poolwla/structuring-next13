'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUserData, getUser, getUsers, updateUserData } from './service';
import { LIST_META } from '@/utills/constant';
import { UserPayload, UserState } from './interface';

// Define an initial state
const initialState: UserState = {
    users: [],
    usersMeta: LIST_META,
    listLoading: true,
    user: null,
    status: 'loading',
    error: null
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (payload: UserPayload) => {
    const users = await getUsers(payload);
    return users;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (payload: { id: number }) => {
    const users = await getUser(payload.id);
    return users;
});

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userId, userData }: { userId: number; userData: any }) => {
        try {
            const updatedUser = await updateUserData(userId, userData);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: number) => {
    try {
        const deletedUser = await deleteUserData(userId);
        return deletedUser;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.listLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state: UserState, action: any) => {
                state.status = 'succeeded';
                state.listLoading = false;
                state.users = action.payload.data;
                state.usersMeta = action.payload.meta;
            })
            .addCase(fetchUsers.rejected, (state: UserState, action: any) => {
                state.status = 'failed';
                state.listLoading = false;
                state.error = action.error.message;
            })

            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state: UserState, action: any) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state: UserState, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state: UserState, action: any) => {
                state.status = 'succeeded';
                state.users = state?.users?.filter((user: any) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state: UserState, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectUserList = (state: any) => state.user.userList;

export default userSlice.reducer;
