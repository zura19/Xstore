"use client";
import { useWindowWidth } from "@/lib/useWindowWidth";
import React from "react";
import BottomNavItem from "./BottomNavItem";
import { HiOutlineHeart, HiOutlineHome, HiOutlineUser } from "react-icons/hi2";
import AuthModal from "../auth/AuthModal";
import { useSession } from "next-auth/react";
import Cart from "../navbar/Cart";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const width = useWindowWidth();
  const session = useSession();
  const pathname = usePathname();

  if (width >= 640) return null;

  return (
    <div className="btm-nav btm-nav-sm  z-20">
      <BottomNavItem to="/" label={"Home"}>
        <HiOutlineHome
          size={20}
          strokeWidth={2}
          fill={pathname === "/" ? "#1c61e7" : "none"}
        />
      </BottomNavItem>

      <BottomNavItem to="/favorites" label={"Favorites"}>
        {/* <HiOutlineHome size={20} strokeWidth={2} /> */}
        <HiOutlineHeart
          fill={pathname === "/favorites" ? "#1c61e7" : "none"}
          size={20}
          strokeWidth={2}
        />
      </BottomNavItem>

      <Cart bottomNav={true} />

      {session.data?.user ? (
        <BottomNavItem
          to="/account"
          label={session.data.user.name.split(" ")[0]}
        >
          {/* <HiOutlineHome size={20} strokeWidth={2} /> */}
          <HiOutlineUser
            size={20}
            fill={pathname === "/account" ? "#1c61e7" : "none"}
            strokeWidth={2}
          />
        </BottomNavItem>
      ) : (
        <AuthModal bottomNav={true} />
      )}
    </div>
  );
}
