import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LaptopsAndPhones() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 max-w-[100%] mx-auto gap-y-6 gap-12 ">
      <Link
        href={"/category/laptop"}
        className="bg-white shadow-md group   bg-gradient-to-r from-blue-100 via-blue-300 to-cyan-500  border border-gray-200 rounded-md flex-grow sm:p-4 p-2"
      >
        <p className=" text-xl sm:text-2xl font-semibold mb-2 sm:mb-6">
          Laptops
        </p>
        <div className="relative justify-self-center lg:w-44 lg:h-44 max-h-56 max-w-56  min-h-32 min-w-32">
          <Image
            src={
              "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111902_mbp14-silver2.png"
            }
            alt="Laptop"
            quality={100}
            fill
            className="justify-self-center object-contain group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </Link>

      <Link
        href={"/category/phone"}
        className="bg-white shadow-md group   bg-gradient-to-r from-indigo-300 via-slate-400 to-indigo-300  border border-gray-200 rounded-md flex-grow sm:p-4 p-2"
      >
        <p className=" text-xl sm:text-2xl font-semibold mb-2 sm:mb-6">
          Phones
        </p>
        <div className="relative justify-self-center lg:w-44 lg:h-44 max-h-56 max-w-56  min-h-32 min-w-32">
          <Image
            src={"https://pngimg.com/uploads/iphone16/iphone16_PNG13.png"}
            alt="Laptop"
            quality={100}
            fill
            className="justify-self-center object-contain group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </Link>

      <Link
        href={"/category/headphones"}
        className="bg-white shadow-md group   bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400  border border-gray-200 rounded-md flex-grow sm:p-4 p-2"
      >
        <p className=" text-xl sm:text-2xl font-semibold mb-2 sm:mb-6">
          Headphones
        </p>
        <div className="relative justify-self-center lg:w-44 lg:h-44 max-h-56 max-w-56  min-h-32 min-w-32">
          <Image
            src={
              "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121204-airpods-4-anc.png"
            }
            alt="Laptop"
            quality={100}
            fill
            className="justify-self-center object-contain group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </Link>

      {/* <Link
        href={"/category/phone"}
        className="bg-white shadow-md group   bg-gradient-to-r from-indigo-300 via-slate-400 to-indigo-300  border border-gray-200 rounded-md flex-grow p-4"
      >
        <p className="text-2xl font-semibold mb-6">Phones</p>
        <div className="relative justify-self-center h-56 w-56 ">
          <Image
            src={"https://pngimg.com/uploads/iphone16/iphone16_PNG13.png"}
            alt="Laptop"
            quality={100}
            fill
            className="justify-self-center object-contain group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </Link> */}
      {/* 
      <Link
        href={"/category/phone"}
        className="bg-white shadow-md group    bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400  border border-gray-200 rounded-md flex-grow p-4"
      >
        <p className="text-2xl font-semibold mb-6">Headphones</p>
        <div className="relative justify-self-center h-56 w-56 ">
          <Image
            src={
              "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121204-airpods-4-anc.png"
            }
            alt="Laptop"
            quality={100}
            fill
            className="justify-self-center  object-contain group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </Link> */}
    </div>
  );
}
