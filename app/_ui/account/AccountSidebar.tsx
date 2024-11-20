"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="">
      <h2 className="text-xl mb-4 font-semibold border-b border-gray-200 pt-0 px-4 py-2">
        My account
      </h2>
      <div className="flex flex-col px-2 gap-1">
        <Link
          className={`font-medium p-2 transition-all duration-300 rounded-md ${
            pathname === "/account" ? "bg-gray-200 text-primary" : ""
          } hover:text-primary hover:bg-gray-200`}
          href={"/account"}
        >
          Account
        </Link>

        <Link
          className={`font-medium p-2 transition-all duration-300 rounded-md ${
            pathname === "/account/orders" ? "bg-gray-200 text-primary" : ""
          } hover:text-primary hover:bg-gray-200`}
          href={"/account/orders"}
        >
          Orders
        </Link>

        <Link
          className={`font-medium p-2 transition-all duration-300 rounded-md ${
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
