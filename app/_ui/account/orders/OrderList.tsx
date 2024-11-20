import { getOrdersByUserId } from "@/app/actions/orderActions";
import { auth } from "@/auth";
import { IOrder } from "@/models/orderModel";
import Order from "./Order";
// import { IcartItem } from "@/store/productSlice";

export default async function OrderList() {
  const session = await auth();
  const orders: IOrder[] = await getOrdersByUserId(session?.user.id || "");
  const products = orders.flatMap((order) => order.products);
  // @ts-expect-error adasd
  const dates = orders.flatMap((order) => order.createdAt);

  console.log(dates);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
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
            {/* <th>Favorite Color</th> */}
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
