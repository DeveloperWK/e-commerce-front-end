// "use client";
// import { useGetCategoriesQuery } from "@/app/api/apiSlice";
// import { RootState, useAppSelector } from "@/app/store/store";
// import { CategoryFormInputs, FilterSidebarProps } from "@/app/types/types";
// import { useRouter, useSearchParams } from "next/navigation";
// import React from "react";

// const FilterSidebar: React.FC<FilterSidebarProps> = ({
//   handleCategoryChange,
//   handlePriceChange,
//   selectedCategory,
//   min,
//   max,
//   setMin,
//   setMax,
// }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { data: categories } = useGetCategoriesQuery({});
//   const isMobileFilterVisible = useAppSelector(
//     (state: RootState) => state.mobileFilterVisible
//   );

//   // Helper function to construct query parameters
//   const updateQueryParams = (newParams: { [key: string]: string | number }) => {
//     const params = new URLSearchParams(searchParams.toString());

//     // Update or delete query parameters based on the newParams object
//     Object.entries(newParams).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== "") {
//         params.set(key, String(value));
//       } else {
//         params.delete(key);
//       }
//     });

//     // Push the updated query parameters to the router
//     router.push(`?${params.toString()}`);
//   };

//   return (
//     <div
//       className={`w-64 p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800
//               dark:text-white z-50 overflow-y-auto fixed md:sticky top-16 left-0
//               h-[calc(100vh-4rem)] md:h-auto transform transition-transform duration-150 ease-in-out
//               ${
//                 isMobileFilterVisible
//                   ? "translate-x-0"
//                   : "-translate-x-full md:translate-x-0"
//               }`}
//       style={{ zIndex: 1000 }} // Ensure sidebar is above other elements
//     >
//       <h2 className="text-lg font-semibold mb-4">Filters</h2>

//       {/* Category Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-medium mb-2">Category</h3>
//         <ul className="space-y-2">
//           {categories?.categories?.map((category: CategoryFormInputs) => (
//             <li key={category._id}>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="category"
//                   value={category.name}
//                   checked={selectedCategory === category.name}
//                   onChange={() => {
//                     handleCategoryChange(category.name);
//                     updateQueryParams({ category: category.name });
//                   }}
//                   className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
//                 />
//                 <span className="ml-2">{category.name}</span>
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Price Range Filter */}
//       <div>
//         <h3 className="text-md font-medium mb-2">Price Range</h3>
//         <div className="flex space-x-4">
//           <input
//             type="number"
//             value={min}
//             onChange={(e) => {
//               const minValue = Number(e.target.value);
//               setMin(minValue);
//               updateQueryParams({ min: minValue });
//             }}
//             className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700"
//             placeholder="Min"
//           />
//           <input
//             type="number"
//             value={max}
//             onChange={(e) => {
//               const maxValue = Number(e.target.value);
//               setMax(maxValue);
//               updateQueryParams({ max: maxValue });
//             }}
//             className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//             placeholder="Max"
//           />
//         </div>
//         <button
//           onClick={() => {
//             handlePriceChange();
//             updateQueryParams({ min, max });
//           }}
//           className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out dark:bg-indigo-600 dark:hover:bg-indigo-700"
//         >
//           Apply Price
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;
"use client";
import { useGetCategoriesQuery } from "@/app/api/apiSlice";
import { RootState, useAppSelector } from "@/app/store/store";
import { CategoryFormInputs, FilterSidebarProps } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  handleCategoryChange,
  handlePriceChange,
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
    (state: RootState) => state.mobileFilterVisible
  );

  // Helper function to construct query parameters
  const updateQueryParams = (newParams: { [key: string]: string | number }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or delete query parameters based on the newParams object
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    // Push the updated query parameters to the router
    router.push(`?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    // Reset category
    handleCategoryChange("");

    // Reset price range
    setMin(0);
    setMax(1000);

    // Update the URL to remove all query parameters
    updateQueryParams({ category: "", min: 0, max: 1000 });
  };

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
              updateQueryParams({ min: minValue });
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
              updateQueryParams({ max: maxValue });
            }}
            className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Max"
          />
        </div>
        <button
          onClick={() => {
            handlePriceChange();
            updateQueryParams({ min, max });
          }}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out dark:bg-indigo-600 dark:hover:bg-indigo-700"
        >
          Apply Price
        </button>
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
