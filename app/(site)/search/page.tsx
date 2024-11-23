import React, { Suspense } from "react";
import ProductsSuspanse from "@/app/_ui/ProductsSuspanse";
import FilterSuspanse from "@/app/_ui/FilterSuspanse";
import Breadcrumbs from "@/app/_ui/Breadcrumbs";
import FilterSkeleton from "@/app/_ui/skeletons/FilterSkeleton";
import CardSkeletonList from "@/app/_ui/skeletons/CardSkeletonList";

interface pageProps {
  searchParams: Promise<{
    search?: string;
    min?: string;
    max?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: pageProps) {
  const query = await searchParams;

  return {
    title: `Xstore - ${query.search}`,
    description: `Xstore - ${query.search}`,
  };
}

export default async function page({ searchParams }: pageProps) {
  const params = await searchParams;

  return (
    <div className="md:max-w-[90%] p-4 mx-auto grid gap-y-4 gap-8 sm:grid-cols-[3fr_10fr]">
      <Breadcrumbs />
      <Suspense fallback={<FilterSkeleton />}>
        <FilterSuspanse searchParam={{ search: params.search }} />
      </Suspense>
      <Suspense
        // key={params.page === "1" ? null : params.page}
        fallback={<CardSkeletonList />}
      >
        <ProductsSuspanse searchParams={params}>
          <p className="sm:text-2xl text-xl mb-1  font-semibold sm:mb-4">
            Results on:{" "}
            {`"${
              params.search &&
              params.search.replace(
                params.search[0],
                params.search[0].toLocaleUpperCase()
              )
            }"`}
          </p>
        </ProductsSuspanse>
      </Suspense>
    </div>
  );
}
