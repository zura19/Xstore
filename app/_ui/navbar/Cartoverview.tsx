"use client";
import React from "react";
import CartEmpty from "./CartEmpty";
import { MdOutlineClose } from "react-icons/md";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";

import { useAppSelector } from "@/store/store";

export default function Cartoverview() {
  const cart = useAppSelector(
    (state) => state.persistedProductsReducer.product.cart
  );

  return (
    <div className="drawer-side  ">
      <label
        htmlFor="cart"
        aria-label="close sidebar"
        className="drawer-overlay  fixed inset-0  "
      ></label>
      <ul className="menu grid grid-rows-[auto_auto_1fr]  p-0 bg-white text-base-cotent  min-h-full w-[340px] ">
        <div className="flex px-2 items-center justify-between py-4 border-b border-gray-300">
          <h1 className="text-gray-800 text-xl  font-semibold">
            Shopping Cart
          </h1>
          <label
            htmlFor="cart"
            className="cursor-pointer"
            aria-label="close sidebar"
          >
            <MdOutlineClose size={24} />
          </label>
        </div>
        {(!cart || cart.length === 0) && <CartEmpty />}
        <div className="overflow-scroll max-h-[517px] ">
          {cart.map((product) => (
            <CartItem key={product.id} cartItem={product} />
          ))}
        </div>

        {!cart || cart.length === 0 ? null : <CartFooter />}
      </ul>
    </div>
  );
}
