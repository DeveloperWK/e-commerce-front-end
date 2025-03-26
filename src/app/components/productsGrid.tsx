"use client";
import { useGetProductsQuery } from "@/app/api/apiSlice";
import ProductCard from "@/app/components/ProductCard";
import { RootState } from "@/app/store/store";
import { Product } from "@/app/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductsGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const searchResults = useSelector(
    (state: RootState) => state.searchResults.searchResults
  );
  const { data: productsData } = useGetProductsQuery({});
  const hasSearched = useSelector(
    (state: RootState) => state.hasSearched.hasSearched
  );
  useEffect(() => {
    if (hasSearched) {
      setProducts(searchResults);
    } else {
      setProducts(productsData?.products);
    }
  }, [hasSearched, searchResults, productsData]);

  return (
    <section className=" w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4   place-items-center">
      {products?.map((product: Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      {products?.length === 0 &&
        (hasSearched ? <p>No products found</p> : <p>No products available</p>)}
    </section>
  );
};

export default ProductsGrid;
