import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/store/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"], // You can add 'latin-ext' or other subsets if needed
  weight: ["400", "500", "700"], // Optional: Choose specific weights
  variable: "--font-inter", // Optional: Allows using a CSS variable for the font
});

export const metadata: Metadata = {
  title: "Xstore",
  description: "Buy high quality tecnique here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-theme="mycustomtheme"
        className={`${inter.className}   min-h-dvh text-gray-800 antialiased`}
      >
        <ReduxProvider>
          <SessionProvider>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{
                margin: "8px",
                zIndex: 11223,
              }}
              toastOptions={{
                success: {
                  duration: 3000,
                },

                error: {
                  duration: 5000,
                },

                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "var(color-grey-0)",
                  color: "#374151",
                },
              }}
            />
            {children}
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
