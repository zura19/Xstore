"use client";

import { orderSchema } from "@/lib/zod";
import { IcartItem } from "@/store/productSlice";
import { useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
import { z } from "zod";

export default function DeliveryForm() {
  const { data: userInfo } = useSession();
  const cart: IcartItem[] = useAppSelector(
    (state) => state.persistedProductsReducer.product.cart
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { register, formState, handleSubmit, reset } = useForm<
    z.infer<typeof orderSchema>
  >({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      firstName: userInfo?.user.name || "",
      email: userInfo?.user.email || "",
      number: userInfo?.user.phone,
    },
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        firstName: userInfo.user.name || "",
        email: userInfo.user.email || "",
        number: userInfo?.user.phone,
      });
    }
  }, [userInfo, reset]);

  const totalPrice = cart.reduce((total: number, product: IcartItem) => {
    return total + product.price * product.quantity;
  }, 0);

  async function onSubmit(values: z.infer<typeof orderSchema>) {
    // const order = await addOrder({
    //   ...values,
    //   products: cart,
    //   totalPrice,
    //   userId: userInfo?.user.id ? userInfo.user.id : "",
    // });

    localStorage.setItem(
      "orderInfo",
      JSON.stringify({
        ...values,
        products: cart.map((product) => product.id),
        totalPrice,
        userId: userInfo?.user.id ? userInfo.user.id : "",
      })
    );
    const params = new URLSearchParams(searchParams);
    // params.set("productId", cart.map((product) => product.id).join(","));
    params.set(
      "orderInfo",
      JSON.stringify({
        ...values,
        products: cart.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
          };
        }),
        totalPrice,
        userId: userInfo?.user.id ? userInfo.user.id : "",
      })
    );

    setTimeout(() => router.push(`${pathname}/payment/?${params}`), 200);

    // if (order.success) {
    //   toast.success(order.success);
    //   dispatch(emptyCart());
    // }
  }

  return (
    <div className="p-4 bg-white rounded-md  shadow-md text-gray-700">
      <h2 className="text-xl font-medium text-gray-700">Payment / delivey</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-y-4 gap-x-12 mt-4"
      >
        <div className="flex flex-col gap-1">
          <label>First name</label>
          <input
            {...register("firstName")}
            // defaultValue={userInfo?.user.name || ""}
            className="create-input  h-10"
          />
          {formState.errors.firstName && (
            <p className="text-sm p-1 pb-0 text-red-500 ">
              {formState.errors.firstName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Last name</label>
          <input {...register("lastName")} className="create-input h-10" />
          {formState.errors.lastName && (
            <p className="text-sm p-1 pb-0 text-red-500 ">
              {formState.errors.lastName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col  gap-1">
          <label>ID</label>
          <input {...register("personId")} className="create-input h-10" />
          {formState.errors.personId && (
            <p className="text-sm p-1 pb-0 text-red-500 ">
              {formState.errors.personId.message}
            </p>
          )}
        </div>

        <div className="flex flex-col  gap-1">
          <label>Address</label>
          <textarea
            {...register("address")}
            className="create-input py-1 h-10"
          />
          {formState.errors.address && (
            <p className="text-sm p-1 pb-0 text-red-500 ">
              {formState.errors.address.message}
            </p>
          )}
        </div>

        <div className="flex flex-col  gap-1">
          <label>Email</label>
          <input
            {...register("email")}
            // defaultValue={userInfo?.user.email || ""}
            className="create-input h-10"
          />
          {formState.errors.email && (
            <p className="text-sm p-1 pb-0 text-red-500 ">
              {formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col  gap-1">
          <label>Phone number</label>
          <input
            {...register("number", { valueAsNumber: true })}
            defaultValue={userInfo?.user?.phone}
            className="create-input h-10"
          />
          {formState.errors.number && (
            <p className="text-sm p-1 pb-0 text-red-500 ">
              {formState.errors.number.message}
            </p>
          )}
        </div>

        <div className="flex flex-col col-start-1 -col-end-1  gap-1">
          <label>Tell us something if you want</label>
          <textarea
            {...register("additionalInfo")}
            className="create-input py-2 h-36"
          />
        </div>
        {formState.isSubmitting ? (
          <button
            disabled={true}
            className="btn btn-primary font-bold text-lg rounded-md text-white col-start-1 -col-end-1"
          >
            <span className="loading loading-spinner text-white loading-sm"></span>
          </button>
        ) : (
          <button className="btn btn-primary font-bold  rounded-md text-white col-start-1 -col-end-1">
            Buy
          </button>
        )}
      </form>
    </div>
  );
}
