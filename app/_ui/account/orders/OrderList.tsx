import { getOrdersByUserId } from "@/app/actions/orderActions";
import { auth } from "@/auth";
import Order from "./Order";
import ReturnHomePageBtn from "../../ReturnHomePageBtn";

export default async function OrderList() {
  const session = await auth();
  const orders = await getOrdersByUserId(session?.user?.id as string);

  const products = orders.map((order) => {
    // @ts-expect-error createdat is not on the order object
    return { arr: [...order.products], createdAt: order.createdAt };
  });

  // @ts-expect-error createdat is not on the order object
  const dates = orders.map((order) => order?.createdAt || "unknown");
  console.log(dates);

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
    <div className="max-h-[550px] overflow-y-scroll">
      <table className="table  text-xs sm:text-sm">
        <thead>
          <tr>
            <th>
              Status
              {/* <label>
                <input type="checkbox" className="checkbox" />
              </label> */}
            </th>
            <th>Product</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="">
          {products
            .flat()
            .map((product, index) =>
              product.arr.map((product) => (
                <Order
                  key={index}
                  index={index}
                  dates={dates}
                  quantity={product.quantity}
                  productId={product.productId as string}
                />
              ))
            )}
        </tbody>
      </table>
    </div>
  );
}
