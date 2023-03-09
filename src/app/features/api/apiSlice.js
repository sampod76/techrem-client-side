import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_DEV_URL,
    }),
    tagTypes: [
        "allService", "users", "user", "bookings", "activity", "serviceMan",
        "categories", "mainCtg", "subCtg1", "subCtg2","userBooking",
    ],
    endpoints: (builder) => ({}),
});