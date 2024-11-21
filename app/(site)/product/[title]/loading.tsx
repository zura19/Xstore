import React from "react";

export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="loading loading-spinner bg-primary text-primary loading-lg"></span>
    </div>
  );
}
