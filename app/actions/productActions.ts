"use server";
import { connectToDB } from "@/lib/db";
import Product from "@/models/productModel";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function getAllProducts() {
  try {
    await connectToDB();
    const products = await Product.find();
    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot get products");
  }
}

export async function getProductByTitle(title: string) {
  try {
    await connectToDB();
    const product = await Product.findOne({ title });
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot get products");
  }
}

export async function getNewProducts() {
  try {
    await connectToDB();
    const product = await Product.find({ new: true }).limit(5);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot get products");
  }
}

export async function getDiscountedProducts() {
  try {
    await connectToDB();
    const product = await Product.find({ discount: { $gt: 0 } }).limit(5);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot get products");
  }
}

export async function getAllPrices({
  search,
  category,
  brand,
  series,
}: {
  search?: string;
  category?: string;
  brand?: string;
  series?: string;
}) {
  try {
    await connectToDB();

    // @ts-expect-error ignore
    const pipeline: [] = [
      {
        $match: {
          ...(search ? { title: { $regex: new RegExp(search, "i") } } : {}),

          ...(category
            ? { category: { $regex: new RegExp(category, "i") } }
            : {}),

          ...(brand
            ? { "specification.brand": { $regex: new RegExp(brand, "i") } }
            : {}),

          ...(series ? { series: { $regex: new RegExp(series, "i") } } : {}),
        },
      },
      {
        $addFields: {
          originalPrice: {
            $subtract: [
              "$price",
              { $multiply: ["$price", { $divide: ["$discount", 100] }] },
            ],
          },
        },
      },
    ];

    const products = await Product.aggregate(pipeline);
    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot get products");
  }
}

export async function getProductsByCategory(category: string) {
  try {
    await connectToDB();
    const products = await Product.find({ category });

    if (!products || products.length === 0) {
      return {
        error: "No product found!",
      };
    }
    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot get products");
  }
}

export async function getFilteredProducts({
  search,
  category,
  brand,
  series,
  min,
  max,
  page,
}: {
  search?: string;
  category?: string;
  brand?: string;
  series?: string;
  min?: string;
  max?: string;
  page?: string;
}) {
  try {
    await connectToDB();

    // await new Promise((res) => setTimeout(res, 5000));

    // @ts-expect-error ignore
    const pipeline: [] = [
      {
        $match: {
          ...(search ? { title: { $regex: new RegExp(search, "i") } } : {}),

          ...(category ? { category: category } : {}),

          ...(brand ? { "specification.brand": brand } : {}),

          ...(series ? { series: { $regex: new RegExp(series, "i") } } : {}),
        },
      },
      {
        $addFields: {
          originalPrice: {
            $subtract: [
              "$price",
              { $multiply: ["$price", { $divide: ["$discount", 100] }] },
            ],
          },
        },
      },
      {
        $match: {
          ...(min !== undefined && max !== undefined
            ? { originalPrice: { $gte: Number(min), $lte: Number(max) } }
            : min !== undefined
            ? { originalPrice: { $gte: Number(min) } }
            : max !== undefined
            ? { originalPrice: { $lte: Number(max) } }
            : {}),
        },
      },
    ];

    const totalproducts = await Product.aggregate(pipeline).count(
      "totalQuantity"
    );
    const total = totalproducts[0]?.totalQuantity;
    const limit = 8;
    const skip = (page ? Number(page) - 1 : 0) * limit;

    const products = await Product.aggregate(pipeline).skip(skip).limit(limit);

    if (!products || products.length === 0) {
      return {
        error: "No product found!",
      };
    }

    return { products, total };
  } catch (err) {
    console.log(err);
    throw new Error("Cannot get products");
  }
}

// @ts-expect-error tpye
export async function createProduct(values) {
  try {
    await connectToDB();

    console.log(values);
    const isTitleExsists = await Product.findOne({ title: values.title });
    if (isTitleExsists) {
      return { error: "Title alredy exists" };
    }

    await Product.create(values);
    revalidatePath("/");
  } catch (err) {
    console.log(err);
    throw new Error("Cannot Create products");
  }
}

// @ts-expect-error tpye
export async function updateProduct(id, values) {
  try {
    await connectToDB();

    console.log(values);
    const isTitleExsists = await Product.findOne({ title: values.title });
    if (isTitleExsists && isTitleExsists?.title !== values?.title) {
      return { error: "Title alredy exists" };
    }

    await Product.findByIdAndUpdate(id, values, { new: true });
    revalidatePath("/");
  } catch (err) {
    console.log(err);
    throw new Error("Cannot update products");
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectToDB();

    await Product.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (err) {
    console.log(err);
    throw new Error("Cannot delete products");
  }
}

export async function getRandomProducts(id: mongoose.Types.ObjectId) {
  await connectToDB(); // Ensures the database is connected
  // Fetch 10 random products using the aggregation pipeline with $sample
  const randomProducts = await Product.aggregate([
    { $match: { _id: { $ne: id } } }, // Exclude the product with `excludeId`
    { $sample: { size: 8 } }, // Randomly sample 8 products
  ]);

  return randomProducts;
}
