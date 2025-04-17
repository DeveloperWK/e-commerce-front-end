"use client";
import { useGetProductsQuery } from "@/app/api/apiSlice";
import Pagination from "@/app/components/Pagination";
import ProductTable from "@/app/components/ProductTable";
import { Product } from "@/app/types/types";
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
  const [products, setProducts] = useState<Product[]>([]);
  const { data: productsData, isLoading } = useGetProductsQuery({
    page: initialPage.toString(),
    limit: initialLimit,
  });
  console.log(productsData, isLoading);
  const totalPages = productsData?.totalPages || 1;

  useEffect(() => {
    setProducts(productsData?.products || []);
  }, [productsData]);

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

      <ProductTable products={products || []} />
      {/* <ProductForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
      /> */}
      <Pagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
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
