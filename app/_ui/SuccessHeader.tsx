"use client";
import { emptyCart } from "@/store/productSlice";
import { useAppDispatch } from "@/store/store";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function SuccessHeader() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("redirect_status");

  console.log(paymentStatus);

  useEffect(() => {
    if (paymentStatus === "succeeded") {
      dispatch(emptyCart());
      localStorage.removeItem("orderInfo");
    }
  }, [dispatch, paymentStatus]);

  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Thank you for your purchase!
      </h1>
      <p className="text-lg text-center">
        Your order has been successfully placed.
      </p>
    </>
  );
}
