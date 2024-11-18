"use client";
import {
  addToCart,
  decreaseQuantity,
  IcartItem,
  increaseQuantity,
  removeFromCart,
} from "@/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export default function Cartboard({
  size,
  id,
  productData,
}: {
  size?: string;
  id: string;
  productData: IcartItem;
}) {
  const cart = useAppSelector(
    (state) => state.persistedProductsReducer.product.cart
  );
  const dispatch = useAppDispatch();

  const selectedCart = cart?.find((prod) => prod.id === id);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="join  self-start"
    >
      <button
        onClick={() => {
          if (selectedCart?.quantity === 1) dispatch(removeFromCart(id));
          dispatch(decreaseQuantity(id));
        }}
        disabled={!selectedCart?.quantity}
        className={`join-item text-gray-500 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-500 ${
          size === "sm" ? "h-8" : "h-12"
        }  bg-white btn min-h-2  border-gray-300 rounded-md outline-none hover:border-gray-300 hover:bg-brand hover:text-white transition-all duration-300 font-normal px-2`}
      >
        -
      </button>

      <button
        className={`join-item text-gray-500 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-500 ${
          size === "sm" ? "h-8 px-3" : "px-4 h-12"
        }  bg-white btn min-h-2  border-gray-300 rounded-md outline-none hover:border-gray-300 hover:bg-brand hover:text-white transition-all duration-300 font-normal `}
      >
        {selectedCart?.quantity || 0}
      </button>

      <button
        onClick={() => {
          if (!selectedCart) {
            dispatch(addToCart(productData));
          } else {
            dispatch(increaseQuantity(id));
          }
        }}
        disabled={
          selectedCart && selectedCart?.quantity === selectedCart?.stock
        }
        className={`join-item disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-500 text-gray-500 ${
          size === "sm" ? "h-8" : "h-12"
        } bg-white btn min-h-2  border-gray-300 rounded-md outline-none hover:border-gray-300 hover:bg-brand hover:text-white transition-all duration-300  font-normal  px-2`}
      >
        +
      </button>
    </div>
  );
}
