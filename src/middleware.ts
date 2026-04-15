export { proxy as middleware } from "./proxy-impl";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
