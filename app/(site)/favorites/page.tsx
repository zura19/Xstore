"use client";
import ProductsList from "@/app/_ui/ProductsList";
import ReturnHomePageBtn from "@/app/_ui/ReturnHomePageBtn";
// import { IFavoritesItem } from "@/store/productSlice";
import { useAppSelector } from "@/store/store";
import React from "react";
import { HiOutlineHeart } from "react-icons/hi2";

export default function Favorites() {
  const favorites = useAppSelector(
    (state) => state.persistedProductsReducer.product?.favorites
  );

  if (favorites.length === 0) {
    return (
      <div className="max-w-[90%] flex gap-2 flex-col items-center mx-auto pt-8">
        <HiOutlineHeart
          size={150}
          strokeWidth={1.5}
          className="leading-3 text-gray-200"
        />
        <p className="font-semibold leading-3 text-2xl">
          This Favorites is empty.
        </p>
        <ReturnHomePageBtn className="mt-4" />
      </div>
    );
  }

  return (
    <div className="max-w-[90%] mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-800 text-3xl  font-medium">Favorites</h1>
        <p className="text-gray-500 text-base  font-medium">
          Results: {favorites.length}
        </p>
      </div>

      <ProductsList
        isAnimation={true}
        cols={4}
        products={favorites}
      ></ProductsList>
    </div>
  );
}
