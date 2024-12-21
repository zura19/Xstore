import React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import ProductTable from "./ProductTable";
type Iprop = {
  order: {
    title: string;
    quantity: number;
    image: string;
    price: number;
  }[];
};

export default function PurchaseReceipt({ order }: Iprop) {
  return (
    <Html>
      <Preview>order recieved</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white"></Body>
        <Container className="max-w-xl">
          {/* <Heading>Purchase Receipt {order?.title}</Heading> */}

          <ProductTable order={order} />
        </Container>
      </Tailwind>
    </Html>
  );
}
