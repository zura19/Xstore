import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginGoogle() {
  return (
    <button className="btn flex w-full border-gray-300 items-center group bg-white transition-all duration-300 text-primary-50">
      <FcGoogle size={24} />
      <span className="text-gray-800 transition-all duration-300 group-hover:text-gray-50">
        Login with Google
      </span>
    </button>
  );
}
