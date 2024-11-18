import React, { ReactNode } from "react";

export default function CreateProductInput({
  label,
  children,
}: {
  label: string;

  children: ReactNode;
}) {
  // if (select)
  //   return (
  //     <div className="form-control">
  //       <label className="label  pb-1">
  //         <span className="label-text leading-5 text-gray-800">{label}</span>
  //       </label>
  //       <select
  //         // onChange={}
  //         className="select select-bordered rounded-md placeholder:text-gray-500 focus:outline-1 focus:outline-brand bg-white border-gray-400 w-full max-w-xs"
  //       >
  //         <option disabled selected>
  //           Is new?
  //         </option>
  //         <option value={"yes"}>Yes</option>
  //         <option value={"no"}>No</option>
  //       </select>
  //     </div>
  //   );
  // if (!select)
  return (
    <div className="form-control">
      <label className="label  pb-1">
        <span className="label-text leading-5 text-gray-800">{label}</span>
      </label>
      {children}
    </div>
  );
}
