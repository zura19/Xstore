"use client";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import User from "./User";
import Favorites from "./Favorites";
import Link from "next/link";
import SidebarItem from "../sidebar/SidebarItem";
import { HiMiniBars3 } from "react-icons/hi2";
import CreateNew from "./CreateNew";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserInNavbar from "../auth/UserInNavbar";
import UserSkeleton from "../skeletons/UserSkeleton";

const Navbar = () => {
  const { data: userInfo, status } = useSession();

  const [isVisible, setIsVisible] = useState(false);
  const [navHide, setNavHide] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const container = document.getElementById("scrollable-content");

    if (!container) return;

    const handleScroll = () => {
      setIsVisible(container.scrollTop > 150);
      if (container.scrollTop > 150 && container.scrollTop < 250) {
        setNavHide(true);
        setIsVisible(false);
      } else {
        setNavHide(false);
      }
    };

    container.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0 }
          : navHide
          ? { opacity: 0, y: -50 }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.5 }}
      className={`${
        isVisible ? "fixed top-0 right-0 left-[4%]" : "relative"
      } z-20 bg-indigo-100 shadow-md`}
    >
      <div className="navbar py-1 px-4 justify-between max-w-[90%] mx-auto">
        <div className="flex items-center gap-2">
          <label
            htmlFor="my-drawer"
            className="flex group cursor-pointer items-center bg-white p-1 pr-3 gap-2 rounded-full"
          >
            <SidebarItem size={"small"} main={true}>
              <HiMiniBars3 size={20} color="white" />
            </SidebarItem>
            <p className="font-semibold text-sm group-hover:text-gray-600 transition-all duration-300">
              All Categories
            </p>
          </label>

          <Link
            href={"/category/laptop"}
            className={`${
              pathname === "/category/laptop" && "text-brand bg-blue-200"
            } hover:text-brand font-semibold hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-300`}
          >
            Laptops
          </Link>

          <Link
            href={"/category/phone"}
            className={`${
              pathname === "/category/phone" && "text-brand bg-blue-200"
            } hover:text-brand font-semibold hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-300`}
          >
            Phones
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          {userInfo?.user ? (
            // @ts-expect-error idk
            <UserInNavbar user={userInfo?.user} />
          ) : status === "loading" ? (
            <UserSkeleton />
          ) : (
            <User />
          )}
          {userInfo?.user.role === "admin" ? <CreateNew /> : null}
          <Favorites />
          <Cart />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
