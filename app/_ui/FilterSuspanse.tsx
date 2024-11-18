import React from "react";
import Filter from "./filter/Filter";
import { Iproduct } from "@/models/productModel";
import { getAllPrices } from "../actions/productActions";

interface Pageprops {
  searchParam: {
    search?: string;
    category?: string;
    brand?: string;
    series?: string;
  };
}

export default async function FilterSuspanse({ searchParam }: Pageprops) {
  console.log(searchParam);
  const Allproducts: Iproduct[] | { error: string } = await getAllPrices({
    ...searchParam,
  });

  const priceArr = Array.isArray(Allproducts)
    ? Allproducts?.map((product) =>
        product.discount > 0
          ? product.price - (product.price * product.discount) / 100
          : product.price
      )
    : [];
  return (
    <div className="bg-white divide-y mb-auto divide-gray-200 rounded-md">
      <Filter priceArr={priceArr} />
    </div>
  );
}
