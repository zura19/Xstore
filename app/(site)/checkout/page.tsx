import DeliveryForm from "@/app/_ui/checkout/DeliveryForm";
import Orderdetails from "@/app/_ui/checkout/Orderdetails";

export default function Checkout() {
  return (
    <div className="w-[80%] mx-auto  grid grid-cols-[2fr_1fr]  gap-12 py-6">
      <DeliveryForm />
      <Orderdetails />
    </div>
  );
}
