import { authMiddleware } from "@clerk/nextjs";
 
// the routes that do not require login
export default authMiddleware({
  publicRoutes: ["/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
