"use server";
import { connectToDB } from "@/lib/db";
import Order, { IOrder } from "@/models/orderModel";
import Product from "@/models/productModel";
import { revalidatePath } from "next/cache";

export async function addOrder(order: IOrder) {
  try {
    connectToDB();
    // Iterate through each product in the order's products array
    for (const cartItem of order.products) {
      const { id, quantity } = cartItem;

      // Find the product and ensure it exists
      const product = await Product.findById(id);

      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }

      if (product.stock < quantity) {
        throw new Error(
          `Not enough stock for product "${product.title}". Available: ${product.stock}, Requested: ${quantity}`
        );
      }

      // Decrease the stock
      product.stock -= quantity;
      await product.save(); // Save the updated product
    }

    // Save the order
    const newOrder = new Order(order);
    await newOrder.save();
    revalidatePath("/");
    return { success: "Product bought successfully" };
  } catch (err) {
    // Log the error or handle it as needed
    // console.error("Error adding order:", err?.message);
    throw err;
  }
}

export async function getOrdersByUserId(id: string) {
  try {
    const orders = await Order.find({ userId: id });
    return orders;
  } catch (err) {
    throw err;
  }
}
