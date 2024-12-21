"use client";
import formatCurrency from "@/lib/formatCurrency";
import { emptyCart } from "@/store/productSlice";
import { useAppDispatch } from "@/store/store";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutForm({
  clientSecret,
  totalPrice,
}: {
  clientSecret: string;
  totalPrice: number;
}) {
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form totalPrice={totalPrice} clientSecret={clientSecret} />
    </Elements>
  );
}

function Form({
  totalPrice,
  clientSecret,
}: {
  totalPrice: number;
  clientSecret: string;
}) {
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  //   eslint-disable-next-line
  const [email, setEmail] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (stripe == null || elements == null) return;

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL!}/payment/success`,
        },
      })

      .then((err) => {
        if (
          err.error.type === "card_error" ||
          err.error.type === "validation_error"
        ) {
          setErrorMessage(err.error.message as string);
        } else {
          console.error(err);
          setErrorMessage("An unknown error occured!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    const res = await stripe.retrievePaymentIntent(clientSecret);
    if (res.paymentIntent?.status === "succeeded") {
      dispatch(emptyCart());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
      <PaymentElement />
      <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
      <button
        disabled={stripe == null || elements == null || isLoading}
        className="btn w-full bg-brand text-white font-bold hover:bg-blue-700 transition-all duration-300"
      >
        Purchase - {formatCurrency(totalPrice)}
      </button>
    </form>
  );
}
