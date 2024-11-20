import { handleSignOut } from "@/app/actions/authActions";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { HiOutlineUser } from "react-icons/hi2";

export default function UserInNavbar({
  user,
}: {
  user: {
    role: string;
    email: string;
    name: string;
    image: string;
  };
}) {
  return (
    <div
      data-tip={user?.name as string}
      className="tooltip tooltip-bottom dropdown  dropdown-bottom"
    >
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle drawer-button   w-12 h-12 flex items-center justify-center   avatar"
      >
        <div className="indicator  p-2 flex items-center justify-center  bg-white rounded-full">
          <HiOutlineUser
            className="flex items-center justify-center"
            size={24}
          />
        </div>
        {/* <div className="object-cover indicator  w-10 h-10   rounded-full">
          <Image
            fill
            className="rounded-full"
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div> */}
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white rounded-md z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link href={"/account"} className=" justify-between">
            Account
          </Link>
        </li>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSignOut();
            await getSession();
          }}
        >
          <li>
            <button className="">Logout</button>
          </li>
        </form>
      </ul>
    </div>
  );
}
