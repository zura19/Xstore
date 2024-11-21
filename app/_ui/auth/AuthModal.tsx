"use client";
import React, { useRef } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import Auth from "./Auth";

export default function AuthModal({ bottomNav }: { bottomNav?: boolean }) {
  const authRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    if (authRef.current && typeof authRef.current.close === "function") {
      authRef.current.close();
    } else {
      console.error("Dialog element is not initialized correctly.");
    }
  };

  return (
    <>
      {!bottomNav ? (
        <button
          onClick={() => {
            // @ts-expect-error open modal
            authRef.current.showModal();
          }}
          className="drawer-button btn w-12 h-12 btn-ghost  btn-circle "
        >
          <div className="indicator  w-10 h-10 items-center justify-center  bg-white rounded-full">
            <HiOutlineUser size={24} />
          </div>
        </button>
      ) : (
        <button
          onClick={() => {
            // @ts-expect-error open modal
            authRef.current.showModal();
          }}
          // href={to}
        >
          {/* {children} */}
          <HiOutlineUser size={20} />

          <span className="btm-nav-label leading-4 font-semibold">User</span>
        </button>
      )}

      <dialog id="auth_modal" ref={authRef} className="modal">
        <div className="modal-box h-[85%] sm:h-[70%] bg-white     rounded-md">
          <Auth closeModal={closeModal} />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
