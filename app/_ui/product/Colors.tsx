"use client";

import { useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function Colors({ colors }: { colors?: string }) {
  const [activeColor, setActiveColor] = useState<string>("");
  return (
    <div className="flex items-center font-semibold gap-3">
      <p className="mr-4">Color:</p>
      {colors?.split(",").map((color: string) => (
        <div
          data-tip={color}
          key={color}
          className="flex tooltip  items-center"
        >
          <button
            onClick={() => setActiveColor(color)}
            className={`w-7 h-7 rounded-full border ${
              activeColor === color
                ? "border-brand border-2"
                : " border-gray-300"
            }  `}
            style={{ backgroundColor: color }}
          ></button>
        </div>
      ))}
      <button
        onClick={() => setActiveColor("")}
        className="flex ml-4 items-center gap-0 font-light hover:text-gray-600 transition-all duration-300 text-gray-400"
      >
        <IoIosClose size={25} />
        <p>Clear</p>
      </button>
    </div>
  );
}
