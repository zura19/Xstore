import OrderList from "@/app/_ui/account/orders/OrderList";
import Loader from "@/app/_ui/Loader";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="border-l  flex flex-col gap-2 px-6 border-gray-200">
      <h2 className="text-xl font-semibold ">Orders</h2>
      <Suspense fallback={<Loader />}>
        <OrderList />
      </Suspense>
    </div>
  );
}
