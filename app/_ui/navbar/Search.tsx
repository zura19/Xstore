import React from "react";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

export default function Search() {
  return (
    <div className="navbar flex items-center justify-between px-6 py-4 bg-white">
      <Logo />
      <SearchInput />
    </div>
  );
}
