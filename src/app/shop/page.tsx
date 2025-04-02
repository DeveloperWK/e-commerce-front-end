"use client";
import ProductsGrid from "@/app/components/productsGrid";
import WithNavbarLayout from "@/app/with-navbar";
import { Suspense } from "react";

// const ShopPage = () => {
//   return (
//     <WithNavbarLayout>
//       <section className="h-full grid grid-cols-1 md:grid-cols-[auto_1fr] p-4 gap-4">
//         <section className="w-64 sticky top-4 h-fit">
//           <FilterSidebar />
//         </section>
//         <ProductsGrid />
//       </section>
//     </WithNavbarLayout>
//   );
// };

const Shop = () => {
  return (
    <WithNavbarLayout>
      {/* Enable smooth scrolling */}
      <div className="scroll-smooth mb-16">
        <section className="h-full grid grid-cols-1 md:grid-cols-[auto_1fr] p-4 gap-4">
          {/* Filter Sidebar */}
          {/* <section className="w-64 sticky top-4 h-fit bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <FilterSidebar />
          </section> */}

          {/* Products Grid */}
          <section className="flex flex-col gap-4">
            <ProductsGrid />
          </section>
        </section>
      </div>
    </WithNavbarLayout>
  );
};

const ShopPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Shop />
    </Suspense>
  );
};
export default ShopPage;
