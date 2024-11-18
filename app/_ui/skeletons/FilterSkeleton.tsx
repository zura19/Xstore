import React from "react";

export default function FilterSkeleton() {
  return (
    <div className="flex w-full  flex-col bg-white   rounded-md">
      <div className=" p-4 py-6 flex flex-col gap-3 border-b border-gray-200">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-3 w-24"></div>
        <div className="skeleton h-3 w-full"></div>
        <div className="skeleton h-3 w-24"></div>
        <div className="skeleton h-3 w-full"></div>
        <div className="flex gap-2">
          <div className="skeleton h-10 mt-2 rounded-md w-full"></div>
          <div className="skeleton h-10 mt-2 rounded-md w-full"></div>
        </div>
      </div>
      <div className="p-4 py-6 flex flex-col gap-3 border-">
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
  );
}
