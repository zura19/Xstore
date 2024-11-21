"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function BottomNavItem({
  children,
  to,
  label,
  user,
}: {
  children: ReactNode;
  to: string;
  label: string;
  user?: boolean;
}) {
  const pathaname = usePathname();

  return (
    <Link
      href={to}
      className={` ${
        pathaname === to ? "active text-primary" : "text-gray-700"
      }`}
    >
      {children}
      <span className="btm-nav-label leading-4 font-semibold">{label}</span>
    </Link>
  );
}
