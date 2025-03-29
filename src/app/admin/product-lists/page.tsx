"use client";
import { useGetProductsQuery } from "@/app/api/apiSlice";
import ProductTable from "@/app/components/ProductTable";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialLimit = searchParams.get("limit") || "8";
  const [limit, setLimit] = useState(initialLimit);
  const [currentPage, setCurrentPage] = useState(initialPage);
  // const [products, setProducts] = useState<Product[]>([]);
  const { data: productsData, isLoading } = useGetProductsQuery({
    page: initialPage.toString(),
    limit: initialLimit,
  });
  const totalPages = productsData?.totalPages || 1;

  // useEffect(() => {
  //   setProducts(productsData?.products || []);
  // }, [productsData]);

  useEffect(() => {
    if (isLoading) {
      toast.info("Loading...", { autoClose: 2000 });
    }
  }, [isLoading]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams(page, limit);
  };
  const handleLimitChange = (newLimit: string) => {
    setLimit(newLimit);
    setCurrentPage(1);
    updateQueryParams(1, newLimit);
  };
  const updateQueryParams = (page: number, limit?: string) => {
    if (page < 1 || isNaN(page)) return;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    newParams.set("limit", limit!);
    router.push(`?${newParams.toString()} `);
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Products
        </h1>
        <section className="flex items-center space-x-2">
          <Link
            href="/admin/create-products"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </Link>
          <select
            name="limit"
            id="limit"
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-200"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            {/* <option value="50">50</option>
            <option value="100">100</option> */}
          </select>
        </section>
      </div>

      <ProductTable products={productsData?.products || []} />
      {/* <ProductForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
      /> */}
      <section className="w-full flex flex-wrap justify-center mt-4 space-x-2">
        {totalPages > 1 && (
          <div className="w-full flex flex-wrap justify-center mt-4 space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
const ProductLists = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
};
export default ProductLists;
