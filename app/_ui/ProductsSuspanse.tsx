import React, { ReactNode } from "react";
import ProductsList from "./ProductsList";
import Pagination from "./Pagination";
import { getFilteredProducts } from "../actions/productActions";
import { stringId } from "@/lib/stringMongoId";
import ReturnHomePageBtn from "./ReturnHomePageBtn";

interface Pageprops {
  searchParams: {
    search?: string;
    brand?: string;
    category?: string;
    series?: string;
    min?: string;
    max?: string;
    page?: string;
  };
  children: ReactNode;
}

export default async function ProductsSuspanse({
  searchParams,
  children,
}: Pageprops) {
  const productsData = await getFilteredProducts(searchParams);
  const { products, total } = productsData;

  if ("error" in productsData)
    return (
      <div className="grid   place-content-center  px-4">
        <div className="text-center">
          <h1 className="md:text-9xl sm:text-7xl  text-8xl font-black text-gray-200">
            404
          </h1>

          <p className="text-2xl font-bold tracking-tight  text-gray-900 sm:text-3xl md:text-4xl">
            Uh-oh!
          </p>
          <p className=" md:text-xl text-base mb-2 mt-2 md:mb-4 md:mt-4 text-gray-500">
            Product can not be found.
          </p>
          <ReturnHomePageBtn className="" />
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex sm:flex-row flex-col sm:items-center justify-between">
        {children}
        <p className="sm:text-sm text-xs font-medium uppercase  text-gray-600 mb-4">
          Results: {`${total}`}
        </p>
      </div>
      <ProductsList
        cols={total === 1 ? 1 : total > 1 && total <= 8 ? 2 : 4}
        isAnimation={true}
        products={stringId(products)}
      />
      <Pagination allProducts={total} />
    </div>
  );
}
