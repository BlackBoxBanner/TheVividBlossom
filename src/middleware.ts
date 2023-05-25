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
  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  const path = req.nextUrl.pathname;

  // if user is login return to main page.
  if (isProtected({path, routes: userAuth})) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // if admin is login return to main page.
  if (isProtected({path, routes: adminAuth})) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // if user is not login and trying to access protectedRoutes return to login page
  if (isProtected({path, routes: protectedRoutes})) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // anyone trying to access adminRoutes without auth and has email return to main page
  if (isProtected({path, routes: adminRoutes})) {
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (session.email) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}


export const config = {
  matcher: ["/auth/:path*", "/user/:path*", "/admin/:path*"],
};