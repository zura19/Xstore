// "use client";
import CheckoutForm from "@/app/_ui/CheckoutForm";
// import { orderInfo } from "@/lib/getLocalStorageData";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ orderInfo: string }>;
}) {
  const params = await searchParams;
  if (!params || !params.orderInfo) return notFound();
  const orderInfo = JSON.parse(params.orderInfo);

  console.log(orderInfo);
  const productIds = orderInfo.products.map(
    (product: { id: string }) => product.id
  );
  const productQuantitys = orderInfo.products.map(
    (product: { quantity: number }) => product.quantity
  );
  console.log(productIds.join(","));
  console.log(productQuantitys.join(","));

  if (!orderInfo) return notFound();

  const stripeInstant = await stripe.paymentIntents.create({
    amount: orderInfo.totalPrice * 100,
    currency: "USD",
    metadata: {
      firstName: orderInfo.firstName,
      lastName: orderInfo.lastName,
      number: String(orderInfo.number),
      productIds: productIds.join(","),
      productQuantitys: productQuantitys.join(","),
      userId: orderInfo.userId,
      address: orderInfo.address,
      additionalInfo: orderInfo.additionalInfo,
      personId: orderInfo.personId,
    },
  });

  return (
    <div className="rounded-md ">
      <CheckoutForm
        totalPrice={Number(orderInfo.totalPrice) as number}
        clientSecret={stripeInstant.client_secret as string}
      />
    </div>
  );
}
