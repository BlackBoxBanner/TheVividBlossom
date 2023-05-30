import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getToken} from "next-auth/jwt";

const protectedRoutes = ["/user"];
const userAuth = ["/auth"]
const adminRoutes = ["/admin/dashboard"];
const adminAuth = ["/admin/auth"]

interface isProtectedProps {
  path: string,
  routes: string[]
}

function isProtected(props: isProtectedProps) {
  return props.routes.some((route) => props.path.startsWith(route));
}

export async function middleware(req: NextRequest, res: NextResponse) {
  // const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
  //
  // const path = req.nextUrl.pathname;
  //
  // if (session) {
  //   if (path.startsWith("/auth")) return NextResponse.redirect(new URL("/", req.url));
  //   if (path.startsWith("/admin/auth")) return NextResponse.redirect(new URL("/", req.url));
  // } else {
  //   if (path.startsWith("/user")) return NextResponse.redirect(new URL("/auth/login", req.url));
  //   if (path.startsWith("/admin/dashboard")) return NextResponse.redirect(new URL("/", req.url));
  // }
  // if (session?.email) {
  //   if (path.startsWith("/admin/dashboard")) return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}


export const config = {
  matcher: ["/auth/:path*", "/user/:path*", "/admin/:path*"],
};