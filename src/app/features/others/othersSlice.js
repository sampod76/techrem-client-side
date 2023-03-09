import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addToCart: [],
    allSearchService: {},
    sideBar: false,
    darkThem: false,
    isLoading: false,
    isError: false,
    error: ""
}

const othersSlice = createSlice({
    name: "others",
    initialState,
    reducers: {
        toggleSideBar: (state) => {
            state.sideBar = !state.sideBar;
        },
        setAllService: (state, action) => {
            state.allSearchService = action.payload;
        },
    },
});

export const { toggleSideBar, setAllService } = othersSlice.actions;
export default othersSlice.reducer;









