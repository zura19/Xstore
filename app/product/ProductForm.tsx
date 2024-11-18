import React, { useState } from "react";
import CreateProductInput from "./CreateProductInput";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/zod";
import { z } from "zod";
import { createProduct, updateProduct } from "../actions/productActions";
import toast from "react-hot-toast";

const categoriesArr = ["phone", "laptop", "pc", "headphones"];
const seriesArr = [
  "iphone 13",
  "iphone 14",
  "iphone 15",
  "iphone 16",
  "macbook m1",
  "macbook m2",
  "macbook m3",
  "macbook m4",
];
const brandsArr = ["apple", "samsung", "google", "hp"];
const systemsArr = ["ios", "android", "windows", "macos", "linux"];
const storagesArr = [
  "128 gb",
  "256 gb",
  "512 gb",
  "1 tb",
  "2 tb",
  "4 tb",
  "8 tb",
];

const ramsArr = [
  "4 gb",
  "6 gb",
  "8 gb",
  "12 gb",
  "16 gb",
  "18 gb",
  "24 gb",
  "32 gb",
  "40 gb",
  "48 gb",
  "64 gb",
  "128 gb",
];

export default function ProductForm({
  product,
}: {
  product?: {
    id: string;
    title: string;
    price: number;
    discount: number;
    stock: number;
    isNew: boolean;
    mainImage: string;
    images: [];
    category: string;
    series: string;
    specifications: {
      brand: string;
      colors?: string;
      videoCard?: string;
      system: string;
      storage: string;
      ram: string;
    };
  };
}) {
  console.log(product?.specifications);
  const [error, setError] = useState<string>("");
  const { handleSubmit, formState, control, register, reset } = useForm<
    z.infer<typeof productSchema>
  >({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product ? product?.title : "",
      price: product ? product?.price : 0,
      stock: product ? product?.stock : 0,
      category: product ? product.category : "",
      new: product ? product?.isNew : false,
      series: product ? product.series : "",
      discount: product ? product?.discount : 0,
      mainImage: product ? product?.mainImage : "",
      images: product ? product.images : [],
      // series: product ? product?.series : 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error idk
    name: "images",
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    if (!product) {
      const createproduct = await createProduct(values);
      if (createproduct?.error) {
        toast.error(createproduct.error);
        setError(createproduct.error);
      } else {
        toast.success("Product added successfully");
        reset();
      }
    } else {
      const update = await updateProduct(product.id, values);
      if (update?.error) {
        toast.error(update.error);
        setError(update.error);
      } else {
        toast.success("Product added successfully");
        reset();
      }
    }
  }

  console.log(fields);

  return (
    <form
      method="dialog"
      onSubmit={handleSubmit(onSubmit)}
      className="modal-box  p-4 flex flex-col gap-4 bg-white rounded-md max-w-[40%] overflow-auto h-full"
    >
      <h1 className="text-2xl font-bold text-gray-700 mb-0 leading-4">
        Create Product
      </h1>
      <div className="grid sm:grid-cols-[auto_auto] grid-cols-[qfr] p-2 max-h-full pt-0 overflow-scroll justify-between  gap-y-2 ">
        <CreateProductInput label="Title">
          <input
            {...register("title")}
            type={"text"}
            // defaultValue={}
            placeholder={"Title"}
            className={`create-input ${
              formState.errors.title && "border-red-400 focus:outline-red-400"
            }`}
          />
          {formState.errors.title && (
            <p className="text-sm p-1 pb-0 text-red-500 ">
              {formState.errors.title.message}
            </p>
          )}
        </CreateProductInput>

        <CreateProductInput label="Price">
          <input
            {...register("price", { valueAsNumber: true })}
            type={"text"}
            // defaultValue={0}
            placeholder={"Price"}
            className={`create-input ${
              formState.errors.price && "border-red-400 focus:outline-red-400"
            }`}
          />
          {formState.errors.price && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.price.message}
            </p>
          )}
        </CreateProductInput>

        <CreateProductInput label="Stock">
          <input
            {...register("stock", { valueAsNumber: true })}
            type={"text"}
            defaultValue={0}
            placeholder={"Stock"}
            className={`create-input ${
              formState.errors.stock && "border-red-400 focus:outline-red-400"
            }`}
          />
          {formState.errors.stock && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.stock.message}
            </p>
          )}
        </CreateProductInput>

        <CreateProductInput label="Catrogy">
          <select
            {...register("category")}
            defaultValue={""}
            className={`create-select ${
              formState.errors.category &&
              "border-red-400 focus:outline-red-400"
            }`}
          >
            <option disabled value={""}>
              Select category
            </option>
            {categoriesArr.map((category) => (
              <option key={category} value={category}>
                {category.replace(category[0], category[0].toUpperCase())}
              </option>
            ))}
          </select>
        </CreateProductInput>

        <CreateProductInput label="New">
          <select
            {...register("new")}
            // defaultValue={"false"}
            className="create-select"
          >
            <option value={""} disabled>
              Is new?
            </option>
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </select>
        </CreateProductInput>

        <CreateProductInput label="Discount">
          <input
            {...register("discount", { valueAsNumber: true })}
            type={"text"}
            defaultValue={0}
            placeholder={"0"}
            className="create-input"
          />
          {formState.errors.discount && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.discount.message}
            </p>
          )}
        </CreateProductInput>

        <CreateProductInput label="Series">
          <select
            {...register("series")}
            defaultValue={""}
            className={`create-select ${
              formState.errors.series && "border-red-400 focus:outline-red-400"
            }`}
          >
            <option disabled value={""}>
              Select series
            </option>
            {seriesArr.map((value) => (
              <option key={value} value={value}>
                {value.replace(value[0], value[0].toUpperCase())}
              </option>
            ))}
          </select>
        </CreateProductInput>

        <CreateProductInput label="Main image">
          <input
            {...register("mainImage")}
            type={"text"}
            placeholder={"Image link"}
            // className="create-input"
            className={`create-input ${
              formState.errors.mainImage &&
              "border-red-400 focus:outline-red-400"
            }`}
          />
          {formState.errors.mainImage && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.mainImage.message}
            </p>
          )}
        </CreateProductInput>
        <div className="col-start-1 -col-end-1">
          <h3 className="text-xl col-start-1 -col-end-1 font-bold text-gray-700 mt-2 ">
            Images
          </h3>

          {fields.map((field, index) => (
            <div key={field.id}>
              <CreateProductInput label="image">
                <input
                  type="url"
                  className="create-input"
                  placeholder="Image URL"
                  {...register(`images.${index}`)}
                />
              </CreateProductInput>
              <button
                type="button"
                className="btn btn-xs mt-1 rounded-full text-white font-medium hover:bg-red-600 bg-red-500"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {formState.errors.images && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.images.message}
            </p>
          )}
          <button
            className="btn w-full mt-4 text-white btn-sm font-medium rounded-md btn-primary"
            type="button"
            onClick={() => append("")}
          >
            Add Image
          </button>
        </div>

        <h3 className="text-xl col-start-1 -col-end-1 font-bold text-gray-700 mt-2 ">
          Specifications
        </h3>

        <CreateProductInput label="Brand">
          <select
            {...register("specification.brand")}
            defaultValue={product?.specifications?.brand || ""}
            className={`create-select ${
              formState.errors.specification?.brand &&
              "border-red-400 focus:outline-red-400"
            }`}
          >
            <option disabled value={""}>
              Select brand
            </option>
            {brandsArr.map((value) => (
              <option key={value} value={value}>
                {value.replace(value[0], value[0].toUpperCase())}
              </option>
            ))}
          </select>
          {formState.errors.specification?.brand && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.specification.brand.message}
            </p>
          )}
        </CreateProductInput>

        <CreateProductInput label="Colors">
          <input
            {...register("specification.colors")}
            type={"text"}
            defaultValue={product ? product?.specifications?.colors : ""}
            placeholder={"Colors"}
            className={`create-input ${
              formState.errors.specification?.colors &&
              "border-red-400 focus:outline-red-400"
            }`}
          />
          {formState.errors.specification?.colors && (
            <p className="text-sm p-1 pb-0 text-red-500 ">
              {formState.errors.specification?.colors.message}
            </p>
          )}
        </CreateProductInput>
        <CreateProductInput label="System">
          <select
            {...register("specification.system")}
            defaultValue={product?.specifications?.system || ""}
            className={`create-select ${
              formState.errors.specification?.system &&
              "border-red-400 focus:outline-red-400"
            }`}
          >
            <option value={""} disabled>
              Select System
            </option>
            {systemsArr.map((value) => (
              <option key={value} value={value}>
                {value.replace(value[0], value[0].toUpperCase())}
              </option>
            ))}
          </select>
          {formState.errors.specification?.system && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.specification.system.message}
            </p>
          )}
        </CreateProductInput>
        <CreateProductInput label="Storage">
          <select
            defaultValue={product?.specifications?.storage || ""}
            {...register("specification.storage")}
            className={`create-select ${
              formState.errors.specification?.storage &&
              "border-red-400 focus:outline-red-400"
            }`}
          >
            <option value={""} disabled>
              Select Storage
            </option>
            {storagesArr.map((value) => (
              <option key={value} value={value}>
                {value.replace(value[0], value[0].toUpperCase())}
              </option>
            ))}
          </select>
          {formState.errors.specification?.storage && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.specification.storage.message}
            </p>
          )}
        </CreateProductInput>
        <CreateProductInput label="Ram">
          <select
            defaultValue={product?.specifications?.ram || ""}
            {...register("specification.ram")}
            className={`create-select ${
              formState.errors.specification?.ram &&
              "border-red-400 focus:outline-red-400"
            }`}
          >
            <option value={""} disabled>
              Select Ram
            </option>
            {ramsArr.map((value) => (
              <option key={value} value={value}>
                {value.replace(value[0], value[0].toUpperCase())}
              </option>
            ))}
          </select>
          {formState.errors.specification?.ram && (
            <p className="text-sm p-1 pb-0 text-red-500">
              {formState.errors.specification.ram.message}
            </p>
          )}
        </CreateProductInput>
        <CreateProductInput label="Video card">
          <input
            {...register("specification.videoCard")}
            defaultValue={product ? product?.specifications?.videoCard : ""}
            type={"text"}
            placeholder={"Video card"}
            className="create-input"
          />
        </CreateProductInput>
        {error && (
          <p className="bg-red-100 col-start-1 -col-end-1 p-2 rounded-md font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
      {formState.isSubmitting ? (
        <button
          disabled={true}
          type="submit"
          className="btn w-full mt-auto border-none shadow-lg disabled:bg-brand text-white hover:bg-blue-800   bg-brand"
        >
          <span className="loading loading-spinner text-white loading-sm"></span>
        </button>
      ) : (
        <button
          type="submit"
          className="btn w-full mt-auto border-none shadow-lg text-white hover:bg-blue-800   bg-brand"
        >
          {product ? "Update" : "Create"}
        </button>
      )}
    </form>
  );
}
