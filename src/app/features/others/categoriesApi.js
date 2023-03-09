import { apiSlice } from "../api/apiSlice";

const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: `/categorys/nav-bar`,
            }),
            providesTags: ["categories"],
        }),
        getMainCtg: builder.query({
            query: () => ({
                url: `/categorys/main-category`,
            }),
            providesTags: ["mainCtg"],
        }),
        getSubCtg1: builder.query({
            query: ({ mainCategory }) => ({
                url: `/categorys/sub-category1?mainCategory=${mainCategory}`,
            }),
            providesTags: ["subCtg1"],
        }),
        getSubCtg2: builder.query({
            query: ({ mainCategory, subCategory1 }) => ({
                url: `/categorys/sub-category2?mainCategory=${mainCategory}&subCategory1=${subCategory1}`,
            }),
            providesTags: ["subCtg2"],
        }),
        postCategory: builder.mutation({
            query: ({ mainCtg, subCtg_1, subCtg_2 }) => ({
                method: "POST",
                url: `/categorys/main-category?mainCategory=${mainCtg}&subCategory1=${subCtg_1}&subCategory2=${subCtg_2}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            }),
            invalidatesTags: ["categories", "mainCtg", "subCtg1", "subCtg2"],
        }),
    })
});

export const { useGetAllCategoryQuery, useGetMainCtgQuery, useGetSubCtg1Query, useGetSubCtg2Query,usePostCategoryMutation } = categoriesApi;