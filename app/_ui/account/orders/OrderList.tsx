import { getOrdersByUserId } from "@/app/actions/orderActions";
import { auth } from "@/auth";
import { IOrder } from "@/models/orderModel";
import Order from "./Order";
import ReturnHomePageBtn from "../../ReturnHomePageBtn";

export default async function OrderList() {
  const session = await auth();
  const orders: IOrder[] = await getOrdersByUserId(session?.user.id || "");
  const products = orders.flatMap((order) => order.products);
  // @ts-expect-error adasd
  const dates = orders.flatMap((order) => order.createdAt);

  if (products.length === 0)
    return (
      <div className="text-center py-8">
        <h1 className="font-bold text-xl sm:text-2xl py-1 sm:py-2">
          No Orders yet
        </h1>
        <ReturnHomePageBtn className="" />
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="table  text-xs sm:text-sm">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Product</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Order
              key={product.id}
              product={product}
              index={index}
              dates={dates}
            />
          ))}
        </tbody>
      </table>
    </div>

    // <ul className="">
    //   {products.map((product) => (
    //     <li className="p-2" key={product.id}>
    //       {product.title}
    //     </li>
    //   ))}
    // </ul>
  );
}
