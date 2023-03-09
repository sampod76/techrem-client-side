import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import auth from "../../../firebase/firebase.config";


const initialState = {
    dbUser: {
        email: "",
        role: ""
    },
    isLoading: true,
    isError: false,
    error: ""
};
export const getUser = createAsyncThunk(
    "auth/getUser",
    async (email) => {
        const res = await fetch(`${process.env.REACT_APP_DEV_URL}/users/login?email=${email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `${localStorage.getItem('tech_token')}`,
            }
        });
        // console.log(res.status)
        // if (res.status === 401 || 403) {

        //     signOut(auth).then(() => {

        //     })
        // }
        const results = await res.json();
        // console.log(results)
        if (results?.success) {
            return results;
        } else {
            return results;
        }
    }
);
const dbUserSlice = createSlice({
    name: "dbAuth",
    initialState,
    reducers: {
        dbLogoutSet: (state) => {
            state.dbUser = { email: "", role: "" };
        },
    },
    extraReducers: (builder) => {
        // case setup for get user by email
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.success) {
                state.dbUser = action.payload.data;
            }
            else {
                state.dbUser = { email: "", role: "" };
            }
            state.isError = false;
            state.error = "";
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.dbUser = { email: "", role: "" };
            state.isError = true;
            state.error = action.error.message;
        });
    }
})

export const { dbLogoutSet } = dbUserSlice.actions;
export default dbUserSlice.reducer;