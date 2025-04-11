import {
  Carts,
  CategoryFormInputs,
  ProductFormInputs,
  ProductList,
  ReviewFormInputs,
  SignInFormValues,
  SignUpFormValues,
} from "@/app/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorage } from "../utility/storageUtils";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
    cache: "no-store",

    prepareHeaders: (headers) => {
      const token = getLocalStorage("token");
      headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Category"],
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page,
        category,
        limit,
        min,
        max,
      }: {
        page?: string;
        category?: string;
        limit?: string;
        min?: string;
        max?: string;
      }) => ({
        url: "/products",
        params: { page, category, limit, min, max },
      }),
      transformResponse: (response: ProductList) => response || [],
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }: { _id: string }) => ({
                type: "Product" as const,
                id: _id,
              })),
              { type: "Product" as const, id: "LIST" },
            ]
          : [{ type: "Product" as const, id: "LIST" }],

      // providesTags: ["Product"],
    }),
    products: builder.query({
      query: () => ({
        url: "/products",
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    signUp: builder.mutation({
      query: (data: SignUpFormValues) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    otpVerify: builder.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data: { email: string }) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: (data: SignInFormValues) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    search: builder.query({
      query: (q: string) => ({
        url: "/products/search",
        method: "GET",
        params: { q },
      }),
    }),
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: [{ type: "Category", id: "LIST" }],
    }),
    createCategory: builder.mutation({
      query: (data: CategoryFormInputs) => ({
        url: "/categories",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalStorage("token")}`,
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    createProduct: builder.mutation({
      query: (data: ProductFormInputs) => ({
        url: "/products",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalStorage("token")}`,
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
    updateProduct: builder.mutation({
      query: (data: ProductFormInputs) => ({
        url: `/products/${data._id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getProductById: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
      }),
      // providesTags: (result) =>
      //   result
      //     ? [
      //         { type: "Product" as const, id: result._id },
      //         { type: "Product" as const, id: "LIST" },
      //       ]
      //     : [{ type: "Product" as const, id: "LIST" }],
    }),
    createReview: builder.mutation({
      query: (data: ReviewFormInputs) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg._id },
        { type: "Product", id: "LIST" },
      ],
    }),
    createCart: builder.mutation({
      query: (data: Carts) => ({
        url: "/carts",
        method: "POST",
        body: data,
      }),
    }),
    getProductReviews: builder.query({
      query: (productId: string) => ({
        url: `/reviews/products/${productId}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSignUpMutation,
  useOtpVerifyMutation,
  useResendOtpMutation,
  useSignInMutation,
  useLazySearchQuery,
  useCreateCategoryMutation,
  useCreateProductMutation,
  useGetCategoriesQuery,
  useLazyGetProductsQuery,
  useDeleteProductMutation,
  useProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useCreateReviewMutation,
  useCreateCartMutation,
  useGetProductReviewsQuery,
} = apiSlice;
