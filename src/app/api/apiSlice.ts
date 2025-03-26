import {
  CategoryFormInputs,
  ProductFormInputs,
  SignInFormValues,
  SignUpFormValues,
} from "@/app/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorage } from "../utility/storageUtils";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
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
    }),
    getCategories: builder.query({
      query: () => "/categories",
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
} = apiSlice;
