import { useState, useEffect } from "react";
import {
  useLazyGetCartQuery,
  useRemoveCartItemMutation,
} from "@/app/api/apiSlice";
import { CartItemType, CartSummary } from "@/app/types/types";
import { getLocalStorage } from "@/app/utility/storageUtils";
import { useDispatch } from "react-redux";
import { setCartCounter } from "@/app/features/cart-counter/cart-counter";
const useCartLogic = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [getCart, { isLoading }] = useLazyGetCartQuery({});
  const [removeCartItem, { isLoading: removeCartLoading }] =
    useRemoveCartItemMutation();
  const userId = getLocalStorage("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setCartItems([]); // clear cart if not logged in
        dispatch(setCartCounter(0));
        return;
      }
      const res = await getCart({});
      if (res.data) {
        setCartItems(res.data?.cart?.items);
      } else {
        console.error("Failed to fetch cart:", res.error);
      }
    };

    fetchCart();
    return () => {
      setCartItems([]);
    };
  }, [userId, getCart, dispatch]);
  const subtotal = cartItems?.reduce(
    (sum: number, item) => sum + item?.product?.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const summary: CartSummary = {
    subtotal,
    shipping,
    tax,
    total,
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemove = (id: string) => {
    removeCartItem({
      productId: id,
      userId: userId as string,
    });
    dispatch(setCartCounter(cartItems?.length - 1));
    setCartItems(cartItems.filter((item) => item?.product?._id !== id));
  };
  return {
    cartItems,
    isLoading,
    removeCartLoading,
    summary,
    handleRemove,
    handleQuantityChange,
  };
};
export default useCartLogic;
