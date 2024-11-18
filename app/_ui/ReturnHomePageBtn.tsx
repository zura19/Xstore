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
      className={` ${className}   inline-block rounded bg-brand px-5 py-3 text-sm font-medium transition duration-300 text-white hover:bg-blue-700 focus:outline-none focus:ring`}
    >
      Go Back Home page
    </Link>
  );
}
