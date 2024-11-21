import { formatDateToReadable } from "@/lib/date";
import formatCurrency from "@/lib/formatCurrency";
import { IcartItem } from "@/store/productSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Order({
  product,
  dates,
  index,
}: {
  product: IcartItem;
  dates: string[];
  index: number;
}) {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <Link
          href={`/product/${product.title.replaceAll(" ", "-")}`}
          className="flex items-center gap-3"
        >
          {/* <div className="avatar"> */}
          <div className="h-12 relative bg-white rounded-md  w-12">
            <Image
              fill
              src={product.image}
              className="object-contain"
              alt="Avatar Tailwind CSS Component"
            />
          </div>
          {/* </div> */}
          <div>
            <div className="font-bold">{product.title}</div>
            <div className="text-sm flex gap-1  opacity-50">
              <span>{product.quantity}</span>
              <span>x</span>
              <span className="">{product.price}</span>
            </div>
          </div>
        </Link>
      </td>
      <td>
        {formatDateToReadable(dates[index])}
        {/* Zemlak, Daniel and Leannon */}
        <br />
        {/* <span className="badge badge-ghost badge-sm">
          Desktop Support Technician
        </span> */}
      </td>
      {/* <td>Purple</td> */}
      <th>
        <button className="btn btn-ghost btn-xs">
          {formatCurrency(product.price * product.quantity)}
        </button>
      </th>
    </tr>
  );
}
