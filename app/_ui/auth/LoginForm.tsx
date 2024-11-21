import React, { useState } from "react";
import LoginGoogle from "./LoginGoogle";
import { useSwiper } from "swiper/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod";
import { z } from "zod";
import { BiHide, BiShow } from "react-icons/bi";
import {
  signInWithCredentials,
  signInWithGoogle,
} from "@/app/actions/authActions";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";

export default function LoginForm({ closeModal }: { closeModal: () => void }) {
  const swiper = useSwiper();
  const { register, formState, handleSubmit, reset } = useForm<
    z.infer<typeof loginSchema>
  >({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const user = await signInWithCredentials(values);

    if (user?.error) {
      toast.error(user.error);
      setError(user.error);
      return;
    }

    closeModal();

    toast.success("User logged in successfully");
    reset();
    await getSession();
    // }
  }

  // async function signInWithGoogle() {
  // }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 text-gray-700">
        <h1 className="mb-2 text-2xl font-bold">Log In</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700">Username</span>
          </label>
          <input
            {...register("username")}
            type="text"
            placeholder="username"
            className={`input bg-white placeholder:text-gray-400 border-gray-300 input-bordered ${
              formState.errors.username ? " border-red-400" : ""
            }`}
          />

          {formState.errors.username && (
            <p className="p-1 pb-0 text-red-500 text-sm">
              {formState.errors.username.message}
            </p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700">Password</span>
          </label>

          <label
            className={`input input-bordered flex items-center gap-2 ${
              formState.errors.password ? " border-red-400" : ""
            } `}
          >
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className={`grow`}
              placeholder="Password"
            />
            <p
              onClick={() => setShowPassword((show) => !show)}
              className="text-sm cursor-pointer"
            >
              {!showPassword ? (
                <BiHide className="text-gray-700" size={20} />
              ) : (
                <BiShow className="text-gray-700" size={20} />
              )}
            </p>
          </label>
          {formState.errors.password && (
            <p className="p-1 pb-0 text-red-500 text-sm">
              {formState.errors.password.message}
            </p>
          )}
          <label className="label">
            <div
              // onClick={() => setIsLogin((value) => !value)}
              onClick={() => swiper.slideNext()}
              className="label-text-alt text-gray-700 link link-hover"
            >
              Do not have an Account?
            </div>
          </label>
          {error && (
            <p className="my-3 bg-red-400 text-white text-sm font-semibold rounded-md p-2">
              {error}
            </p>
          )}
        </div>
        <div className="form-control mt-2">
          {!formState.isSubmitting ? (
            <button className="btn bg-brand text-white hover:bg-blue-800 border-none">
              Log In
            </button>
          ) : (
            <button
              disabled={true}
              className="btn bg-brand text-white hover:bg-blue-800 border-none"
            >
              <span className="loading loading-spinner text-white loading-sm"></span>
            </button>
          )}
        </div>

        <div className="divider mb-1 text-gray-700">OR</div>
      </form>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signInWithGoogle();
        }}
        className="px-4"
      >
        <LoginGoogle />
      </form>
    </>
  );
}
