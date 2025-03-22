"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  otp: string;
  country: string;
  division: string;
  district: string;
  fullAddress: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      otp: "",
      country: "",
      division: "",
      district: "",
      fullAddress: "",
    },
  });

  interface Division {
    id: number;
    name: string;
  }
  interface District {
    id: number;
    name: string;
  }
  const [countries] = useState<string[]>(["Bangladesh"]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDivisions = async () => {
    if (!watch("country")) return;
    setIsLoading(true);
    try {
      const res = await axios.get("https://bdapi.editboxpro.com/api/divisions");
      const data = await res.data;
      setDivisions([...data]);
      console.log("divisions", data);
    } catch (error) {
      console.error("Error fetching divisions:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getDistricts = async () => {
    if (!watch("division")) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://bdapi.editboxpro.com/api/districts/${watch("division")}`
      );
      const data = await res.data;
      setDistricts([...data]);
      console.log("districts", data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const divisionsByCountry: Record<string, string[]> = {
  //     Bangladesh: ["Dhaka", "Chittagong", "Khulna"],
  //     "United States": ["California", "New York", "Texas", "Florida"],
  //     Canada: ["Ontario", "Quebec", "British Columbia"],
  //     "United Kingdom": ["England", "Scotland", "Wales"],
  //     Australia: ["New South Wales", "Victoria", "Queensland"],
  //     India: ["Maharashtra", "Karnataka", "Tamil Nadu"],
  //   };

  //   const districtsByDivision: Record<string, string[]> = {
  //     California: ["Los Angeles", "San Francisco", "San Diego"],
  //     "New York": ["Manhattan", "Brooklyn", "Queens"],
  //     Texas: ["Houston", "Austin", "Dallas"],
  //     Ontario: ["Toronto", "Ottawa", "Hamilton"],
  //     Queensland: ["Brisbane", "Gold Coast", "Sunshine Coast"],
  //     Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  //   };

  //   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const country = e.target.value;
  //     setDivisions(divisionsByCountry[country] || []);
  //     setDistricts([]);
  //   };

  //   const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const division = e.target.value;
  //     setDistricts(districtsByDivision[division] || []);
  //   };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsLoading(false);
    }, 2000);
  };

  const password = watch("password");

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md h-full mb-14 md:mb-0 lg:mb-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
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
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
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
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Contact Information
          </h3>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="123-456-7890"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Address</h3>

          {/* Country */}
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              {...register("country", { required: "Country is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country} onClick={getDivisions}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Division */}
          <div className="mb-4">
            <label
              htmlFor="division"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Division <span className="text-red-500">*</span>
            </label>
            <select
              id="division"
              {...register("division", { required: "Division is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Division</option>
              {isLoading && <option value="">Loading...</option>}
              {divisions?.map(({ id, name }) => (
                <option key={id} value={name} onClick={getDistricts}>
                  {name}
                </option>
              ))}
            </select>
            {errors.division && (
              <p className="text-red-500 text-sm mt-1">
                {errors.division.message}
              </p>
            )}
          </div>

          {/* District */}
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              District <span className="text-red-500">*</span>
            </label>
            <select
              id="district"
              {...register("district", { required: "District is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select District</option>
              {isLoading && <option value="">Loading...</option>}
              {districts?.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">
                {errors.district.message}
              </p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label
              htmlFor="fullAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="fullAddress"
              rows={4}
              placeholder="Enter your full address"
              {...register("fullAddress", {
                required: "Full Address is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
            />
            {errors.fullAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullAddress.message}
              </p>
            )}
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Security</h3>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password <span className="text-red-500">*</span>
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
            />
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* OTP */}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              {...register("otp")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4 mb- ">
          Already have an account ?{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
