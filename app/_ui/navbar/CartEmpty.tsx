import React from "react";
import { BsCartX } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

export default function CartEmpty() {
  return (
    <div className="text-center flex flex-col items-center p-4 px-8 mt-4">
      <BsCartX
        size={100}
        strokeWidth={0.00001}
        opacity={"40%"}
        className="text-gray-400"
      />
      <p className="sm:text-lg text-base mt-4">Your cart is empty!</p>
      <label
        htmlFor="cart"
        aria-label="close sidebar"
        className="btn h-2 sm:min-h-16 text-white bg-brand border-none mt-4"
      >
        <MdOutlineClose size={24} />
        Close
      </label>
    </div>
  );
}
