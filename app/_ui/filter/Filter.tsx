"use client";
import formatCurrency from "@/lib/formatCurrency";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Filter({ priceArr }: { priceArr: number[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const minPrice = Math.min(...priceArr);
  const maxPrice = Math.max(...priceArr);

  const [min, setMin] = useState(Number(searchParams.get("min")) || minPrice);
  const [max, setMax] = useState(Number(searchParams.get("max")) || maxPrice);

  console.log(priceArr, minPrice, min);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+e.target.value, max - 1);
    setMin(value);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(+e.target.value, min + 1);
    setMax(value);
  };

  console.log(searchParams);

  function handleFilter() {
    const params = new URLSearchParams(searchParams);
    if (min !== minPrice) {
      params.set("min", String(min));
      params.set("page", "1");
    } else {
      params.delete("min");
    }

    if (max !== maxPrice) {
      params.set("max", String(max));

      params.set("page", "1");
    } else {
      params.delete("max");
    }

    // setTimeout(() => {
    //   dispatch(setActivePage(1));
    // }, 400);
    router.replace(`${pathName}?${params.toString()}`);
  }

  function handleReset() {
    const params = new URLSearchParams(searchParams);
    setMin(minPrice);
    setMax(maxPrice);
    params.delete("max");
    params.delete("min");
    params.delete("page");
    router.replace(`${pathName}?${params.toString()}`);
  }

  return (
    // <div className="bg-white divide-y mb-auto divide-gray-200 rounded-md">
    <>
      <div className="p-4">
        <p className="text-lg font-semibold mb-2">Price</p>
        <label className="text-sm">
          Min:{" "}
          <span className="text-brand font-medium">{formatCurrency(min)}</span>
        </label>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={min}
          onChange={handleMinChange}
          className="range range-primary range-xs"
        />

        <label className="text-sm mt-2">
          Max:{" "}
          <span className="text-brand font-medium">{formatCurrency(max)}</span>
        </label>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={max}
          onChange={handleMaxChange}
          className="range range-primary range-xs"
        />
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleReset}
            className="btn btn-sm flex-1 btn-primary"
          >
            Reset
          </button>
          <button
            onClick={handleFilter}
            className="btn btn-sm flex-1 btn-primary"
          >
            Filter
          </button>
        </div>
      </div>

      {/* <div className="p-4">
        <p>Categories</p>
      </div> */}
    </>
    // </div>
  );
}
