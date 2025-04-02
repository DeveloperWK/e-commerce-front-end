"use client";
import { useProductsQuery } from "@/app/api/apiSlice";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/app/types/types";
import WithNavbarLayout from "@/app/with-navbar";

const Products = () => {
  const { data: products, isLoading } = useProductsQuery({});
  return (
    <WithNavbarLayout>
      <section className="w-full py-4 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          products?.products?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </section>
    </WithNavbarLayout>
  );
};

export default Products;
