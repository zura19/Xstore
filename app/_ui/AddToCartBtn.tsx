"use client";
import { addToCart, IcartItem, removeFromCart } from "@/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Cartboard from "./product/Cartboard";

export default function AddToCartBtn({
  id,
  title,
  stock,
  price,
  image,
  quantity,
}: IcartItem) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(
    (state) => state.persistedProductsReducer.product.cart
  );

  function isProductInCart(id: string) {
    const isItem = cart.find((product) => product.id === id);
    return isItem;
  }

  function handleClick() {
    console.log("gababa");

    if (isProductInCart(id)) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart({ id, title, stock, price, image, quantity }));
      // dispatch(addToCart({ id, image, stock, title, price }));
    }
  }

  return (
    <>
      <Cartboard
        productData={{ id, title, stock, price, image, quantity }}
        id={id}
      />
      <label
        onClick={handleClick}
        // htmlFor="cart"
        htmlFor={!isProductInCart(id) ? "" : "cart"}
        className="btn min-h-9 h-12 rounded-md flex-1 bg-brand hover:bg-blue-700 transition-all duration-300 border-none text-white"
      >
        {" "}
        {!isProductInCart(id) ? "Add to cart" : "Remove from cart"}
      </label>
    </>
  );
}
