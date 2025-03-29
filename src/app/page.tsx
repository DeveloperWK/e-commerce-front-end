"use client";
import { trendingCategories, trendingProducts } from "@/app/Data/data";
import CategoryTrending from "@/app/components/CategoryTrending";
import ProductTrending from "@/app/components/ProductTrending";
import Slider from "@/app/components/Slider";
import WithNavbarLayout from "@/app/with-navbar";

const Home = () => {
  return (
    <main>
      <WithNavbarLayout>
        <section className="h-full relative z-0">
          <Slider />
        </section>
        {/* <section className="h-full grid grid-cols-1 md:grid-cols-[auto_1fr] p-4 gap-4">
          <section className="w-64 sticky top-4 h-fit">
            <FilterSidebar />
          </section>
          <section className="flex flex-col gap-4">
            <ProductsGrid />
          </section>
        </section> */}
        <ProductTrending
          products={trendingProducts}
          title="This Week's Top Sellers"
          subtitle="Shop what everyone is loving right now"
        />
        <CategoryTrending
          categories={trendingCategories}
          title="Trending Categories"
          subtitle="Shop by popular categories"
        />
      </WithNavbarLayout>
    </main>
  );
};

export default Home;
