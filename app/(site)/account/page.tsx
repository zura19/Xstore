import { auth } from "@/auth";
import Image from "next/image";
import React from "react";
import { HiOutlineUser } from "react-icons/hi2";

export default async function page() {
  const session = await auth();
  return (
    <div className="border-l py-4 flex  flex-col gap-2 px-6 border-gray-200">
      {session?.user.image ? (
        <div className="relative self-center w-32 h-32 rounded-full  border-none">
          <Image
            src={session?.user.image || ""}
            alt={session?.user.name || ""}
            fill
            className="object-contain rounded-full"
          />
        </div>
      ) : (
        <div className="bg-white flex items-center self-center w-32 h-32 rounded-full justify-center">
          <HiOutlineUser size={52} />
        </div>
      )}
      <h1 className="self-center text-xl font-semibold">
        Hello, {session?.user.name}
      </h1>
    </div>
  );
}
