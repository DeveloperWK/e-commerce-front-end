import { CategoryTrendingProps } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// interface Category {
//   id: string;
//   name: string;
//   imageUrl: string;
//   productCount: number;
//   isTrending?: boolean;
// }

// interface CategoryTrendingProps {
//   categories: Category[];
//   title?: string;
//   subtitle?: string;
//   columns?: number;
// }

const CategoryTrending: React.FC<CategoryTrendingProps> = ({
  categories,
  title = "Trending Categories",
  subtitle = "Shop by popular categories",
  columns = 4,
}) => {
  // Responsive column classes
  const gridClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  }[columns];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid ${gridClasses} gap-6`}>
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-white">
                    {category.productCount} products
                  </p>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/categories/${category.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                </div>
                {category.isTrending && (
                  <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">
                    Trending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-10 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-300"
          >
            Browse all categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default CategoryTrending;
