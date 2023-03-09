 
import { apiSlice } from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getServiceMan: builder.query({
            query: ({ serviceId, date }) => ({
                url: `/bookings/booking-option?serviceId=${serviceId}&date=${date}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            providesTags: ["serviceMan"]
        }),
        getAllBooking: builder.query({
            query: ({keyword}) => ({
                url: `/bookings/allbooking?keyword=${keyword}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            providesTags: ["bookings"],
        }),
        getUserBookings: builder.query({
            query: ({email}) => ({
                url: `/bookings/user-booking?email=${email}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            providesTags: ["userBooking"],
        }),
        getOneBooking: builder.query({
            query: (id) => ({
                url: `/bookings/single-booking/${id}`,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
        }),
        createBooking: builder.mutation({
            query: (bookingData) => ({
                url: `/bookings/create-booking`,
                method: "POST",
                body: bookingData,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                },
            }),
            invalidatesTags: ["bookings", "serviceMan", "userBooking"],
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/bookings/service-booking/${id}`,
                method: "DELETE",
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                },
            }),
            invalidatesTags: ["bookings", "userBooking"],
        }),
        updateBooking: builder.mutation({
            query: ({id, updateData}) => ({
                url: `/bookings/service-booking/${id}`,
                method: "PUT",
                body: updateData,
                 headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                },
            }),
            invalidatesTags: ["bookings"],
        }),
    })
})

export const {
    useCreateBookingMutation,
    useGetServiceManQuery,
    useGetAllBookingQuery,
    useGetUserBookingsQuery,
    useGetOneBookingQuery,
    useDeleteBookingMutation,
    useUpdateBookingMutation,
    
} = authApi;