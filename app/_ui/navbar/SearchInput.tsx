"use client";
import { useWindowWidth } from "@/lib/useWindowWidth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const width = useWindowWidth();

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

  // return windowWidth;

  if (width < 640)
    return (
      <label className="input h-9 max-w-[200px] min-w-[100px]   flex   items-center rounded-full pr-1 border-gray-300 bg-white">
        <form
          className="flex justify-between  "
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
            className="w-[20%] text-sm grow bg-yellow-300 placeholder:text-sm  placeholder:text-gray-500"
            placeholder="product..."
          />
          <button className="bg-blue-600 btn min-h-0 h-auto border-none p-1 rounded-full transition-all duration-300 hover:bg-blue-700">
            <HiMagnifyingGlass size={20} color="white" />
          </button>
        </form>
      </label>
    );

  return (
    <label className="input  flex    focus:w-[50%]  items-center rounded-full pr-1 border-gray-300 bg-white">
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
