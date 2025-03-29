// import Image from "next/image";
// import { Product } from "../types/types";
// const ProductCard = ({ product }: { product: Product }) => {
//   return (
//     <section className="w-50 h-[20rem] md:w-[15.625rem]  md:h-[18.75rem] bg-white  md:hover:shadow-lg md:hover:scale-105 transition-all dark:hover:shadow-lg dark:hover:scale-105 px-4 text-black py-4 border border-gray-300">
//       <Image
//         src="/images/pexels-mart-production-7679456.jpg"
//         width={1920}
//         height={1080}
//         alt="product"
//         className="w-100"
//       />
//       <p className="text-[1.2rem]">{product?.title}</p>
//       <section className="flex items-center gap-2 ">
//         <p className="text-blue-400 text-[1.2rem]">৳{product?.price}</p>
//         <p className="text-gray-400"> -50% </p>
//       </section>
//       <section>
//         <p>Reviews</p>
//       </section>
//       <section>
//         <p>{product?.status}</p>
//       </section>
//     </section>
//   );
// };

// export default ProductCard;
import { Star } from "lucide-react"; // or any other icon library you prefer
import Image from "next/image";
import { Product } from "../types/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group relative w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src="/images/pexels-mart-production-7679456.jpg"
          alt={product?.title || "Product image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Status Badge */}
        {product?.status && (
          <span className="absolute left-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
            {product.status}
          </span>
        )}
        {/* Discount Badge */}
        <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          50% OFF
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-1 truncate text-lg font-medium text-gray-900 dark:text-white">
          {product?.title}
        </h3>

        {/* Price Section */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ৳{product?.price}
          </span>
          <span className="text-sm text-gray-500 line-through dark:text-gray-400">
            ৳{product?.price * 2} {/* Assuming original price is double */}
          </span>
        </div>

        {/* Reviews */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            (24 reviews)
          </span>
        </div>

        {/* Add to Cart Button - Hidden until hover */}
        <button className="mt-3 w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
