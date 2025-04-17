"use client";
import FilterSidebar from "@/app/components/FilterSidebar";
import Pagination from "@/app/components/Pagination";
import ProductList from "./ProductList";
import useProductFilters from "@/app/hooks/useProductFilters";
const ProductsGrid = () => {
  const {
    selectedCategory,
    min,
    max,
    setMin,
    setMax,
    handleCategoryChange,
    currentPage,
    handlePageChange,
    totalPages,
    activeProducts,
    isLoading,
  } = useProductFilters();
  return (
    <section className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <section className="w-full lg:w-64 sticky top-4 h-fit bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 lg:mr-4 z-10">
        <FilterSidebar
          handleCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          min={min}
          max={max}
          setMin={setMin}
          setMax={setMax}
        />
      </section>

      {/* Product Grid + Pagination */}
      <section className="flex-1">
        <ProductList isLoading={isLoading} products={activeProducts} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </section>
    </section>
  );
};

export default ProductsGrid;
