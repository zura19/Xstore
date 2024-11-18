"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function SidebarItem({
  children,
  main,
  to,
  size,
}: {
  children: ReactNode;
  main: boolean;
  to?: string;
  size?: string;
}) {
  const pathname = usePathname();

  if (main)
    return (
      <label
        htmlFor="my-drawer"
        className="hover:cursor-pointer  transition-all duration-300"
      >
        <div
          className={`${
            main
              ? ` bg-blue-600 hover:bg-blue-700  ${size ? "p-1.5" : "p-3"}`
              : "hover:bg-gray-100 p-1"
          } transition-all duration-300  rounded-full`}
        >
          {children}
        </div>
      </label>
    );

  if (!main)
    return (
      <Link
        // htmlFor="my-drawer"
        href={to ? to : "/"}
        className="hover:cursor-pointer   transition-all duration-300"
      >
        <div
          className={`${
            main
              ? " bg-blue-600 hover:bg-blue-700 p-3"
              : "hover:bg-gray-100 p-2"
          } transition-all duration-300  rounded-full ${
            pathname === to && "bg-gray-200"
          }`}
        >
          {children}
        </div>
      </Link>
    );
}
