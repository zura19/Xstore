"use client";
import { handleSignOut } from "@/app/actions/authActions";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignOutBtn() {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSignOut();
        await getSession();
        router.push("/");
      }}
      className="mx-auto"
    >
      <button
        type="submit"
        className="btn sm:btn-sm bg-red-500 text-white flex-0 mx-auto rounded-md px-3 btn-xs text-xs sm:text-sm sm:px-4 hover:bg-red-600"
      >
        Log out
      </button>
    </form>
  );
}
