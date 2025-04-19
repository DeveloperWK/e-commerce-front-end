import { CategoryFormInputs, CategoryFilterProps } from "@/app/types/types";
import React from "react";
const CategoryFilter = ({
  categories,
  selectedCategory,
  handleCategoryChange,
  updateQueryParams,
}: CategoryFilterProps) => {
  return (
    <>
      <section className="mb-6 h-1/3 overflow-y-scroll md:h-1/2">
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
      </section>
    </>
  );
};
export default CategoryFilter;
