"use client";
import { useGetCategoriesQuery } from "@/app/api/apiSlice";
import { RootState, useAppSelector } from "@/app/store/store";
import { CategoryFormInputs, FilterSidebarProps } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
const FilterSidebar: React.FC<FilterSidebarProps> = ({
  handleCategoryChange,
  selectedCategory,
  min,
  max,
  setMin,
  setMax,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories } = useGetCategoriesQuery({});
  const isMobileFilterVisible = useAppSelector(
    (state: RootState) => state.mobileFilterVisible,
  );
  // Helper function to construct query parameters
  const updateQueryParams = useCallback(
    (newParams: Record<string, string | number | undefined | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });
      router.push(`?${params.toString()}`);
      console.log("Updated query params:", params.toString());
    },
    [router, searchParams],
  );

  // Clear all filters
  const clearFilters = () => {
    // Reset category
    handleCategoryChange("");
    // Reset price range
    setMin(0);
    setMax(1000);
    // Update the URL to remove all query parameters
    updateQueryParams({
      category: null, // null/undefined will be removed from URL
      min: null,
      max: null,
    });
  };
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const minVal = Number(searchParams.get("min"));
    const maxVal = Number(searchParams.get("max"));
    handleCategoryChange(category);
    setMin(isNaN(minVal) ? 0 : minVal);
    setMax(isNaN(maxVal) ? 1000 : maxVal);
  }, []);

  return (
    <div
      className={`w-64 p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800
              dark:text-white z-50 overflow-y-auto fixed md:sticky top-16 left-0
              h-[calc(100vh-4rem)] md:h-auto transform transition-transform duration-150 ease-in-out
              ${
                isMobileFilterVisible
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }`}
      style={{ zIndex: 1000 }} // Ensure sidebar is above other elements
    >
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Category</h3>
        <ul className="space-y-2">
          {categories?.categories?.map((category: CategoryFormInputs) => (
            <li key={category._id}>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.name}
                  checked={selectedCategory === category.name}
                  onChange={() => {
                    handleCategoryChange(category.name);
                    updateQueryParams({ category: category.name });
                  }}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2">{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-md font-medium mb-2">Price Range</h3>
        <div className="flex space-x-4">
          <input
            type="number"
            value={min}
            onChange={(e) => {
              const minValue = Number(e.target.value);
              setMin(minValue);
            }}
            className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700"
            placeholder="Min"
          />
          <input
            type="number"
            value={max}
            onChange={(e) => {
              const maxValue = Number(e.target.value);
              setMax(maxValue);
            }}
            className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Max"
          />
        </div>
      </div>
      {/* Clear Filters Button */}
      <div className="mt-6">
        <button
          onClick={clearFilters}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-150 ease-in-out dark:bg-red-500 dark:hover:bg-red-600"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
