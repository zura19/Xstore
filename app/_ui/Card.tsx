"use client";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";
import React, { useState } from "react";
import { HiCheck } from "react-icons/hi2";
import FavoriteBtn from "./product/FavoriteBtn";
import { HiX } from "react-icons/hi";
import CardSwiper from "./CardSwiper";
import DeleteOrUpdate from "./DeleteOrUpdate";
import { useSession } from "next-auth/react";
import { useWindowWidth } from "@/lib/useWindowWidth";

export interface Icard {
  id: string;
  title: string;
  price: number;
  discount: number;
  stock: number;
  isNew: boolean;
  category: string;
  mainImage: string;
  series: string;
  images: [];
  specifications: {
    brand: string;
    colors?: string;
    videoCard?: string;
    system: string;
    storage: string;
    ram: string;
  };
}

export default function Card({
  id,
  title,
  price,
  mainImage,
  isNew,
  stock,
  discount,
  images,
  category,
  series,
  specifications,
}: Icard) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { data: userInfo } = useSession();
  const width = useWindowWidth();

  console.log(images);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className=" card bg-white max-w-full  rounded-md overflow-hidden shadow-sm hover:cursor-pointer"
    >
      <div className="relative  indicator z-10">
        {discount ? (
          <p className="badge  bg-brand text-xs text-white p-2 indicator-item indicator-start translate-x-4 translate-y-4 badge-info">
            -{discount}%
          </p>
        ) : null}
        {isNew && (
          <p
            className={`badge bg-green-600 text-xs text-white p-2 indicator-item indicator-start translate-x-4 ${
              discount && "ml-14"
            } translate-y-4 badge-info`}
          >
            New
          </p>
        )}
      </div>

      <FavoriteBtn
        product={{
          id,
          title,
          price,
          mainImage,
          isNew,
          stock,
          discount,
          images,
        }}
        onCard={true}
        isHovered={isHovered}
      />

      <div className="grid   relative h-52">
        <CardSwiper
          isHovered={isHovered}
          images={images}
          mainImage={mainImage}
        />
      </div>

      <div className="card-body cursor-default  p-2 pt-0 mt-2">
        <div className="flex flex-col mb-2 gap-2">
          <div className="flex items-center justify-between">
            <h2 className="card-title text-sm sm:text-base line-clamp-1 text-gray-700 leading-5">
              {title}
            </h2>
            {userInfo?.user.role === "admin" ? (
              <DeleteOrUpdate
                product={{
                  id,
                  title,
                  price,
                  mainImage,
                  isNew,
                  stock,
                  discount,
                  images,
                  category,
                  series,
                  specifications,
                }}
              />
            ) : null}
          </div>
          {stock > 0 ? (
            <p className="flex text-gray-700 items-center gap-1">
              <span>
                <HiCheck
                  size={18}
                  strokeWidth={1.4}
                  color="#1c61e7"
                  className="font-bold"
                />
              </span>
              <span className="font-semibold leading-4 text-sm">In stock</span>
            </p>
          ) : (
            <p className="flex text-gray-700 items-center gap-1">
              <span>
                <HiX
                  size={18}
                  strokeWidth={1.4}
                  color="#ef4444"
                  className="font-bold text-re"
                />
              </span>
              <span className="font-semibold leading-4 text-sm">
                Not in stock
              </span>
            </p>
          )}
          {!discount ? (
            <p className="text-brand font-medium leading-4">
              {formatCurrency(price)}
            </p>
          ) : (
            <p className="text-brand font-medium leading-4">
              {width < 768 ? null : (
                <span className="line-through text-gray-500">
                  {formatCurrency(price)}{" "}
                </span>
              )}
              <span className=" font-semibold">
                {formatCurrency(price - (price * discount) / 100)}
              </span>
            </p>
          )}
        </div>
        <div className="card-actions justify-end mt-auto">
          <Link
            href={`/product/${title.replaceAll(" ", "-")}`}
            className="btn bg-brand border-none  hover:bg-blue-700 min-h-4 h-10   text-white w-full"
          >
            <span>{width < 640 ? "View" : "View Product"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
