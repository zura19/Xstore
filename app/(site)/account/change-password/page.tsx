"use client";
import { changePassword } from "@/app/actions/authActions";
import { changePasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import { z } from "zod";

export default function ChangePassword() {
  const { register, formState, handleSubmit, reset } = useForm<
    z.infer<typeof changePasswordSchema>
  >({
    resolver: zodResolver(changePasswordSchema),
  });
  const router = useRouter();
  const session = useSession();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

  const [globalError, setGlobalError] = useState<string>("");

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    const change = await changePassword({
      ...values,
      id: session.data?.user.id || "",
    });

    if (change.error) {
      toast.error(change.error);
      setGlobalError(change.error);
    }

    if (change.success) {
      toast.success(change.success);
      reset();
      router.push("/");
    }
  }

  return (
    <div className="border-l  flex flex-col  gap-2 px-6 border-gray-200">
      <h2 className="text-xl font-semibold  ">Change password</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <div>
          <label
            className={`input input-bordered flex items-center  gap-2 ${
              formState.errors.currentPassword ? " border-red-400" : ""
            } `}
          >
            <input
              {...register("currentPassword")}
              type={showCurrentPassword ? "text" : "password"}
              className={`grow`}
              placeholder="Current password"
            />
            <p
              onClick={() => setShowCurrentPassword((show) => !show)}
              className="text-sm cursor-pointer"
            >
              {!showCurrentPassword ? (
                <BiHide className="text-gray-700" size={20} />
              ) : (
                <BiShow className="text-gray-700" size={20} />
              )}
            </p>
          </label>
          {formState.errors.currentPassword && (
            <p className="p-1 pb-0 text-red-500 text-sm">
              {formState.errors.currentPassword.message}
            </p>
          )}
        </div>
        <div>
          <label
            className={`input input-bordered flex items-center  gap-2 ${
              formState.errors.newPassword ? " border-red-400" : ""
            } `}
          >
            <input
              {...register("newPassword")}
              type={showNewPassword ? "text" : "password"}
              className={`grow`}
              placeholder="New password"
            />
            <p
              onClick={() => setShowNewPassword((show) => !show)}
              className="text-sm cursor-pointer"
            >
              {!showNewPassword ? (
                <BiHide className="text-gray-700" size={20} />
              ) : (
                <BiShow className="text-gray-700" size={20} />
              )}
            </p>
          </label>
          {formState.errors.newPassword && (
            <p className="p-1 pb-0 text-red-500 text-sm">
              {formState.errors.newPassword.message}
            </p>
          )}
        </div>
        <div>
          <label
            className={`input input-bordered flex items-center  gap-2 ${
              formState.errors.repeatNewPassword ? " border-red-400" : ""
            } `}
          >
            <input
              {...register("repeatNewPassword")}
              type={showRepeatNewPassword ? "text" : "password"}
              className={`grow`}
              placeholder="Repeat new password"
            />
            <p
              onClick={() => setShowRepeatNewPassword((show) => !show)}
              className="text-sm cursor-pointer"
            >
              {!showRepeatNewPassword ? (
                <BiHide className="text-gray-700" size={20} />
              ) : (
                <BiShow className="text-gray-700" size={20} />
              )}
            </p>
          </label>
          {formState.errors.repeatNewPassword && (
            <p className="p-1 pb-0 text-red-500 text-sm">
              {formState.errors.repeatNewPassword.message}
            </p>
          )}
        </div>
        {globalError && <p className="text-red-500 text-sm">{globalError}</p>}

        {!formState.isSubmitting ? (
          <button
            type="submit"
            className="btn bg-brand text-white hover:bg-blue-800 border-none"
          >
            Change password
          </button>
        ) : (
          <button
            disabled={true}
            className="btn bg-brand text-white hover:bg-blue-800 border-none"
          >
            <span className="loading loading-spinner text-white loading-sm"></span>
          </button>
        )}
      </form>
    </div>
  );
}
