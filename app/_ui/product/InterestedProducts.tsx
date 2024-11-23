import React from "react";
import ProductsSwiper from "@/app/_ui/product/ProductsSwiper";
import { getRandomProducts } from "@/app/actions/productActions";
import { Iproduct } from "@/models/productModel";
import mongoose from "mongoose";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function InterestedProducts({
  id,
}: {
  id: mongoose.Types.ObjectId;
}) {
  const randomProducts: Iproduct[] = await getRandomProducts(id);

  const rand = randomProducts.map((prod) => {
    return { ...prod, _id: String(prod._id) };
  });

  return (
    <div className="md:max-w-[90%] lg:max-w-[80%] max-w-[100%] p-4 mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Products that may interest you
      </h2>
      <ProductsSwiper randomProducts={rand} />
    </div>
  );
}
