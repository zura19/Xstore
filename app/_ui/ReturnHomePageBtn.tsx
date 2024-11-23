import Link from "next/link";
import React from "react";

export default function ReturnHomePageBtn({
  className,
}: {
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={` ${className}   inline-block rounded bg-brand sm:px-5 sm:py-3 px-3 py-2 text-xs sm:text-sm font-medium transition duration-300 text-white hover:bg-blue-700 focus:outline-none focus:ring`}
    >
      Go Back Home page
    </Link>
  );
}
