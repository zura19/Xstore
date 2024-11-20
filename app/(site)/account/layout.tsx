import AccountSidebar from "@/app/_ui/account/AccountSidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`grid grid-cols-[1fr_4fr] max-w-[90%] mx-auto py-6`}>
      <AccountSidebar />
      <div className="">{children}</div>
    </div>
  );
}
