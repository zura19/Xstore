import AddToCartBtn from "@/app/_ui/AddToCartBtn";
import DeleteOrUpdate from "@/app/_ui/DeleteOrUpdate";
import Colors from "@/app/_ui/product/Colors";
import ImageSwiper from "@/app/_ui/product/ImageSwiper";
import InterestedProducts from "@/app/_ui/product/InterestedProducts";
import { getProductByTitle } from "@/app/actions/productActions";
import { auth } from "@/auth";
import formatCurrency from "@/lib/formatCurrency";
import { Iproduct } from "@/models/productModel";
import mongoose from "mongoose";
import { HiX } from "react-icons/hi";
import { HiCheck } from "react-icons/hi2";

interface ProductPageProps {
  params: Promise<{ title: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { title } = await params;

  return {
    title: `Xstore - ${title.replaceAll("-", " ")}`,
    description: `Xstore - ${title.replaceAll("-", " ")}`,
  };
}

export default async function Page({ params }: ProductPageProps) {
  const { title } = await params;
  const product: Iproduct = await getProductByTitle(title.replaceAll("-", " "));
  const session = await auth();

  return (
    <div className="">
      <div className=" bg-white ">
        <div className="max-w-[90%] mx-auto grid  gap-x-10 grid-cols-[1fr_10fr] p-4">
          <ImageSwiper
            title={product.title}
            price={product.price}
            mainImage={product.mainImage}
            images={product.images || []}
            stock={product.stock}
            isNew={product.new}
            discount={product.discount}
            category={product.category}
            id={String(product._id)}
          />
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {product.discount > 0 && (
                <p className=" bg-brand text-sm px-4 rounded-full  text-white py-1">
                  -{product.discount}%
                </p>
              )}
              {product.new && (
                <p
                  className={`bg-green-600 rounded-full px-4 text-white text-sm py-1`}
                >
                  New
                </p>
              )}
            </div>
            <div className="flex  items-start justify-between py-2">
              <h1 className="text-3xl font-semibold leading-6  mb-6">
                {product.title}
              </h1>
              {session?.user?.role === "admin" ? (
                <DeleteOrUpdate
                  product={{
                    id: String(product._id),
                    title: product.title,
                    price: product.price,
                    mainImage: product.mainImage,
                    images: product.images || [],
                    stock: product.stock,
                    isNew: product.new,
                    discount: product.discount,
                    category: product.category,
                    specifications: { ...product.specification },
                    series: product.series,
                  }}
                />
              ) : null}
            </div>
            {!product.discount ? (
              <p className="text-brand text-4xl mb-4 font-medium leading-4">
                {formatCurrency(product.price)}
              </p>
            ) : (
              <p className="text-brand text-4xl mb-4 font-medium leading-4">
                <span className="line-through text-2xl text-gray-500">
                  {formatCurrency(product.price)}
                </span>{" "}
                <span className=" font-semibold">
                  {formatCurrency(
                    product.price - (product.price * product.discount) / 100
                  )}{" "}
                </span>
              </p>
            )}
            <Colors colors={product.specification.colors as string} />
            <div className="flex font-semibold gap-1 items-center">
              {product.stock > 0 ? (
                <>
                  <HiCheck
                    size={18}
                    strokeWidth={1.4}
                    color="#1c61e7"
                    className="font-bold"
                  />
                  <p>In stock:</p>
                  <p>{product.stock}</p>
                </>
              ) : (
                <>
                  <span>
                    <HiX
                      size={18}
                      strokeWidth={1.4}
                      color="#ef4444"
                      className="font-bold text-re"
                    />
                  </span>
                  <p>Not in stock</p>
                </>
              )}
            </div>
            {product.stock > 0 ? (
              <div className="flex items-center gap-4">
                {/* <Cartboard stock={product.stock} /> */}
                <AddToCartBtn
                  id={String(product._id)}
                  title={product.title}
                  stock={product.stock}
                  price={
                    product.discount || product.discount !== 0
                      ? product.price - (product.price * product.discount) / 100
                      : product.price
                  }
                  image={product.mainImage}
                  quantity={1}
                />
                <button className="btn min-h-9 h-12 rounded-md flex-1 bg-green-600 hover:bg-green-700 transition-all duration-300 border-none text-white">
                  Buy now
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={`max-w-[80%] p-4 mx-auto`}>
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-3xl font-semibold mb-6">Specifications</h2>
          <div className="flex flex-col  gap-y-4">
            {Object.entries(product.specification).map(([key, value]) => (
              <p
                className="text-lg leading-4 border-b border-gray-200 px-2 py-3 "
                key={key}
              >
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {value}
              </p>
            ))}
          </div>
        </div>
      </div>
      <InterestedProducts id={product._id as mongoose.Types.ObjectId} />
    </div>
  );
}
