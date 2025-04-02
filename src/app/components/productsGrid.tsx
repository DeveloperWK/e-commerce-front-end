"use client";
import { useGetProductsQuery } from "@/app/api/apiSlice";
import ProductCard from "@/app/components/ProductCard";
import { RootState } from "@/app/store/store";
import { Product } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FilterSidebar from "./FilterSidebar";
const ProductsGrid = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(1000);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [products, setProducts] = useState<Product[]>([]);
  const searchResults = useSelector(
    (state: RootState) => state.searchResults.searchResults
  );
  const { data: productsData, isLoading } = useGetProductsQuery({
    page: currentPage.toString(),

    ...(selectedCategory && { category: selectedCategory }),
    ...(min !== 0 && { min: min.toString() }),
    ...(max !== 1000 && { max: max.toString() }),
  });
  console.log(productsData);
  const totalPages = productsData?.totalPages || 1;
  const hasSearched = useSelector(
    (state: RootState) => state.hasSearched.hasSearched
  );

  const onFilterChange = (filters: {
    category: string;
    min: number;
    max: number;
  }) => {
    console.log("Filters:", filters);
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({ category, min, max });
  };

  const handlePriceChange = () => {
    onFilterChange({ category: selectedCategory, min, max });
  };
  useEffect(() => {
    if (hasSearched) {
      setProducts(searchResults || []);
    } else {
      setProducts(productsData?.products || []);
    }
  }, [hasSearched, searchResults, productsData]);

  useEffect(() => {
    if (isLoading) {
      toast.info("Loading...", { autoClose: 2000 });
    }
  }, [isLoading]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams(page);
  };

  const updateQueryParams = (page: number) => {
    if (page < 1 || isNaN(page)) return;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    router.push(`?${newParams.toString()}`);
  };

  const activeProducts = products?.filter(
    (product) => product.status === "active"
  );
  console.log(activeProducts);
  return (
    <section className="flex flex-col lg:flex-row">
      {/* Filter Sidebar */}
      <section className="w-full lg:w-64 sticky top-4 h-fit bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 lg:mr-4 z-10">
        <FilterSidebar
          handleCategoryChange={handleCategoryChange}
          handlePriceChange={handlePriceChange}
          selectedCategory={selectedCategory}
          min={min}
          max={max}
          setMin={setMin}
          setMax={setMax}
        />
      </section>

      {/* Product Grid and Pagination */}
      <section className="flex-1">
        {/* Product Grid */}
        <section className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
          {isLoading && (
            <div className="w-full flex justify-center items-center h-64">
              <p>Loading...</p>
            </div>
          )}
          {!isLoading &&
            activeProducts?.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}

          {activeProducts?.length === 0 && (
            <p className="text-center text-gray-500">
              {hasSearched
                ? "No products found. Try adjusting your search."
                : "No products available."}
            </p>
          )}
        </section>

        {/* Pagination Controls */}
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}

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
      </section>
    </section>
  );
};

export default ProductsGrid;
