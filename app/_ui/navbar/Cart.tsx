// "use client";
import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import Cartoverview from "./Cartoverview";
import { useAppSelector } from "@/store/store";
import { IcartItem } from "@/store/productSlice";
import formatCurrency from "@/lib/formatCurrency";

export default function Cart({ bottomNav }: { bottomNav?: boolean }) {
  const cart = useAppSelector(
    (state) => state.persistedProductsReducer.product.cart
  );

  const totalPrice = cart.reduce((total: number, product: IcartItem) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="drawer  drawer-end z-20">
      <input id="cart" type="checkbox" className="drawer-toggle" />
      {!bottomNav ? (
        <div className="drawer-content flex gap-1 items-center">
          {/* Page content here */}
          <label
            htmlFor="cart"
            className="drawer-button btn w-12 h-12 btn-ghost   btn-circle "
          >
            <div className="indicator  w-10 h-10 items-center justify-center  bg-blue-600 rounded-full">
              <HiOutlineShoppingCart size={24} color="white" />
              <span className="badge h-[18px] w-[18px] text-blue-500  border-gray-300  bg-white translate-x-2 -translate-y-1  z-0 badge-xs  indicator-item">
                {cart.length}
              </span>
            </div>
          </label>
          <span className="text-xs font-bold">
            {" "}
            {formatCurrency(totalPrice)}
          </span>
        </div>
      ) : (
        <label htmlFor="cart" className="flex flex-col items-center gap-1">
          <HiOutlineShoppingCart size={20} />
          <span className="btm-nav-label leading-4 font-semibold">Cart</span>
        </label>
      )}
      <Cartoverview />
    </div>
  );
}
