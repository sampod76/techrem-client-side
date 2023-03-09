import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import auth from "../../../firebase/firebase.config.js";
const initialState = {
    user: {
        email: "",
        role: ""
    },
    isLoading: false,
    isError: false,
    error: ""
}
export const createUser = createAsyncThunk(
    "auth/createUser",
    async ({ email, password }) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        const user = { email: data.user.email, emailVerified: data.user.emailVerified, uid: data.user.uid };
        return user;
    }
);
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        const user = { email: data.user.email, emailVerified: data.user.emailVerified, uid: data.user.uid };
        return user;
    }
);
export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async () => {
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider);
        const user = { name: data.user.displayName, email: data.user.email, userImage: data.user.photoURL, emailVerified: data.user.emailVerified, uid: data.user.uid };
        return user;
    }
);
export const deleteUserAccount = createAsyncThunk(
    "auth/deleteUserAccount",
    async () => {
        const data = await deleteUser(auth.currentUser)
        console.log(data);
        return data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleIsError: (state) => {
            state.isError = false;
        },
        authLogoutSet: (state) => {
            state.user = { email: "", role: "" };
        },
    },
    extraReducers: (builder) => {
        // case setup for create user by email password 
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = { email: "", role: "" };
            state.isError = true;
            state.error = action.error.message;
        });
        // case setup for login by google 
        builder.addCase(googleLogin.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(googleLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(googleLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.user = { email: "", role: "" };
            state.isError = true;
            state.error = action.error.message;
        });
        // case setup for login user by email password 
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = { email: "", role: "" };
            state.isError = true;
            state.error = action.error.message;
        });
    }
})

export const { toggleIsError, authLogoutSet} = authSlice.actions;
export default authSlice.reducer;