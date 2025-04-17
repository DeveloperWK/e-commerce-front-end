import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { toast } from "react-toastify";
import { Product } from "@/app/types/types";
import { useGetProductsQuery } from "@/app/api/apiSlice";
import { useDebounce } from "@/app/hooks/useDebounce";

const useProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialCategory = searchParams.get("category") || "";
  const initialMin = parseInt(searchParams.get("min") || "0", 10);
  const initialMax = parseInt(searchParams.get("max") || "1000", 10);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [products, setProducts] = useState<Product[]>([]);
  const searchResults = useSelector(
    (state: RootState) => state.searchResults.searchResults,
  );
  const hasSearched = useSelector(
    (state: RootState) => state.hasSearched.hasSearched,
  );
  const debounceMin = useDebounce(min, 500);
  const debounceMax = useDebounce(max, 500);
  const { data: productsData, isLoading } = useGetProductsQuery({
    page: currentPage.toString(),
    ...(selectedCategory && { category: selectedCategory }),
    ...(debounceMin !== 0 && { min: debounceMin.toString() }),
    ...(debounceMax !== 1000 && { max: debounceMax.toString() }),
  });
  console.log({
    page: currentPage.toString(),
    ...(selectedCategory && { category: selectedCategory }),
    ...(debounceMin !== 0 && { Min: debounceMin.toString() }),
    ...(debounceMax !== 1000 && { Max: debounceMax.toString() }),
  });
  const totalPages = productsData?.totalPages || 1;

  useEffect(() => {
    if (hasSearched) {
      setProducts(searchResults || []);
    } else {
      setProducts(productsData?.products || []);
    }
  }, [hasSearched, searchResults, productsData]);

  useEffect(() => {
    if (isLoading) {
      toast.info("Loading...", { autoClose: 1000 });
    }
  }, [isLoading]);

  // ✅ Update URL whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    if (selectedCategory) params.set("category", selectedCategory);
    if (min !== 0) params.set("min", min.toString());
    if (max !== 1000) params.set("max", max.toString());
    router.push(`?${params.toString()}`);
  }, [
    selectedCategory,
    debounceMin,
    debounceMax,
    currentPage,
    min,
    max,
    router,
  ]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const activeProducts = products.filter(
    (product) => product.status === "active",
  );

  return {
    selectedCategory,
    min,
    max,
    setMin,
    setMax,
    handleCategoryChange: setSelectedCategory,
    currentPage,
    handlePageChange,
    totalPages,
    activeProducts,
    isLoading,
  };
};

export default useProductFilters;
