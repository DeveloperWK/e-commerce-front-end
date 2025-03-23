import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormValues } from "../types/types";
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
      query: (data: FormValues) => ({
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
  }),
});

export const {
  useGetProductsQuery,
  useSignUpMutation,
  useOtpVerifyMutation,
  useResendOtpMutation,
} = apiSlice;
console.log(process.env._NEXT_PUBLIC_API_BASE_URL);
