"use client";
import { signUp } from "@/app/actions/authActions";
import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import { useSwiper } from "swiper/react";
import { z } from "zod";

export default function SignUpForm({ closeModal }: { closeModal: () => void }) {
  const swiper = useSwiper();

  const { formState, handleSubmit, register, reset } = useForm<
    z.infer<typeof signUpSchema>
  >({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      // number: ,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const user = await signUp(values);

    if (user.error) {
      toast.error(user.error);
      setError(user.error);
    }

    if (user.success) {
      toast.success(user.success);
      closeModal();
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="  p-4  ">
      <h1 className="mb-2 text-2xl font-bold">Sign Up</h1>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-gray-700">Username</span>
        </label>
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          className={`input bg-white placeholder:text-gray-400 ${
            formState.errors.username ? "border-red-400" : " border-gray-300"
          } input-bordered`}
        />
        {formState.errors.username && (
          <p className="p-1 pb-0 text-red-500 text-sm">
            {formState.errors.username.message}
          </p>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-gray-700">Email</span>
        </label>
        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className={`input bg-white placeholder:text-gray-400 ${
            formState.errors.email ? "border-red-400" : " border-gray-300"
          } input-bordered`}
          // className="input bg-white placeholder:text-gray-400 border-gray-300 input-bordered"
        />
        {formState.errors.email && (
          <p className="p-1 pb-0 text-red-500 text-sm">
            {formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-gray-700">Phone</span>
        </label>
        <input
          {...register("number", { valueAsNumber: true })}
          type="phone"
          placeholder="Phone"
          className={`input bg-white placeholder:text-gray-400 ${
            formState.errors.number ? "border-red-400" : " border-gray-300"
          } input-bordered`}
          // className="input bg-white placeholder:text-gray-400 border-gray-300 input-bordered"
        />
        {formState.errors.number && (
          <p className="p-1 pb-0 text-red-500 text-sm">
            {formState.errors.number.message}
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
        {/* <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className={`input bg-white placeholder:text-gray-400 ${
            formState.errors.password ? "border-red-400" : " border-gray-300"
          } input-bordered`} */}

        {/* /> */}

        <label className="label">
          <div
            // onClick={() => setIsLogin((value) => !value)}
            onClick={() => swiper.slidePrev()}
            className="label-text-alt text-gray-700 link link-hover"
          >
            Alredy have an Account?
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
            Sign Up
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
    </form>
  );
}
