"use client";
import React, { useRef } from "react";
import {
  HiMiniEllipsisVertical,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import ProductForm from "../product/ProductForm";
import { deleteProduct } from "../actions/productActions";
import toast from "react-hot-toast";

export default function DeleteOrUpdate({
  product,
}: {
  product: {
    id: string;
    title: string;
    price: number;
    discount: number;
    stock: number;
    isNew: boolean;
    mainImage: string;
    images: [];
    category: string;
    series: string;
    specifications: {
      brand: string;
      colors?: string;
      videoCard?: string;
      system: string;
      storage: string;
      ram: string;
    };
  };
}) {
  const updateModalRef = useRef(null);

  async function handleDelete() {
    await deleteProduct(product.id);
    toast.success("Product deleted successfully");
  }

  return (
    <div className="dropdown dropdown-top dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="hover:bg-gray-100 py-1 rounded-md transition-all duration-300"
      >
        <HiMiniEllipsisVertical size={20} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content cursor-pointer   flex-none grow-0   bg-base-100 rounded-md z-[1]  shadow"
      >
        {/* <dialog id="create-modal"> */}
        <li
          onClick={handleDelete}
          className="p-2  focus:bg-red-500   hover:bg-gray-100 rounded-md transition-all duration-300"
        >
          <HiOutlineTrash size={20} />
        </li>

        <li
          // @ts-expect-error idk
          onClick={() => updateModalRef?.current?.showModal()}
          className="p-2  focus:bg-red-500   hover:bg-gray-100 rounded-md transition-all duration-300"
        >
          <HiOutlinePencilSquare size={20} />
        </li>
      </ul>

      <dialog id="update_modal" ref={updateModalRef} className="modal">
        <ProductForm product={product} />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
