import { addToFavorites, removeFromFavorites } from "@/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";
import { HiOutlineHeart } from "react-icons/hi2";

export default function FavoriteBtn({
  onCard,
  isHovered,
  product,
}: {
  onCard: boolean;
  isHovered: boolean;
  product: {
    id: string;
    title: string;
    price: number;
    discount: number;
    stock: number;
    isNew: boolean;
    mainImage: string;
    images: [];
  };
}) {
  const favorites = useAppSelector(
    (state) => state.persistedProductsReducer.product.favorites
  );
  const dispatch = useAppDispatch();

  function isFavorite(id: string) {
    return favorites.find((prod) => prod.id === id);
  }

  function addOrRemoveFavorites(id: string) {
    if (!isFavorite(id)) {
      dispatch(
        addToFavorites({
          id,
          title: product?.title,
          price: product?.price,
          discount: product?.discount,
          stock: product?.stock,
          isNew: product?.isNew,
          mainImage: product?.mainImage,
          images: product?.images,
        })
      );
    } else {
      // remove
      dispatch(removeFromFavorites(id));
    }
  }

  return (
    <button
      onClick={() => {
        addOrRemoveFavorites(product?.id);
      }}
      data-tip={
        isFavorite(product?.id) ? "Remove from favorites" : "Add to favorites"
      }
      className={`absolute  tooltip cursor-pointer z-10 tooltip-left top-0  translate-y-3  right-0 hover:bg-gray-100  border  border-gray-300 outline-none bg-white  rounded-md  transition-all duration-300 ${
        onCard && isHovered
          ? "-translate-x-3  p-1 opacity-100"
          : !onCard && isHovered
          ? "-translate-x-3  p-1.5"
          : "translate-x-3  p-0 opacity-0"
      } `}
    >
      <HiOutlineHeart
        fill={isFavorite(product?.id) ? "#1c61e7" : "none"}
        stroke={isFavorite(product?.id) ? "#1c61e7" : "black"}
        strokeWidth={1.4}
        size={onCard ? 20 : 24}
      />
    </button>
  );
}
