import Image from "next/image";
const ProductCard = () => {
  return (
    <section className="w-50 h-[20rem] md:w-[15.625rem]  md:h-[18.75rem] bg-white  md:hover:shadow-lg md:hover:scale-105 transition-all dark:hover:shadow-lg dark:hover:scale-105 px-4 text-black py-4 border border-gray-300">
      <Image
        src="/images/pexels-mart-production-7679456.jpg"
        width={1920}
        height={1080}
        alt="product"
        className="w-100"
      />
      <p className="text-[1.2rem]">Product Name</p>
      <section className="flex items-center gap-2 ">
        <p className="text-blue-400 text-[1.2rem]">৳50</p>
        <p className="text-gray-400"> -50% </p>
      </section>
      <section>
        <p>Reviews</p>
      </section>
    </section>
  );
};

export default ProductCard;
