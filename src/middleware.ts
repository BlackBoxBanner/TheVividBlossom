import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/protected", "/user"];

export default async function middleware(req: NextRequest) {
	function isProtectedRoute() {
		return protectedRoutes.some((route) => path.startsWith(route));
	}

	// Get the pathname of the request (e.g. /, /protected)
	const path = req.nextUrl.pathname;

	const session = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	});

	if (session) {
		if (path === "/auth/login") {
			return NextResponse.redirect(new URL("/", req.url));
		}
		if (path === "/auth/register") {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	if (!session) {
		if (isProtectedRoute()) {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}
	}

	// if (isProtectedRoute()) {

	return NextResponse.next();
}
