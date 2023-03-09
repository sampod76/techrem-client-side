 
import { apiSlice } from "../api/apiSlice";
import { getUser } from "./dbUserSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomer: builder.query({
            query: ({ role, keyword }) => ({
                url: `/users/allusers?role=${role}&keyword=${keyword}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            providesTags: ["users"]
        }),
        getUserByEmail: builder.query({
            query: (email) => ({
                url: `/users/useremail?email=${email}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            providesTags: ["user"]
        }),
        register: builder.mutation({
            query: (user) => ({
                method: "POST",
                url: "/users/singleuser",
                body: user,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getUser(data.email))
                } catch (e) {
                    console.log(e.message)
                }
            },
        }),
        userUpdate: builder.mutation({
            query: (user) => ({
                method: "PUT",
                url: `/users/singleuser-email?email=${user.email}`,
                body: user,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            invalidatesTags: ["user"]
        }),
        updatePassword: builder.mutation({
            query: ({ password, email }) => ({
                method: "PUT",
                url: `/users/pass-update?email=${email}`,
                body: { password },
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                },
            }),
            invalidatesTags: ["user"]
        }),
        userDelete: builder.mutation({
            query: (user) => ({
                method: "DELETE",
                url: `/users/singleuser-email?email=${user.email}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            invalidatesTags: ["users"]
        }),
    })
})

export const {
    useRegisterMutation,
    useUserUpdateMutation,
    useGetAllCustomerQuery,
    useGetUserByEmailQuery,
    useUserDeleteMutation,
    useUpdatePasswordMutation
} = authApi;