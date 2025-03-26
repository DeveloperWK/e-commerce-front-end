"use client";
import FilterSidebar from "@/app/components/FilterSidebar";
import ProductsGrid from "@/app/components/productsGrid";
import Slider from "@/app/components/Slider";
import WithNavbarLayout from "@/app/with-navbar";

const Home = () => {
  return (
    <main>
      <WithNavbarLayout>
        <section className="h-full relative z-0">
          <Slider />
        </section>
        <section className="h-full grid grid-cols-1 md:grid-cols-[auto_1fr] p-4 gap-4">
          <section className="w-64 sticky top-4 h-fit">
            <FilterSidebar />
          </section>
          <ProductsGrid />
        </section>
      </WithNavbarLayout>
    </main>
  );
};

export default Home;
