import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/app/types/types";

interface ProductListProps {
  isLoading: boolean;
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ isLoading, products }) => {
  return (
    <section className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
      {isLoading && (
        <div className="w-full flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      )}

      {!isLoading &&
        products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}

      {!isLoading && products.length === 0 && (
        <p className="text-center text-gray-500">
          No products found. Try adjusting your filters.
        </p>
      )}
    </section>
  );
};

export default ProductList;
