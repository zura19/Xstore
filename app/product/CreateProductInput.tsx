import React, { ReactNode } from "react";

export default function CreateProductInput({
  label,
  children,
}: {
  label: string;

  children: ReactNode;
}) {
  return (
    <div className="form-control">
      <label className="label  pb-1">
        <span className="label-text leading-5 text-gray-800">{label}</span>
      </label>
      {children}
    </div>
  );
}
