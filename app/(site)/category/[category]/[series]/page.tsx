import React, { Suspense } from "react";
import ProductsSuspanse from "@/app/_ui/ProductsSuspanse";
import FilterSuspanse from "@/app/_ui/FilterSuspanse";
import Breadcrumbs from "@/app/_ui/Breadcrumbs";
import FilterSkeleton from "@/app/_ui/skeletons/FilterSkeleton";
import CardSkeletonList from "@/app/_ui/skeletons/CardSkeletonList";

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

export async function generateMetadata({ params }: PageProps) {
  const query = await params;

  return {
    title: `Xstore - ${
      query?.series &&
      query?.series.replace(
        query?.series[0],
        query?.series[0].toLocaleUpperCase()
      )
    }`,
    description: `Xstore - ${query?.series}`,
  };
}

export default async function page({ searchParams, params }: PageProps) {
  const param = await params;
  const searchparams = await searchParams;

  console.log(param);

  return (
    <div className="max-w-[90%] p-4 mx-auto grid gap-y-4 gap-8 grid-cols-[3fr_10fr]">
      <Breadcrumbs />
      <Suspense fallback={<FilterSkeleton />}>
        <FilterSuspanse searchParam={{ search: searchparams.search }} />
      </Suspense>
      <Suspense fallback={<CardSkeletonList />}>
        <ProductsSuspanse
          searchParams={{
            ...searchparams,
            series: param.series?.replaceAll("-", " "),
          }}
        >
          <p className="text-2xl  font-semibold mb-4">
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
