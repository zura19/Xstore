"use client";
import React, { useRef } from "react";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import ProductForm from "../../product/ProductForm";

export default function CreateNew() {
  const createModalRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    if (
      createModalRef.current &&
      typeof createModalRef.current.close === "function"
    ) {
      createModalRef.current.close();
    } else {
      console.error("Dialog element is not initialized correctly.");
    }
  };

  return (
    <>
      <button
        onClick={() => createModalRef.current?.showModal()}
        className="btn w-12 h-12 btn-ghost   btn-circle "
      >
        <div className="indicator  w-10 h-10 items-center justify-center  bg-white rounded-full">
          <HiOutlineDocumentPlus size={24} color="" />
        </div>
      </button>

      <dialog
        id="create-product-modal"
        ref={createModalRef}
        className="modal  sm:fixed  absolute -z-20"
      >
        <ProductForm closeModal={closeModal} />
        <form method="dialog" className="">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
