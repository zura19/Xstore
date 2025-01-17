import React, { Suspense } from "react";
import ProductsSuspanse from "@/app/_ui/ProductsSuspanse";
import FilterSuspanse from "@/app/_ui/FilterSuspanse";
import Breadcrumbs from "@/app/_ui/Breadcrumbs";
import CardSkeletonList from "@/app/_ui/skeletons/CardSkeletonList";
import FilterSkeleton from "@/app/_ui/skeletons/FilterSkeleton";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    min?: string;
    max?: string;
    page?: string;
  }>;
  params: Promise<{
    category?: string;
    brand?: string;
    series?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    category: string;
  }>;
}) {
  const query = await params;

  return {
    title: `Xstore - ${
      query?.category &&
      query?.category.replace(
        query?.category[0],
        query?.category[0].toLocaleUpperCase()
      )
    }`,
    description: `Xstore - ${query?.category}`,
  };
}

export default async function page({ searchParams, params }: PageProps) {
  const param = await params;
  const searchparams = await searchParams;

  return (
    <div className="md:max-w-[90%] p-4 mx-auto  grid gap-y-4 gap-8 grid-cols-1 sm:grid-cols-[3fr_10fr]">
      <Breadcrumbs />
      <Suspense fallback={<FilterSkeleton />}>
        <FilterSuspanse searchParam={{ search: searchparams.search }} />
      </Suspense>
      <Suspense key={searchparams.page} fallback={<CardSkeletonList />}>
        <ProductsSuspanse
          searchParams={{
            ...searchparams,
            ...param,
            category:
              param?.category === "apple" ||
              param?.category === "google" ||
              param?.category === "hp"
                ? ""
                : param.category,
            brand:
              param.category === "apple" ||
              param.category === "google" ||
              param.category === "hp"
                ? param.category
                : "",
          }}
        >
          <p className="sm:text-2xl text-xl mb-1  font-semibold sm:mb-4">
            Category:{" "}
            {`${
              param.category &&
              param.category.replace(
                param.category[0],
                param.category[0].toLocaleUpperCase()
              )
            }`}
          </p>
        </ProductsSuspanse>
      </Suspense>
    </div>
  );
}
