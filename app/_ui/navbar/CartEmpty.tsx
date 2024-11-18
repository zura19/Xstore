import React from "react";
import { BsCartX } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

export default function CartEmpty() {
  return (
    <div className="text-center flex flex-col items-center mt-4">
      <BsCartX
        size={100}
        strokeWidth={0.00001}
        opacity={"40%"}
        className="text-gray-400"
      />
      <p className="text-lg mt-4">Your cart is empty!</p>
      <label
        htmlFor="cart"
        // className="cursor-pointer"
        aria-label="close sidebar"
        className="btn text-white bg-brand border-none mt-4"
      >
        <MdOutlineClose size={24} />
        Close
      </label>
    </div>
  );
}
