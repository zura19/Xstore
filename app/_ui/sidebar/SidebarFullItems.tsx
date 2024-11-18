"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function SidebarFullItems({
  to,
  label,
  links,
  children,
}: {
  to: string;
  label: string;
  links?: {
    label?: string;
    to?: string;
  }[];
  children: ReactNode;
}) {
  const router = useRouter();

  function handleNavigation(path: string) {
    router.replace(`${path}`);
  }

  return (
    <div className="dropdown dropdown-hover flex  p-0 gap-2 focus:bg-gray-200 active:bg-gray-200  dropdown-right">
      <label
        htmlFor="my-drawer"
        onClick={() => handleNavigation(to)}
        tabIndex={0}
        className="flex items-center flex-1 rounded-md p-2 active:bg-gray-200 focus:bg-gray-100 active:text-gray-900 active:rounded-md  hover:cursor-pointer gap-1.5"
      >
        {children}
        <p className="font-medium ">{label}</p>
        {links && links?.length > 0 && (
          <IoIosArrowForward className="ml-auto" size={12} />
        )}
      </label>
      {links && links?.length > 0 && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 -translate-x-4 shadow"
        >
          {links?.map((link, index) => (
            <li key={index}>
              <label
                onClick={() => handleNavigation(String(link.to))}
                htmlFor="my-drawer"
                aria-label="close sidebar"
              >
                {link.label}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
