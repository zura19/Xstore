"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const navigation = use
  let arr = pathname.split("/");
  const search = searchParams.get("search");
  console.log(search);
  console.log(pathname);

  arr = search ? [...arr, `Search result: "${search}"`] : arr;

  return (
    <div className="breadcrumbs hover:no-underline  col-start-1 -col-end-1 text-gray-700 font-medium">
      <ul className="hover:no-underline">
        {arr.map((link, index, arr) => {
          const to = link === "" ? "/" : `${arr.slice(0, index + 1).join("/")}`;
          return (
            <li
              key={link}
              className={`hover:text-primary ${
                index === arr.length - 1 ? "text-primary" : ""
              } transition-all duration-300`}
            >
              <Link
                href={link === "category" || link === "search" ? "" : to}
                className="hover:no-underline"
              >
                {(link === "" && "Home") || link}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
