import Footer from "../_ui/Footer";
import Navbar from "../_ui/navbar/Navbar";
import ScrollableContentWrapper from "../_ui/ScrollBtn";
import Sidebar from "../_ui/sidebar/Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`grid grid-cols-[auto_1fr] text-gray-800 w-dvw h-dvh ${inter.className}`}
    >
      {/* <div> */}
      <Sidebar />
      <ScrollableContentWrapper>
        <main id="scrollable-homepage" className="min-h-dvh ">
          <Navbar />

          {children}
        </main>
        <Footer />
      </ScrollableContentWrapper>

      {/* </div> */}
    </div>
  );
}