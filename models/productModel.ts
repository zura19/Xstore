import mongoose, { Document } from "mongoose";

export interface Iproduct extends Document {
  title: string;
  price: number;
  stock: number;
  new: boolean;
  discount: number;
  brand: string;
  series: string;
  mainImage: string;
  images: [];
  category: string;
  specification: {
    brand: string;
    colors?: string;
    videoCard?: string;
    system: string;
    storage: string;
    ram: string;
  };
}

const productSchema = new mongoose.Schema<Iproduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  new: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },

  series: {
    type: String,
  },

  category: {
    type: String,
    required: true,
  },

  mainImage: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
  },

  specification: {
    brand: {
      type: String,
      required: true,
    },
    colors: {
      type: String, // Allows for both `string` and `string[]`
    },
    videoCard: {
      type: String,
    },
    system: {
      type: String,
      required: true,
    },
    storage: {
      type: String, // Allows for both `string` and `string[]`
      required: true,
    },
    ram: {
      type: String,
      required: true,
    },
  },
});

// productSchema.virtual("originalPrice").get(function () {
//   return this.price - (this.price * this.discount) / 100;
// });

// Optionally, make the virtual field show up when converting to JSON
// productSchema.set("toJSON", { virtuals: true });

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
