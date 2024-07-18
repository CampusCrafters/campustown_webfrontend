import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
    users: [],
    likedUsers: [],
    matchedUsers: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>){
            state.users = action.payload;
        },
        setLikedUsers(state, action: PayloadAction<User[]>){    
            state.likedUsers = action.payload;
        },
        setMatchedUsers(state, action: PayloadAction<User[]>){
            state.matchedUsers = action.payload;
        }
    }
})  

export const { setUsers, setLikedUsers, setMatchedUsers } = usersSlice.actions;
export default usersSlice.reducer;

interface User {
    user_id: number;
    name: string;
    profile_picture: string;
}

interface UserState {
    users: User[];
    likedUsers: User[];
    matchedUsers: User[];
}