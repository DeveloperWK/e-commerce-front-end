"use client";
import FilterSidebar from "./components/FilterSidebar";
import ProductCard from "./components/ProductCard";
import Slider from "./components/Slider";
import WithNavbarLayout from "./with-navbar";

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
          <section className=" w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4   place-items-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </section>
        </section>
      </WithNavbarLayout>
    </main>
  );
};

export default Home;
