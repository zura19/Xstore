import React, { useRef } from "react";
import { IcartItem, removeFromCart } from "@/store/productSlice";
import Cartboard from "../product/Cartboard";
import formatCurrency from "@/lib/formatCurrency";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";

export default function CartItem({ cartItem }: { cartItem: IcartItem }) {
  const router = useRouter();
  const closeBtnRef = useRef(null);
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={(e) => {
        console.log(e.target);
        console.log(closeBtnRef.current);

        if (e.target === closeBtnRef.current) return;
        router.push(`/product/${cartItem.title.replaceAll(" ", "-")}`);
      }}
      className="p-2 rounded-md border-b last:border-none border-gray-200 grid grid-cols-[4fr_10fr] gap-4 group transition-all duration-300 hover:bg-gray-100"
    >
      <div className="relative max-h-12  group-hover:bg-white transition-all duration-300 rounded-md">
        <Image
          fill
          src={cartItem.image}
          className="object-contain"
          alt={cartItem.title}
        />
      </div>
      <div className="flex  flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-lg leading-5 font-medium">{cartItem.title}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeFromCart(cartItem.id));
            }}
          >
            <MdOutlineClose
              className=" opacity-0 group-hover:opacity-100 transition-all duration-300"
              size={24}
            />
          </button>
        </div>
        {/* @ts-expect-error idk */}
        <Cartboard id={cartItem.id} size={"sm"} />
        <div className="flex items-center gap-1">
          <p className="text-gray-400">{cartItem.quantity}</p>
          <p className="text-gray-400">x</p>
          <p className="font-semibold text-brand">
            {formatCurrency(cartItem.price * cartItem.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
