import { connectToDB } from "@/lib/db";
import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import PurchaseReceipt from "@/email/PurchaseReceipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  console.log("here ok");

  if (event.type === "charge.succeeded") {
    await connectToDB();
    const paymentIntent = event.data.object;
    const productIds = paymentIntent.metadata.productIds.split(",");
    const productQuantitys = paymentIntent.metadata.productQuantitys.split(",");
    const email = paymentIntent.billing_details.email;
    const {
      firstName,
      lastName,
      number,
      userId,
      address,
      additionalInfo,
      personId,
    } = paymentIntent.metadata;
    console.log(paymentIntent.metadata);

    await Order.create({
      firstName,
      lastName,
      number: Number(number),
      email,
      userId,
      address,
      additionalInfo,
      personId,
      products: productIds.map((productId, i) => ({
        productId,
        quantity: Number(productQuantitys[i]),
      })),
      totalPrice: paymentIntent.amount / 100,
    });
    productIds.forEach(async (productId, i) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      product.stock -= Number(productQuantitys[i]);
      await product.save();
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orders: any = [];
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const product = await Product.findById(productId);
      const isDiscount = product?.discount > 0;

      orders.push({
        title: product?.title,
        quantity: Number(productQuantitys[i]),
        image: product?.mainImage,
        price: isDiscount
          ? (product?.price * product.discount) / 100
          : product?.price,
      });
    }

    console.log(orders);

    await resend.emails.send({
      from: `Xstore <${process.env.SENDER_EMAIL!}>`,
      to: email as string,
      subject: "Order Confirmation",
      react: <PurchaseReceipt order={orders} />,
    });
    revalidatePath("/");
  }
  return new NextResponse();
}
