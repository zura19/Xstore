import { getNewProducts } from "@/app/actions/productActions";
import ProductsList from "../ProductsList";
import { stringIdAndParseObject } from "@/lib/stringMongoId";

export default async function NewPorducts() {
  const newProducts = await getNewProducts();

  console.log(newProducts);

  // const passedProducts = newProducts.map((product) => {
  //   return { ...product.toObject(), _id: String(product._id) };
  // });

  console.log(NewPorducts);

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
