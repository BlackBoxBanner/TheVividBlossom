import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";
import {withAuth} from "next-auth/middleware"
import {delay} from "@/hook/delay";

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

export default withAuth(
  async function middleware(req, res) {
    const path = req.nextUrl.pathname;

    // if user is login return to main page.
    if (isProtected({path, routes: userAuth})) {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // if admin is login return to main page.
    if (isProtected({path, routes: adminAuth})) {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // if user is not login and trying to access protectedRoutes return to login page
    if (isProtected({path, routes: protectedRoutes})) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    // anyone trying to access adminRoutes without auth and has email return to main page
    if (isProtected({path, routes: adminRoutes})) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (req.nextauth.token.email) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    await delay(1000)
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({req, token}) {
        return true
      },
    },
  }
)


export const config = {
  matcher: ["/auth/:path*", "/user/:path*", "/admin/:path*"],
};