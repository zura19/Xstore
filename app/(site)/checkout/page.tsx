import DeliveryForm from "@/app/_ui/checkout/DeliveryForm";
import Orderdetails from "@/app/_ui/checkout/Orderdetails";

export const metadata = {
  title: "Xstore - checkout",
};

export default function Checkout() {
  return (
    <div className="lg:w-[90%]  xl:w-[80%] px-4 mx-auto  grid md:grid-cols-[2fr_1fr] gap-6 lg:gap-12 py-6">
      <DeliveryForm />
      <Orderdetails />
    </div>
  );
}
