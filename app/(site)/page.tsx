// import { Iproduct } from "@/models/productModel";
// import { getAllProducts } from "../actions/productActions";
import MainSlider from "../_ui/MainSlider";
import LaptopsAndPhones from "../_ui/LaptopsAndPhones";

import NewPorducts from "../_ui/Homepage/NewPorducts";
import DiscountedPorducts from "../_ui/Homepage/DiscountedProducts";

export default async function Home() {
  // const products: Iproduct[] = await getAllProducts();

  return (
    <div className="max-w-[90%] space-y-6 w-dvw py-6 pb-12 px-4 mx-auto">
      <MainSlider />
      <LaptopsAndPhones />
      <NewPorducts />
      <DiscountedPorducts />
    </div>
  );
}
