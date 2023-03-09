 
import { apiSlice } from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllActivity: builder.query({
            query: (url) => ({
                url: url,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            providesTags: ["activity"],
        }),

        getSingleActivity: builder.query({
            query: (id) => ({
                url: `/activity/${id}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
        }),

    })
})

export const {
    useGetAllActivityQuery,
    useGetEmployeeActivityQuery,
    useGetSingleActivityQuery
} = authApi;