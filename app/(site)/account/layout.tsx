import AccountSidebar from "@/app/_ui/account/AccountSidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`grid lg:grid-cols-[1fr_4fr] grid-cols-[1fr_2fr] sm:max-w-[90%] mx-auto py-6`}
    >
      <AccountSidebar />
      <div className="">{children}</div>
    </div>
  );
}
