"use client";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/app/api/apiSlice";
import { Attribute, ProductUpdateFormInputs, Variant } from "@/app/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { data, isLoading, error } = useGetProductByIdQuery(id as string);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Fetch all categories
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  // Initialize product state
  const [product, setProduct] = useState<ProductUpdateFormInputs>({
    title: "",
    price: 0,
    salePrice: 0,
    description: "",
    sku: "",
    images: [],
    stock: 0,
    category: "",
    status: "draft",
    attributes: [],
    tags: [],
    variants: [],
    _id: "",
  });

  // Update state when product data is fetched
  useEffect(() => {
    if (data?.product) {
      setProduct({
        title: data.product.title || "",
        price: data.product.price || 0,
        salePrice: data.product.salePrice || 0,
        description: data.product.description || "",
        sku: data.product.sku || "",
        images: data.product.images || [],
        stock: data.product.stock || 0,
        category: data.product.category?._id || "", // Match category ID
        status: data.product.status || "draft",
        attributes: data.product.attributes || [],
        tags: data.product.tags || [],
        variants: data.product.variants || [],
        _id: data.product._id || "",
      });
    }
  }, [data]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: ["price", "salePrice", "stock"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  // Handle array fields (e.g., tags, attributes, variants)
  const handleArrayChange = (
    field: keyof ProductUpdateFormInputs,
    index: number,
    updatedValue: string | Attribute | Variant,
  ) => {
    setProduct((prev) => {
      if (field === "tags") {
        // Handle tags (array of strings)
        const updatedTags = [...(prev.tags as string[])];
        updatedTags[index] = updatedValue as string;
        console.log(updatedTags);
        return {
          ...prev,
          tags: updatedTags,
        };
      } else if (field === "attributes") {
        // Handle attributes (array of objects)
        const updatedAttributes = [...(prev.attributes as Attribute[])];
        updatedAttributes[index] = updatedValue as Attribute;
        return {
          ...prev,
          attributes: updatedAttributes,
        };
      } else if (field === "variants") {
        // Handle variants (array of objects)
        const updatedVariants = [...(prev.variants as Variant[])];
        updatedVariants[index] = updatedValue as Variant;
        return {
          ...prev,
          variants: updatedVariants,
        };
      }
      return prev; // Fallback (should never reach here)
    });
  };

  // Add new item to array fields
  const addField = (field: keyof ProductUpdateFormInputs) => {
    setProduct((prev) => {
      if (field === "tags") {
        return { ...prev, tags: [...prev.tags, ""] };
      }
      if (field === "attributes") {
        return {
          ...prev,
          attributes: [...prev.attributes, { name: "", value: "" }],
        };
      }
      if (field === "variants") {
        return {
          ...prev,
          variants: [...prev.variants, { name: "", value: "" }],
        };
      }
      return prev;
    });
  };

  // Remove an item from array fields
  const removeField = (field: keyof ProductUpdateFormInputs, index: number) => {
    setProduct((prev) => {
      if (field === "tags") {
        const updatedTags = [...(prev.tags as string[])];
        updatedTags.splice(index, 1);
        return {
          ...prev,
          tags: updatedTags,
        };
      } else if (field === "attributes") {
        const updatedAttributes = [...(prev.attributes as Attribute[])];
        updatedAttributes.splice(index, 1);
        return {
          ...prev,
          attributes: updatedAttributes,
        };
      } else if (field === "variants") {
        const updatedVariants = [...(prev.variants as Variant[])];
        updatedVariants.splice(index, 1);
        return {
          ...prev,
          variants: updatedVariants,
        };
      }
      return prev;
    });
  };

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map((file) => file.name); // Assuming you only need file names
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...fileNames],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(product).unwrap(); // Call the mutation to update the product
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update product.");
    }
  };

  // Show loading state while fetching data
  if (isLoading || isCategoriesLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Show error message if data fetch fails
  if (error) {
    return (
      <p className="text-center text-red-500">Error fetching product data.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={product.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            id="sku"
            value={product.sku}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Sale Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sale Price
          </label>
          <input
            type="number"
            name="salePrice"
            id="salePrice"
            value={product.salePrice}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={product.stock}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          {isCategoriesLoading ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : (
            <select
              name="category"
              id="category"
              value={product.category}
              onChange={handleCategoryChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories?.categories?.map(
                (category: { _id: string; name: string }) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ),
              )}
            </select>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={product.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) =>
                    handleArrayChange("tags", index, e.target.value)
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeField("tags", index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addField("tags")}
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Tag
          </button>
        </div>

        {/* Attributes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attributes
          </label>
          {product.attributes.map((attribute, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Name"
                value={attribute.name}
                onChange={(e) =>
                  handleArrayChange("attributes", index, {
                    ...attribute,
                    name: e.target.value,
                  })
                }
                className="flex-1 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="text"
                placeholder="Value"
                value={attribute.value}
                onChange={(e) =>
                  handleArrayChange("attributes", index, {
                    ...attribute,
                    value: e.target.value,
                  })
                }
                className="flex-1 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => removeField("attributes", index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("attributes")}
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Attribute
          </button>
        </div>
        {/* Variants */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Variants
          </label>
          {product.variants.map((variant, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Name"
                value={variant.name}
                onChange={(e) =>
                  handleArrayChange("variants", index, {
                    ...variant,
                    name: e.target.value,
                  })
                }
                className="flex-1 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="text"
                placeholder="Value"
                value={variant.value}
                onChange={(e) =>
                  handleArrayChange("variants", index, {
                    ...variant,
                    value: e.target.value,
                  })
                }
                className="flex-1 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => removeField("variants", index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("variants")}
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Variant
          </button>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative border border-gray-300 rounded-md p-2"
              >
                <span>{image}</span>
                <button
                  type="button"
                  onClick={() => removeField("images", index)}
                  className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
