 
import { apiSlice } from "../api/apiSlice";


const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postNewService: builder.mutation({
            query: (data) => ({
                url: "/services/single-service",
                method: "POST",
                body: data,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            invalidatesTags: ["allService"],
        }),
        getAllService: builder.query({
            query: ({priceSerial, keyword, mainCategory, subCategory1, subCategory2}) => ({
                url: `/services/allservices?sort=${priceSerial}&keyword=${keyword}&mainCategory=${mainCategory}&subCategory1=${subCategory1}&subCategory2=${subCategory2}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            providesTags: ["allService"],
        }),
        getAllServiceParaLess: builder.query({
            query: () => ({
                url: `/services/allservices`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            providesTags: ["allService"],
        }),
        getOneService: builder.query({
            query: (id) => ({
                url: `/services/single-service/${id}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/services/${id}`,
                method: "DELETE",
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            invalidatesTags: ["allService"],
        }),
       updateService: builder.mutation({
            query: ({id, updatedData}) => ({
                url: `/services/single-service/${id}`,
                method: "PUT",
                body: updatedData,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                },
            }),
            invalidatesTags: ["allService"],
        }),
    })
});


export const {
    usePostNewServiceMutation,
    useGetAllServiceQuery,
    useGetAllServiceParaLessQuery,
    useDeleteServiceMutation,
    useGetOneServiceQuery,
    useUpdateServiceMutation,
} = authApi;