export { auth as middleware } from "./auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], // Apply middleware to all pages except API routes and static files
};
