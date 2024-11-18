import React from "react";
import SidebarFullItems from "./SidebarFullItems";
import { HiOutlineDevicePhoneMobile, HiOutlinePhone } from "react-icons/hi2";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiMacbookLine } from "react-icons/ri";
import Link from "next/link";
import AllCategoriesBtn from "../AllCategoriesBtn";

export default function SidebarFull() {
  return (
    <div className="drawer-side  z-50">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-white flex gap-1 text-base-content min-h-full w-80">
        <AllCategoriesBtn onSidebar={true} />

        <li className=" focus:bg-gray-200 active:bg-gray-200 ">
          <SidebarFullItems label="phones" to="/category/phone">
            <HiOutlineDevicePhoneMobile size={24} color="black" />
          </SidebarFullItems>
        </li>

        <li>
          <SidebarFullItems
            links={[
              { label: "Macbook M1", to: "/category/apple/macbook-m1" },
              { label: "Macbook M2", to: "/category/apple/macbook-m2" },
              { label: "Macbook M3", to: "/category/apple/macbook-m3" },
              { label: "Macbook M4", to: "/category/apple/macbook-m4" },
              { label: "Hp", to: "/category/laptop/hp" },
            ]}
            label="Laptops"
            to="/category/laptop"
          >
            <RiMacbookLine size={24} color="black" />
          </SidebarFullItems>
        </li>

        <li>
          <SidebarFullItems
            links={[
              { label: "Iphone 16 series", to: "/category/apple/iphone-16" },
              { label: "Iphone 15 series", to: "/category/apple/iphone-15" },
              { label: "Iphone 14 series", to: "/category/apple/iphone-14" },
            ]}
            label="Apple"
            to="/category/apple"
          >
            <FaApple size={24} color="black" />
          </SidebarFullItems>
        </li>

        <li>
          <SidebarFullItems label="Google" to="/category/google">
            <FcGoogle size={24} />
          </SidebarFullItems>
        </li>
      </ul>
    </div>
  );
}
