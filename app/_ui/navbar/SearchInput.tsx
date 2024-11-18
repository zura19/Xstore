"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { FormSubmitHandler } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  // const pathname = usePathname();v
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
  }, []);

  function onSearch() {
    const params = new URLSearchParams(searchParams);
    const page = params.get("page");
    if (Number(page) > 1) {
      params.delete("page");
    }
    if (query.length > 2) {
      if (params) {
        params.delete("min");
        params.delete("max");
      }
      params.set("search", query);
      router.replace(`/search?${params}`);
      setQuery("");
    } else {
      params.delete("search");
    }
  }

  return (
    <label className="input w-[30%] flex   focus:w-[50%]  items-center rounded-full pr-1 border-gray-300 bg-white">
      <form
        className="flex w-[100%] "
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <input
          value={query}
          // defaultValue={""}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="grow  placeholder:text-gray-500"
          placeholder="Search for product..."
        />
        <button className="bg-blue-600 btn min-h-0 h-auto border-none p-2 rounded-full transition-all duration-300 hover:bg-blue-700">
          <HiMagnifyingGlass size={24} color="white" />
        </button>
      </form>
    </label>
  );
}
