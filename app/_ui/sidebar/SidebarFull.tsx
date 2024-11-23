import React from "react";
import SidebarFullItems from "./SidebarFullItems";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiMacbookLine } from "react-icons/ri";
import AllCategoriesBtn from "../AllCategoriesBtn";

export default function SidebarFull() {
  return (
    <div className="drawer-side   z-50">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar z-50"
        className="drawer-overlay"
      ></label>
      <ul className="menu  bg-white flex gap-1 z-50 text-base-content min-h-full w-52  sm:w-80">
        <AllCategoriesBtn onSidebar={true} />

        <li className=" focus:bg-gray-200 active:bg-gray-200 ">
          <SidebarFullItems label="phones" to="/category/phone?page=1">
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
            to="/category/laptop?page=1"
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
            to="/category/apple?page=1"
          >
            <FaApple size={24} color="black" />
          </SidebarFullItems>
        </li>

        <li>
          <SidebarFullItems label="Google" to="/category/google?page=1">
            <FcGoogle size={24} />
          </SidebarFullItems>
        </li>
      </ul>
    </div>
  );
}
