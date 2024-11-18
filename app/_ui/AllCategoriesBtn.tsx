import React from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import SidebarItem from "./sidebar/SidebarItem";

export default function AllCategoriesBtn({
  onSidebar,
}: {
  onSidebar?: boolean;
}) {
  return (
    <label
      htmlFor="my-drawer"
      className={`flex group cursor-pointer items-center ${
        onSidebar ? "bg-brand" : "bg-white"
      } p-1 pr-3 gap-1.5 rounded-full`}
    >
      <SidebarItem size={"small"} main={true}>
        <HiMiniBars3 size={20} color="white" />
      </SidebarItem>
      <p
        className={`font-semibold ${
          onSidebar ? "text-white" : " group-hover:text-gray-600"
        } text-sm  transition-all duration-300`}
      >
        All Categories
      </p>
    </label>
  );
}
