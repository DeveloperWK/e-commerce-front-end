"use client";
import { Product } from "@/app/types/types";

const ProductTable = ({ products }: { products: Product[] }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="overflow-x-auto p-1">
        {" "}
        {/* Added subtle padding */}
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 min-w-[600px]">
          {" "}
          {/* Minimum width */}
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                SKU
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Sale Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Stock
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {product.sku}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white max-w-[200px] truncate">
                  {" "}
                  {/* Truncate long names */}
                  {product.title}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  ৳ {product.price.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  ৳ {product.salePrice?.toFixed(2) || "-"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {product.stock}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {/* Action buttons */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default ProductTable;
