"use client";
import React from "react";
import Card from "./Card";
import { Iproduct } from "@/models/productModel";
import { motion } from "framer-motion";
import { IFavoritesItem } from "@/store/productSlice";

export default function ProductsList({
  products,
  cols,
  isAnimation,
}: {
  products?: Iproduct[] | IFavoritesItem[];
  cols?: number;
  isAnimation?: boolean;
}) {
  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each list item
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }, // Customize duration for each item
    },
  };

  console.log(products);

  if (isAnimation)
    return (
      <motion.ul
        variants={listContainer}
        initial="hidden"
        animate="show"
        className={`grid  ${cols === 5 && "grid-cols-[1fr_1fr_1fr_1fr_1fr]"} ${
          cols === 4 && "grid-cols-[1fr_1fr_1fr_1fr]"
        } ${cols === 3 && "grid-cols-[1fr_1fr_1fr]"} ${
          cols === 2 && "grid-cols-[1fr_1fr]"
        } ${cols === 1 && "grid-cols-[1fr]"} gap-10 `}
        style={{ listStyle: "none", padding: 0 }}
      >
        {products?.map((product: Iproduct | IFavoritesItem) => (
          <motion.li
            key={"_id" in product ? String(product._id) : String(product.id)}
            variants={listItem}
            style={{ margin: "10px 0" }}
          >
            <Card
              // key={String(product?._id  product.id)}

              id={"_id" in product ? String(product._id) : String(product.id)}
              title={product.title}
              price={product.price}
              mainImage={product.mainImage}
              stock={product.stock}
              isNew={"new" in product ? product.new : product.isNew}
              discount={product.discount}
              category={"category" in product ? product.category : ""}
              images={product.images}
              series={"series" in product ? product.series : ""}
              specifications={
                "specification" in product ? product.specification : {}
              }
            />
          </motion.li>
        ))}
      </motion.ul>
    );

  if (!isAnimation)
    return (
      <div
        className={`grid ${cols === 5 && "grid-cols-[1fr_1fr_1fr_1fr_1fr]"} ${
          cols === 4 && "grid-cols-[1fr_1fr_1fr_1fr]"
        } ${cols === 3 && "grid-cols-[1fr_1fr_1fr]"} ${
          cols === 2 && "grid-cols-[1fr_1fr]"
        } ${cols === 1 && "grid-cols-[1fr]"} gap-10 `}
      >
        {products?.map((product: Iproduct | IFavoritesItem) => (
          <Card
            key={"_id" in product ? String(product._id) : String(product.id)}
            id={"_id" in product ? String(product._id) : String(product.id)}
            title={product.title}
            price={product.price}
            mainImage={product.mainImage}
            stock={product.stock}
            isNew={"new" in product ? product.new : product.isNew}
            discount={product.discount}
            category={"category" in product ? product.category : ""}
            images={product.images}
            specifications={
              "specifications" in product ? product.specifications : {}
            }
          />
        ))}
      </div>
    );
}
