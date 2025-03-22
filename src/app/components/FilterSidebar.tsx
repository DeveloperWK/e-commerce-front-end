// // components/FilterSidebar.tsx
// "use client";
// import React, { useState } from "react";
// import { RootState, useAppSelector } from "../store/store";

// // interface FilterSidebarProps {
// //   categories: string[];
// //   onFilterChange: (filters: {
// //     category: string;
// //     minPrice: number;
// //     maxPrice: number;
// //   }) => void;
// // }

// const FilterSidebar: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [minPrice, setMinPrice] = useState<number>(0);
//   const [maxPrice, setMaxPrice] = useState<number>(1000);
//   const categories = ["Electronics", "Clothing", "Books", "Home & Kitchen"];
//   const onFilterChange = (filters: {
//     category: string;
//     minPrice: number;
//     maxPrice: number;
//   }) => {
//     console.log("Filters:", filters);
//   };
//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     onFilterChange({ category, minPrice, maxPrice });
//   };

//   const handlePriceChange = () => {
//     onFilterChange({ category: selectedCategory, minPrice, maxPrice });
//   };
//   const isMobileFilterVisible = useAppSelector(
//     (state: RootState) => state.mobileFilterVisible
//   );
//   return (
//     <div
//       className={`w-64 p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800
//               dark:text-white z-50 overflow-hidden md:block lg:block
//               sticky top-16 left-0 md:relative transition-transform duration-150 ease-in-out
//               ${
//                 isMobileFilterVisible
//                   ? "translate-x-0 h-screen"
//                   : "-translate-x-full hidden"
//               } md:translate-x-0`}
//     >
//       <h2 className="text-lg font-semibold mb-4">Filters</h2>

//       {/* Category Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-medium mb-2">Category</h3>
//         <ul className="space-y-2">
//           {categories.map((category) => (
//             <li key={category}>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="category"
//                   value={category}
//                   checked={selectedCategory === category}
//                   onChange={() => handleCategoryChange(category)}
//                   className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
//                 />
//                 <span className="ml-2">{category}</span>
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
//             value={minPrice}
//             onChange={(e) => setMinPrice(Number(e.target.value))}
//             className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700"
//             placeholder="Min"
//           />
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(Number(e.target.value))}
//             className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//             placeholder="Max"
//           />
//         </div>
//         <button
//           onClick={handlePriceChange}
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
import React, { useState } from "react";
import { RootState, useAppSelector } from "../store/store";

const FilterSidebar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const categories = ["Electronics", "Clothing", "Books", "Home & Kitchen"];
  const onFilterChange = (filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    console.log("Filters:", filters);
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({ category, minPrice, maxPrice });
  };

  const handlePriceChange = () => {
    onFilterChange({ category: selectedCategory, minPrice, maxPrice });
  };

  const isMobileFilterVisible = useAppSelector(
    (state: RootState) => state.mobileFilterVisible
  );

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
          {categories.map((category) => (
            <li key={category}>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2">{category}</span>
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
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700"
            placeholder="Min"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-1/2 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Max"
          />
        </div>
        <button
          onClick={handlePriceChange}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out dark:bg-indigo-600 dark:hover:bg-indigo-700"
        >
          Apply Price
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
