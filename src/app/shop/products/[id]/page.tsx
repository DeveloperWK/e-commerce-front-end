"use client";
import { useGetProductByIdQuery } from "@/app/api/apiSlice";
import CommentSection from "@/app/components/CommentSection";
import ReviewForm from "@/app/components/ReviewForm";
import ReviewList from "@/app/components/ReviewList";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

function ProductPage() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [reviews, setReviews] = useState<Review[]>([]);

  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id as string);
  // Group variants by name

  // Memoize the computation of variantGroups to avoid recalculating on every render
  const variantGroups = useMemo(() => {
    return data?.product?.variants?.length
      ? data.product.variants.reduce(
          (
            acc: Record<string, string[]>,
            variant: { name: string; value: string }
          ) => {
            if (!acc[variant.name]) {
              acc[variant.name] = [];
            }
            acc[variant.name].push(variant.value);
            return acc;
          },
          {} as Record<string, string[]>
        )
      : {};
  }, [data?.product?.variants]);

  useEffect(() => {
    // Set the first image if available
    if (data?.product?.images && data.product.images.length > 0) {
      setSelectedImage(data.product.images[0]);
    }

    // Initialize variant options only if variantGroups is defined
    if (Object.keys(variantGroups).length > 0) {
      const initialVariants: Record<string, string> = {};

      // Explicitly type the entries to ensure values is treated as string[]
      Object.entries(variantGroups).forEach(([name, values]) => {
        initialVariants[name] = (values as string[])[0]; // Cast values to string[]
      });

      setSelectedVariants(initialVariants);
    } else {
      setSelectedVariants({}); // Reset to empty if no variants exist
    }
  }, [data, variantGroups]);
  const handleAddReview = (newReview: Omit<Review, "id" | "date">) => {
    const review = {
      ...newReview,
      id: data?.product?._id.toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([...reviews, review]);
    console.log(reviews);
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= data?.product?.stock) {
      setQuantity(value);
    }
  };

  const handleVariantChange = (name: string, value: string) => {
    setSelectedVariants({
      ...selectedVariants,
      [name]: value,
    });
  };

  const handleAddToCart = () => {
    // Implementation would depend on your cart management
    // console.log("Adding to cart:", {
    //   product,
    //   quantity,
    //   selectedVariants,
    // });
    // Show notification or redirect to cart
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-500 dark:text-gray-600">/</span>
          <Link
            href="/shop"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Shop
          </Link>
          <span className="mx-2 text-gray-500 dark:text-gray-600">/</span>
          <span className="text-gray-900 font-medium dark:text-white">
            {data?.product?.title}
          </span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <div className="relative h-96 mb-4 bg-white rounded-lg border overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={data?.product?.title}
                  fill
                  className="object-contain"
                />
              )}
              {data?.product?.salePrice &&
                data?.product?.salePrice < data?.product?.price && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    Sale
                  </span>
                )}
              {data?.product?.stock <= 0 && (
                <span className="absolute top-4 right-4 bg-gray-700 text-white px-2 py-1 rounded text-sm font-medium dark:bg-red-600">
                  Out of Stock
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto py-2">
              {data?.product?.images?.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`w-20 h-20 rounded border overflow-hidden flex-shrink-0 ${
                    selectedImage === image
                      ? "border-blue-500 border-2 dark:border-blue-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${data?.product?.title} thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {data?.product?.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  ({reviews.length} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                SKU: {data?.product?.sku}
              </span>
            </div>
            <div className="mb-6">
              {data?.product?.salePrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${data?.product?.salePrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through dark:text-gray-600">
                    ${data?.product?.price.toFixed(2)}
                  </span>
                  <span className="text-green-600 text-sm font-medium dark:text-green-400">
                    {Math.round(
                      (1 - data?.product?.salePrice / data?.product?.price) *
                        100
                    )}
                    % OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${data?.product?.price.toFixed(2)}
                </span>
              )}
            </div>
            {/* Stock Status */}
            <div className="mb-6">
              <p
                className={`text-sm ${
                  data?.product?.stock > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {data?.product?.stock > 0
                  ? `In Stock (${data?.product?.stock} available)`
                  : "Out of Stock"}
              </p>
            </div>
            {/* Product Description */}
            <div className="prose mb-6 text-gray-700 dark:text-gray-300">
              <p>{data?.product?.description}</p>
            </div>
            {/* Variant Selection */}
            {Object.entries(variantGroups).length > 0 && (
              <div className="mb-6">
                {Object.entries(variantGroups).map(([name, values]) => (
                  <div key={name} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(values as string[]).map((value) => (
                        <button
                          key={value}
                          onClick={() => handleVariantChange(name, value)}
                          className={`px-4 py-2 border rounded-md text-sm ${
                            selectedVariants[name] === value
                              ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Product Attributes */}
            {data?.product?.attributes &&
              data?.product?.attributes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Specifications
                  </h3>
                  <div className="bg-white rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    {data?.product?.attributes.map(
                      (
                        attr: { name: string; value: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className={`flex py-3 px-4 ${
                            index !== data?.product?.attributes.length - 1
                              ? "border-b border-gray-200 dark:border-gray-700"
                              : ""
                          }`}
                        >
                          <span className="w-1/3 text-gray-600 dark:text-gray-400">
                            {attr.name}
                          </span>
                          <span className="w-2/3 font-medium text-gray-900 dark:text-white">
                            {attr.value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-md dark:border-gray-700">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || data?.product?.stock <= 0}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={data?.product?.stock}
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="w-12 text-center border-none focus:ring-0 dark:bg-gray-800 dark:text-white"
                  disabled={data?.product?.stock <= 0}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={
                    quantity >= data?.product?.stock ||
                    data?.product?.stock <= 0
                  }
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={data?.product?.stock <= 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-6 rounded-md font-medium dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                {data?.product?.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
            {/* Tags */}
            {data?.product?.tags && data?.product?.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {data?.product?.tags.map((tag: string, index: number) => (
                    <Link
                      key={index}
                      href={`/products?tag=${tag}`}
                      className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Product Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Customer Reviews
          </h2>
          <ReviewList reviews={reviews} />
          <ReviewForm productId={id as string} />
        </div>
        {/* Comment Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Comments
          </h2>
          <CommentSection productId={data?.product?._id.toString()} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
// {
//   /* Related Products */
// }
// {
//   /* {relatedProducts && relatedProducts.length > 0 && (
//       <div>
//         <h2 className="text-2xl font-bold mb-6">Related Products</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {relatedProducts.map((relatedProduct) => (
//             <Link
//               key={relatedProduct._id.toString()}
//               href={`/products/${relatedProduct.slug}`}
//               className="group"
//             >
//               <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                 <div className="relative h-52 w-full">
//                   {relatedProduct.images && relatedProduct.images[0] && (
//                     <Image
//                       src={relatedProduct.images[0]}
//                       alt={relatedProduct.title}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   )}
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
//                     {relatedProduct.title}
//                   </h3>
//                   <div className="mt-2">
//                     {relatedProduct.salePrice ? (
//                       <div className="flex items-center gap-2">
//                         <span className="font-bold text-gray-900">
//                           ${relatedProduct.salePrice.toFixed(2)}
//                         </span>
//                         <span className="text-sm text-gray-500 line-through">
//                           ${relatedProduct.price.toFixed(2)}
//                         </span>
//                       </div>
//                     ) : (
//                       <span className="font-bold text-gray-900">
//                         ${relatedProduct.price.toFixed(2)}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     )} */
// }
