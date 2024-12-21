// import { IcartItem } from "@/store/productSlice";
import mongoose, { Schema, Model } from "mongoose";

// Define a TypeScript interface for the order
export interface IOrder {
  firstName: string;
  lastName: string;
  personId: string;
  address: string;
  email: string;
  number: number;
  additionalInfo?: string;
  products: { productId: string; quantity: number }[];
  totalPrice: number;
  userId: string;
}

// Define the Mongoose schema
const orderSchema: Schema<IOrder> = new Schema<IOrder>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [1, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [1, "Last name is required"],
    },
    personId: {
      type: String,
      required: [true, "Id is required"],
      minlength: [1, "Id is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [10, "Enter your real address"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Enter valid email",
      },
    },
    number: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    additionalInfo: {
      type: String,
      default: "",
    },

    products: {
      type: [
        {
          productId: { type: String },
          quantity: { type: Number },
        },
      ],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Define the Mongoose model with TypeScript
const Order: Model<IOrder> =
  mongoose?.models?.Orders || mongoose.model<IOrder>("Orders", orderSchema);

export default Order;
