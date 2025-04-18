"use client";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "@/app/api/apiSlice";
import { category, CategoryFormInputs } from "@/app/types/types";
import React from "react";
import { useForm } from "react-hook-form";
const CreateCategoryForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInputs>();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { refetch, data } = useGetCategoriesQuery({});
  const onSubmit = (data: CategoryFormInputs) => {
    createCategory(data);
    refetch();
  };
  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-md ">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Create New Category
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Parent Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Parent Category
            </label>
            <select
              {...register("parent")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">None (Top-level category)</option>
              {data?.categories?.map((category: category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
          >
            {isLoading ? "Creating..." : "Save Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateCategoryForm;
