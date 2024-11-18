import React from "react";
import ProductsList from "../ProductsList";
import { getDiscountedProducts } from "@/app/actions/productActions";
import { Iproduct } from "@/models/productModel";
import { stringIdAndParseObject } from "@/lib/stringMongoId";

export default async function DiscountedPorducts() {
  const discountedProducts: Iproduct[] = await getDiscountedProducts();

  return (
    <div className="">
      <p className="text-2xl font-semibold mb-4">Discounted products</p>
      <ProductsList
        cols={5}
        isAnimation={false}
        products={stringIdAndParseObject(discountedProducts)}
      />
    </div>
  );
}
