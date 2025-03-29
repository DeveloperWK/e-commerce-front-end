import Image from "next/image";
import Link from "next/link";
import React from "react";
import img from "../../../public/images/pexels-mart-production-7679456.jpg";
interface Product {
  id: string;
  name: string;
  price: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface ProductTrendingProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

const ProductTrending: React.FC<ProductTrendingProps> = ({
  products,
  title = "Trending Products",
  subtitle = "Discover our most popular items this week",
  showViewAll = true,
}) => {
  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
          {showViewAll && (
            <Link
              href="/shop"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all products
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-200">
                <Image
                  src={img}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link href={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  {product.isNew && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      Bestseller
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`h-4 w-4 ${
                        rating < product.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {product.discount ? (
                      <>
                        <p className="text-sm text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-lg font-semibold text-red-600">
                          $
                          {calculateDiscountedPrice(
                            product.price,
                            product.discount
                          ).toFixed(2)}
                          <span className="ml-1 text-sm font-normal text-red-600">
                            ({product.discount}% off)
                          </span>
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="ml-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductTrending;
