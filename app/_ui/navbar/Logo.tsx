import { auth } from "@/auth";
import Link from "next/link";
import React from "react";
import { HiOutlinePhone } from "react-icons/hi2";

export default function Logo({ size }: { size?: string }) {
  // const session = await auth();
  return (
    <Link
      href={"/"}
      className={`flex items-center ${size === "small" ? "gap-2" : "gap-3"}`}
    >
      <div
        className={` bg-blue-600 ${
          size === "small" ? "p-1.5" : "p-2"
        }  rounded-full`}
      >
        <HiOutlinePhone
          size={size === "small" ? 15 : 22}
          className="text-gray-200 "
        />
      </div>
      <div
        className={`divider ${
          size === "small" ? "h-7" : "h-14"
        } max-w-0  divider-horizontal before:w-[1px] after:w-[1px] before:bg-gray-400 after:bg-gray-400 ml-0 mr-0`}
      ></div>

      <h1
        className={`font-extrabold ${
          size === "small" ? "text-lg" : "text-3xl"
        }`}
      >
        Xstore
        {/* {session?.user?.name || ""} */}
      </h1>
    </Link>
  );
}