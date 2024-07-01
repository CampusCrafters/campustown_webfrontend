import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
    users: [],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>){
            state.users = action.payload;
        }
    }
})  

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

interface User {
    user_id: number;
    name: string;
    profile_picture: string;
}

interface UserState {
    users: User[];
}