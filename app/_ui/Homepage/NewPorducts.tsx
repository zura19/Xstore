import { getNewProducts } from "@/app/actions/productActions";
import ProductsList from "../ProductsList";
import { stringIdAndParseObject } from "@/lib/stringMongoId";

export default async function NewPorducts() {
  const newProducts = await getNewProducts();

  return (
    <div className="">
      <p className="text-2xl font-semibold mb-4">New products</p>

      <ProductsList
        isAnimation={true}
        cols={5}
        products={stringIdAndParseObject(newProducts)}
      />
    </div>
  );
}
