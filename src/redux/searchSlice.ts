import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchState = {
    searchQuery: null
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>){
            state.searchQuery = action.payload;
        }
    }
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;


interface SearchState {
    searchQuery: string | null;
}

