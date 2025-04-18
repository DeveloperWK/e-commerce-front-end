"use client";
import { SignInFormValues } from "@/app/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSignInMutation } from "../api/apiSlice";
import { useAuth } from "../hooks/useAuth";
import { getLocalStorage } from "../utility/storageUtils";

const SignInForm = ({
  heading,
  successLink,
}: {
  heading: string;
  successLink: string;
}) => {
  const [signIn, { isLoading, error, isError, data, isSuccess }] =
    useSignInMutation();
  const { signIn: signInAuth } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await signIn(data);
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Failed to sign in");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      signInAuth(data.token, data.role, data.userId);
      document.cookie = `role=${getLocalStorage("role")}; path=/;`;
      router.push(successLink as string);
    }
    if (isError) {
      toast.error("Failed to sign in");
    }
  }, [data, router, signInAuth, isError, isSuccess]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {heading}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@example.com"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading && <span className="loader"></span>}
              <span>{isLoading ? "Loading..." : "Sign In"}</span>
            </div>
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
          {isError && error && typeof error === "object" && "data" in error && (
            <p className="text-red-500 text-sm mt-1">
              {(error as { data: { message: string } }).data.message}
            </p>
          )}
          {isSuccess && data && (
            <p className="text-green-500 text-sm mt-1">{data?.message}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default SignInForm;
