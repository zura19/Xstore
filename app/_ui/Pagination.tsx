"use client";
import { setActivePage } from "@/store/pageSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

export default function Pagination({ allProducts }: { allProducts: number }) {
  // const activePage = useAppSelector((state) => state.page.activePage);
  // const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // const [activePage, setActivePage] = useState(1);
  const [activePage, setActivePage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  const totalproducts = allProducts;
  const resultsPerPage = 8;
  const totalPages = Math.ceil(totalproducts / resultsPerPage);
  const scrollToTop = () => {
    const container = document.getElementById("scrollable-content");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(activePage));
    router.push(`${pathname}?${params}`);
    scrollToTop();
    if (searchParams.get("min") || searchParams.get("max")) {
      setActivePage(1);
    }
  }, [activePage, router, pathname, searchParams]);

  if (totalPages === 1) {
    return null;
  }

  if (totalPages <= 4) {
    return (
      <motion.div className="join flex justify-center my-12">
        <button
          disabled={activePage === 1}
          // onClick={() => {
          //   dispatch(setActivePage(activePage - 1));
          // }}
          onClick={() => {
            setActivePage(activePage - 1);
          }}
          className={`join-item btn    rounded-md btn-primary`}
        >
          <IoIosArrowBack size={24} />
        </button>

        <button
          // onClick={() => dispatch(setActivePage(1))}
          onClick={() => {
            setActivePage(1);
          }}
          className={`join-item btn ${
            activePage === 1 && "btn-active"
          } rounded-md btn-primary`}
        >
          {1}
        </button>

        <button
          // onClick={() => dispatch(setActivePage(2))}
          onClick={() => {
            setActivePage(2);
          }}
          className={`join-item btn ${
            activePage === 2 && "btn-active"
          } rounded-md btn-primary`}
        >
          2
        </button>

        {totalPages >= 3 && (
          <button
            // onClick={() => dispatch(setActivePage(3))}
            onClick={() => {
              setActivePage(3);
            }}
            className={`join-item btn ${
              activePage === 3 && "btn-active"
            } rounded-md btn-primary`}
          >
            3
          </button>
        )}

        {totalPages === 4 && (
          <button
            // onClick={() => dispatch(setActivePage(totalPages))}
            onClick={() => {
              setActivePage(totalPages);
            }}
            className={`join-item btn ${
              activePage === totalPages && "btn-active"
            } rounded-md btn-primary`}
          >
            {totalPages}
          </button>
        )}
        <button
          disabled={activePage === totalPages}
          // onClick={() => dispatch(setActivePage(activePage + 1))}
          onClick={() => {
            setActivePage(activePage + 1);
          }}
          className={`join-item btn ${
            activePage === totalPages && "btn-active"
          } rounded-md btn-primary`}
        >
          <IoIosArrowForward size={24} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="join flex justify-center mt-6">
      <button
        disabled={activePage === 1}
        // onClick={() => dispatch(setActivePage(activePage - 1))}
        onClick={() => {
          setActivePage(activePage - 1);
        }}
        className={`join-item btn    rounded-md btn-primary`}
      >
        <IoIosArrowBack size={24} />
      </button>
      <button
        // onClick={() => dispatch(setActivePage(1))}
        onClick={() => {
          setActivePage(1);
        }}
        className={`join-item btn rounded-md ${
          activePage === 1 && "btn-active"
        }  btn-primary`}
      >
        1
      </button>
      {totalPages <= 5 || activePage < 4 ? null : (
        <button className={`join-item btn rounded-md btn-primary`} disabled>
          ...
        </button>
      )}
      <button
        // onClick={() =>
        //   dispatch(
        //     setActivePage(
        //       activePage === 1 || activePage === 2 || activePage === 3
        //         ? 2
        //         : activePage === totalPages - 1
        //         ? activePage - 2
        //         : activePage === totalPages
        //         ? activePage - 3
        //         : activePage - 1
        //     )
        //   )
        // }
        onClick={() =>
          setActivePage(
            activePage === 1 || activePage === 2 || activePage === 3
              ? 2
              : activePage === totalPages - 1
              ? activePage - 2
              : activePage === totalPages
              ? activePage - 3
              : activePage - 1
          )
        }
        className={`join-item btn rounded-md btn-primary  ${
          activePage === 2 && "btn-active"
        }`}
      >
        {activePage === 1 || activePage === 2 || activePage === 3
          ? 2
          : activePage === totalPages - 1
          ? activePage - 2
          : activePage === totalPages
          ? activePage - 3
          : activePage - 1}
      </button>
      <button
        // onClick={() =>
        //   dispatch(
        //     setActivePage(
        //       activePage === 1 || activePage === 2 || activePage === 3
        //         ? 3
        //         : activePage === totalPages - 1
        //         ? activePage - 1
        //         : activePage === totalPages
        //         ? activePage - 2
        //         : activePage - 1
        //     )
        //   )
        // }

        onClick={() =>
          setActivePage(
            activePage === 1 || activePage === 2 || activePage === 3
              ? 3
              : activePage === totalPages - 1
              ? activePage - 1
              : activePage === totalPages
              ? activePage - 2
              : activePage - 1
          )
        }
        className={`join-item btn rounded-md ${
          activePage >= 3 &&
          activePage !== totalPages - 1 &&
          activePage !== totalPages &&
          "btn-active"
        } btn-primary`}
      >
        {activePage === 1 || activePage === 2 || activePage === 3
          ? 3
          : activePage === totalPages - 1
          ? activePage - 1
          : activePage === totalPages
          ? activePage - 2
          : activePage}
      </button>
      <button
        // onClick={() =>
        //   dispatch(
        //     setActivePage(
        //       activePage === 1 || activePage === 2 || activePage === 3
        //         ? 4
        //         : activePage === totalPages - 1
        //         ? activePage
        //         : activePage === totalPages
        //         ? activePage - 1
        //         : activePage + 1
        //     )
        //   )
        // }

        onClick={() =>
          setActivePage(
            activePage === 1 || activePage === 2 || activePage === 3
              ? 4
              : activePage === totalPages - 1
              ? activePage
              : activePage === totalPages
              ? activePage - 1
              : activePage + 1
          )
        }
        className={`join-item btn ${
          activePage === totalPages - 1 && "btn-active"
        } 
         rounded-md btn-primary`}
      >
        {activePage === 1 || activePage === 2 || activePage === 3
          ? 4
          : activePage === totalPages - 1
          ? activePage
          : activePage === totalPages
          ? activePage - 1
          : activePage + 1}
      </button>
      {activePage === totalPages - 1 ||
      activePage === totalPages ||
      totalPages === 5 ||
      totalPages <= 4 ? null : (
        <button className={`join-item btn rounded-md btn-primary`} disabled>
          ...
        </button>
      )}
      <button
        // onClick={() => dispatch(setActivePage(totalPages))}
        onClick={() => setActivePage(totalPages)}
        className={`join-item btn ${
          activePage === totalPages && "btn-active"
        } rounded-md btn-primary`}
      >
        {totalPages}
      </button>

      <button
        disabled={activePage === totalPages}
        // onClick={() => dispatch(setActivePage(activePage + 1))}
        onClick={() => setActivePage(activePage + 1)}
        className={`join-item btn ${
          activePage === totalPages && "btn-active"
        } rounded-md btn-primary`}
      >
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
}
