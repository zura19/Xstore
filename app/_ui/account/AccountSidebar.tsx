"use client";
import { useWindowWidth } from "@/lib/useWindowWidth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AccountSidebar() {
  const pathname = usePathname();
  const width = useWindowWidth();

  return (
    <div className="">
      <h2 className="sm:text-xl text-base sm:mb-4 mb-2 font-semibold border-b border-gray-200 pt-0 px-2 sm:px-4 py-2">
        {width < 640 ? "Account" : "My account"}
      </h2>
      <div className="flex flex-col px-2 gap-1">
        <Link
          className={`font-medium p-1 sm:p-2 sm:text-base text-xs transition-all duration-300 rounded-md ${
            pathname === "/account" ? "bg-gray-200 text-primary" : ""
          } hover:text-primary hover:bg-gray-200`}
          href={"/account"}
        >
          Account
        </Link>

        <Link
          className={`font-medium p-1 sm:p-2 transition-all sm:text-base text-xs duration-300 rounded-md ${
            pathname === "/account/orders" ? "bg-gray-200 text-primary" : ""
          } hover:text-primary hover:bg-gray-200`}
          href={"/account/orders"}
        >
          Orders
        </Link>

        <Link
          className={`font-medium p-1 sm:p-2 transition-all sm:text-base text-xs duration-300 rounded-md ${
            pathname === "/account/change-password"
              ? "bg-gray-200 text-primary"
              : ""
          } hover:text-primary hover:bg-gray-200`}
          href={"/account/change-password"}
        >
          Change password
        </Link>
      </div>
    </div>
  );
}
