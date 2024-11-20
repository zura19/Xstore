"use client";
import { useAppSelector } from "@/store/store";
import React from "react";
import CartItem from "../navbar/CartItem";
import formatCurrency from "@/lib/formatCurrency";
import { IcartItem } from "@/store/productSlice";

export default function Orderdetails() {
  const cart = useAppSelector(
    (state) => state.persistedProductsReducer.product.cart
  );

  const totalPrice = cart.reduce((total: number, product: IcartItem) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="p-4 grid grid-rows-[auto_1fr_auto] gap-y-4 rounded-md bg-white  shadow-md text-gray-700">
      <h2 className="text-xl font-medium ">Order details</h2>
      <ul className="h-[420px]  overflow-scroll">
        {cart?.map((product) => (
          <li key={product.id}>
            <CartItem cartItem={product} />
          </li>
        ))}
      </ul>
      <div className="flex text-lg p-2 pb-0 border-t border-gray-200  h-full  font-semibold  justify-between">
        <p>Total:</p>
        <p className="text-brand">{formatCurrency(totalPrice)}</p>
      </div>
    </div>
  );
}
