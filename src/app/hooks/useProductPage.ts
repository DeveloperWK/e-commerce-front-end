import { useParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetProductByIdQuery,
  useGetProductReviewsQuery,
  useCreateCartMutation,
} from "@/app/api/apiSlice";
import { setCartCounter } from "@/app/features/cart-counter/cart-counter";
import { Reviews } from "@/app/types/types";
import { getLocalStorage } from "@/app/utility/storageUtils";
import {useAuth} from "@/app/hooks/useAuth";

const useProductPage = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id as string);
  const { data: reviews } = useGetProductReviewsQuery(id as string);
  const {isAuthenticated} = useAuth()

  const [createCart, { isSuccess }] = useCreateCartMutation();
  const dispatch = useDispatch();

  // Group variants by name

  // Memoize the computation of variantGroups to avoid recalculating on every render
  const variantGroups = useMemo(() => {
    return data?.product?.variants?.length
      ? data.product.variants.reduce(
          (
            acc: Record<string, string[]>,
            variant: { name: string; value: string },
          ) => {
            if (!acc[variant.name]) {
              acc[variant.name] = [];
            }
            acc[variant.name].push(variant.value);
            return acc;
          },
          {} as Record<string, string[]>,
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

  const handleAddToCart = async () => {
    try {
      const userId = getLocalStorage("userId");
      const result = await createCart({
        userId: userId as string,
        productId: id as string,
        quantity,
        variants: selectedVariants,
      });
      const data = await result.data;
      dispatch(setCartCounter(data?.cart?.items?.length || 0));
      console.log("result");
    } catch (err) {
      console.error(err);
    }
  };

  const averageRating =
    reviews?.reviews?.length > 0
      ? reviews?.reviews?.reduce(
          (acc: number, review: Reviews) => acc + review.rating,
          0,
        ) / reviews?.reviews.length
      : 0;
  return {
    selectedImage,
    setSelectedImage,
    selectedVariants,
    setSelectedVariants,
    quantity,
    setQuantity,
    handleQuantityChange,
    handleVariantChange,
    handleAddToCart,
    averageRating,
    isLoading,
    isSuccess,
    data,
    variantGroups,
    reviews,
    id,
    isAuthenticated
  };
};
export default useProductPage;
