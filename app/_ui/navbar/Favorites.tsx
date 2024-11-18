import { useAppSelector } from "@/store/store";
import Link from "next/link";
import React from "react";
import { HiOutlineHeart } from "react-icons/hi2";

export default function Favorites() {
  const favorites = useAppSelector(
    (state) => state.persistedProductsReducer.product.favorites
  );
  return (
    <Link
      href={"/favorites"}
      className="drawer-button btn w-12 h-12 btn-ghost   btn-circle "
    >
      <div className="indicator  w-10 h-10 items-center justify-center  bg-white rounded-full">
        <HiOutlineHeart size={24} />
        <span className="badge h-[18px] w-[18px] text-blue-500  border-gray-300  bg-white translate-x-2 -translate-y-1  z-0 badge-xs  indicator-item">
          {favorites.length}
        </span>
      </div>
    </Link>
  );
}
