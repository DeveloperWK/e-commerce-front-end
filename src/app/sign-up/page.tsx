"use client";
import { useSignUpMutation } from "@/app/api/apiSlice";
import { District, Division, SignUpFormValues } from "@/app/types/types";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [signUp, { error: submitError, isSuccess, data }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: [
        {
          country: "Bangladesh",
          division: "",
          district: "",
          isDefault: false,
          fullAddress: "",
        },
      ],
    },
  });
  const [countries] = useState<string[]>(["Bangladesh"]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });

  const togglePasswordVisibility = () =>
    setIsVisible((prev) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }));

  const toggleConfirmPasswordVisibility = () =>
    setIsVisible((prev) => ({
      ...prev,
      isConfirmPasswordVisible: !prev.isConfirmPasswordVisible,
    }));

  const router = useRouter();

  const getDivisions = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://bdapi.editboxpro.com/api/divisions");
      const data = await res.data;
      setDivisions([...data]);
    } catch (error) {
      console.error("Error fetching divisions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDivisions();
  }, []);

  const getDistricts = async () => {
    if (!watch("address.0.division")) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://bdapi.editboxpro.com/api/districts/${watch(
          "address.0.division"
        )}`
      );
      const data = await res.data;
      setDistricts([...data]);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      setIsLoading(true);
      await signUp(data);
      toast.success("Form submitted successfully!");
      router.push(`/confirm-otp?email=${encodeURIComponent(data.email)}`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form");
    }
  };

  const password = watch("password");

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md h-full mb-14 md:mb-0 lg:mb-0">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center underline">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Contact Information
          </h3>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="johndoe@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="123-456-7890"
              autoComplete="tel"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Address
          </h3>
          {/* Country */}
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              onClick={getDivisions}
              {...register("address.0.country", {
                required: "Country is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.address?.[0]?.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address?.[0]?.country?.message}
              </p>
            )}
          </div>
          {/* Division */}
          <div className="mb-4">
            <label
              htmlFor="division"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Division <span className="text-red-500">*</span>
            </label>
            <select
              id="division"
              onClick={getDistricts}
              {...register("address.0.division", {
                required: "Division is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
            >
              <option value="">Select Division</option>
              {isLoading && <option value="">Loading...</option>}
              {divisions?.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.address?.[0]?.division && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address?.[0]?.division?.message}
              </p>
            )}
          </div>
          {/* District */}
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              District <span className="text-red-500">*</span>
            </label>
            <select
              id="district"
              {...register("address.0.district", {
                required: "District is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
            >
              <option value="">Select District</option>
              {isLoading && <option value="">Loading...</option>}
              {districts?.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.address?.[0]?.district && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address?.[0]?.district?.message}
              </p>
            )}
          </div>
          {/* Full Address */}
          <div>
            <label
              htmlFor="fullAddress"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="fullAddress"
              rows={4}
              placeholder="Enter your full address"
              {...register("address.0.fullAddress", {
                required: "Address is required",
              })}
              autoComplete="address"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Security
          </h3>
          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={isVisible.isPasswordVisible ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400"
              >
                {isVisible.isPasswordVisible ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={isVisible.isConfirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400"
              >
                {isVisible.isConfirmPasswordVisible ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading && <span className="loader"></span>}
              <span>{isLoading ? "Loading..." : "Sign Up"}</span>
            </div>
          </button>
          {submitError && (
            <p className="text-red-500 text-sm mt-1">
              {(submitError as Error).message}
            </p>
          )}
          {isSuccess && (
            <p className="text-green-500 text-sm mt-1">{data.message}</p>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb- ">
          Already have an account ?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign In
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
