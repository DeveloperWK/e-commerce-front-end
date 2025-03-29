"use client";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "@/app/api/apiSlice";
import { CategoryFormInputs, ProductFormInputs } from "@/app/types/types";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateProductForm: React.FC = () => {
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  // const { refetch } = useGetProductsQuery({});
  // const [getProducts] = useLazyGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery({});
  console.log("Categories:", categories);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      stock: 0,
      category: "",
      status: "draft",
      images: [],
      attributes: [],
      tags: [],
      variants: [],
    },
  });

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: ProductFormInputs) => {
    createProduct(data);
    // refetch();
    console.log("Product Data:", data);
  };
  if (isSuccess) {
    toast.success("Product created successfully");
    // getProducts({ page: "1" });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-md"
    >
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* SKU */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          SKU <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("sku", { required: "SKU is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.sku && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.sku.message}
          </p>
        )}
      </div>
      {/* Slug */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Slug <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("slug", { required: "Slug is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.slug && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.slug.message}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" },
            valueAsNumber: true,
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.price && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* Stock */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register("stock", {
            required: "Stock is required",
            min: { value: 0, message: "Stock cannot be negative" },
            valueAsNumber: true,
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.stock && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.stock.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          {...register("category", { required: "Category is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories?.categories?.map((category: CategoryFormInputs) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Images */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Images
        </label>
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <div>
              {field.value.map((image, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => {
                      const newImages = [...field.value];
                      newImages[index] = e.target.value;
                      field.onChange(newImages);
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = field.value.filter(
                        (_, i) => i !== index
                      );
                      field.onChange(newImages);
                    }}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => field.onChange([...field.value, ""])}
                className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500"
              >
                Add Image
              </button>
            </div>
          )}
        />
      </div>

      {/* Attributes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Attributes
        </label>
        {attributeFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              {...register(`attributes.${index}.name`, {
                required: "Attribute name is required",
              })}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Value"
              {...register(`attributes.${index}.value`, {
                required: "Attribute value is required",
              })}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => removeAttribute(index)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendAttribute({ name: "", value: "" })}
          className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500"
        >
          Add Attribute
        </button>
      </div>

      {/* Variants */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Variants
        </label>
        {variantFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              {...register(`variants.${index}.name`, {
                required: "Variant name is required",
              })}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Value"
              {...register(`variants.${index}.value`, {
                required: "Variant value is required",
              })}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendVariant({ name: "", value: "" })}
          className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500"
        >
          Add Variant
        </button>
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          {...register("status")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <div>
              {field.value.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => {
                      const newTags = [...field.value];
                      newTags[index] = e.target.value;
                      field.onChange(newTags);
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newTags = field.value.filter((_, i) => i !== index);
                      field.onChange(newTags);
                    }}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => field.onChange([...field.value, ""])}
                className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500"
              >
                Add Tag
              </button>
            </div>
          )}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
      >
        {isLoading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default CreateProductForm;
