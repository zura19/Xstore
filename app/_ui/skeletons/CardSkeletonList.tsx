import React from "react";
import CardSkeleton from "./CardSkeleton";

export default function CardSkeletonList() {
  return (
    <div className="grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
