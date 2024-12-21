import { formatDateToReadable } from "@/lib/date";
import formatCurrency from "@/lib/formatCurrency";
import Product from "@/models/productModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiCheck } from "react-icons/hi2";

export default async function Order({
  productId,
  quantity,
  dates,
  index,
}: {
  productId: string;
  quantity: number;
  // product: IcartItem;
  dates: string[];
  index: number;
}) {
  const product = await Product.findById(productId);

  return (
    <tr>
      <th>
        <HiCheck size={20} strokeWidth={1.5} className="text-brand" />
        {/* <label>
          <input type="checkbox" className="checkbox" />
        </label> */}
      </th>
      <td>
        <Link
          // href={"/"}
          href={`/product/${product.title.replaceAll(" ", "-")}`}
          className="flex items-center gap-3"
        >
          {/* <div className="avatar"> */}
          <div className="relative size-16 ">
            <Image
              fill
              src={product.mainImage}
              className="object-contain rounded-md"
              alt="Avatar Tailwind CSS Component"
            />
          </div>
          {/* </div> */}
          <div>
            <div className="font-bold">{product.title}</div>
            <div className="text-sm flex gap-1  opacity-50">
              <span>{quantity}</span>
              <span>x</span>
              <span className="">{product.price}</span>
            </div>
          </div>{" "}
        </Link>
      </td>
      <td>
        <div className="text-xs text-gray-500">
          {formatDateToReadable(dates[index])}
        </div>
        <br />
      </td>

      <th>
        <button className="btn btn-ghost btn-xs">
          {formatCurrency(product.price * quantity)}
        </button>
      </th>
    </tr>
  );
}
