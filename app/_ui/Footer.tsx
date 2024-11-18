import React from "react";
import Logo from "./navbar/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className=" col-start-1 z-0 -col-end-1 bg-white">
      <footer className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 max-w-[90%] items-start   mx-auto justify-between   text-base-content p-10">
        <nav className="grid gap-2 mr-auto">
          <h6 className="footer-title">Categories</h6>
          <Link
            href={"/category/phone"}
            className="link   link-hover hover:text-primary transition-all duration-300"
          >
            Phones
          </Link>
          <Link
            href={"/category/laptop"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Laptops
          </Link>
          <Link
            href={"/category/headphone"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Headphones
          </Link>
        </nav>

        <nav className="grid gap-2 mr-auto ">
          <h6 className="footer-title">Categories</h6>
          <Link
            href={"/category/phone"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Phones
          </Link>
          <Link
            href={"/category/laptop"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Laptops
          </Link>
          <Link
            href={"/category/headphone"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Headphones
          </Link>
          {/* <Link href={"/category/phone"} className="link link-hover">
            Phones
          </Link> */}
        </nav>

        <nav className="grid gap-2 mr-auto">
          <h6 className="footer-title">Brands</h6>
          <Link
            href={"/category/apple"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Apple
          </Link>
          <Link
            href={"/category/google"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Google
          </Link>
          <Link
            href={"/category/hp"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Hp
          </Link>

          <Link
            href={"/category/samsung"}
            className="link link-hover hover:text-primary transition-all duration-300"
          >
            Samsung
          </Link>
          {/* <Link href={"/category/phone"} className="link link-hover">
            Phones
          </Link> */}
        </nav>

        <nav className="grid gap-2">
          <Logo size={"small"} />
          <h6 className="footer-title mt-2 p-0 m-0">Social</h6>
          <div className="grid grid-flow-col gap-0">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}
