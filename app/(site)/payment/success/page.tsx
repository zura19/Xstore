import SuccessHeader from "@/app/_ui/SuccessHeader";
import formatCurrency from "@/lib/formatCurrency";
import Product from "@/models/productModel";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";

export const metadata = {
  title: "Xstore - Payment Success",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent: string }>;
}) {
  const params = await searchParams;
  if (!params.payment_intent) return notFound();
  const paymentIntent = await stripe.paymentIntents?.retrieve(
    params.payment_intent
  );

  if (paymentIntent.status !== "succeeded") return notFound();

  console.log(paymentIntent.metadata);
  const productIds = paymentIntent.metadata.productIds.split(",");
  const productquantitys = paymentIntent.metadata.productQuantitys.split(",");

  const products = await Product.find({ _id: { $in: productIds } });

  console.log(products);

  return (
    <div className="max-w-[90%] mx-auto flex flex-col items-center my-6 py-6 rounded-md bg-white">
      <SuccessHeader />
      <div className="self-start mt-4 px-12">
        {products.map((product, i) => (
          <div key={product._id} className="flex items-center gap-1 mt-4">
            <div className="relative h-24 w-24">
              <Image
                fill
                className="object-contain rounded-md"
                src={product.mainImage}
                alt={product?.title}
              />
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold">{product.title}</p>
              <p className="text-sm text-gray-500">
                {product.discount > 0
                  ? formatCurrency(
                      product.price - (product.price * product.discount) / 100
                    )
                  : formatCurrency(product.price)}{" "}
                x {productquantitys[i]}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-[90%] w-full mx-auto mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Lastname</th>
              <th>Number</th>

              <th>Address</th>
              <th>ID</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{paymentIntent.metadata.firstName}</td>
              <td>{paymentIntent.metadata.lastName}</td>
              <td>{paymentIntent.metadata.number}</td>

              <td>
                {paymentIntent.metadata.address.length > 20
                  ? paymentIntent.metadata.address.slice(0, 20) + "..."
                  : paymentIntent.metadata.address}
              </td>
              <td>{paymentIntent.metadata.personId}</td>

              <td>{formatCurrency(paymentIntent.amount / 100)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
