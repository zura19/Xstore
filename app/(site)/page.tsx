import MainSlider from "../_ui/MainSlider";
import LaptopsAndPhones from "../_ui/LaptopsAndPhones";

import NewPorducts from "../_ui/Homepage/NewPorducts";
import DiscountedPorducts from "../_ui/Homepage/DiscountedProducts";

export default async function Home() {
  return (
    <div className="md:max-w-[90%] max-w-[100%] space-y-6 w-dvw py-6 pb-12 px-4 mx-auto">
      <MainSlider />
      <LaptopsAndPhones />
      <NewPorducts />
      <DiscountedPorducts />
    </div>
  );
}
