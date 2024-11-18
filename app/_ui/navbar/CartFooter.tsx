// "use client";
import formatCurrency from "@/lib/formatCurrency";
import { IcartItem } from "@/store/productSlice";
import { useAppSelector } from "@/store/store";

export default function CartFooter() {
  const cart = useAppSelector(
    (state) => state.persistedProductsReducer.product.cart
  );

  const totalPrice = cart.reduce((total: number, product: IcartItem) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="border-t  flex flex-col gap-2 mt-auto p-4 justify-end border-gray-300">
      <div className="flex text-lg font-semibold mb-6 justify-between">
        <p>Total:</p>
        <p className="text-brand">{formatCurrency(totalPrice)}</p>
      </div>
      <button className="btn min-h-12 h-12 rounded-md flex-1 bg-brand hover:bg-blue-700 transition-all duration-300 border-none text-white">
        Visit Cart
      </button>

      <button className="btn min-h-12 h-12 rounded-md flex-1 bg-green-600 hover:bg-green-700 transition-all duration-300 border-none text-white">
        Buy now
      </button>
    </div>
  );
}
