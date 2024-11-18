import React from "react";

export default function CardSkeleton() {
  return (
    <div className="flex w-full flex-col bg-white  rounded-md">
      <div className="skeleton h-48 rounded-b-none rounded-t-md   w-full mb-2"></div>
      <div className=" p-2 flex flex-col gap-2">
        <div className="skeleton h-4 w-40"></div>
        <div className="skeleton h-3 w-24"></div>
        <div className="skeleton h-3 w-32"></div>
        <div className="skeleton h-10 mt-2 rounded-md w-full"></div>
      </div>
    </div>
  );
}
