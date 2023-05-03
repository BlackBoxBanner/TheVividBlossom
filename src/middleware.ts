import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

const protectedRoutes = ["/protected", "/user"];
const adminRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
	function isProtectedRoute() {
		return protectedRoutes.some((route) => path.startsWith(route));
	}


	function isAdminRoute() {
		return adminRoutes.some((route) => path.startsWith(route));
	}

	// Get the pathname of the request (e.g. /, /protected)
	const path = req.nextUrl.pathname;

	const session = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	});

	if (session) {
		// user login
		if (path === "/auth/login") {
			return NextResponse.redirect(new URL("/", req.url));
		}
		if (path === "/auth/register") {
			return NextResponse.redirect(new URL("/", req.url));
		}

		// admin login
		if (path === "/auth/admin/login") {
			return NextResponse.redirect(new URL("/", req.url));
		}
		if (path === "/auth/admin/register") {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	if (!session) {
		if (isProtectedRoute()) {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}
	}

	// console.log(session)


	if (isAdminRoute()) {
		if (session?.email) return NextResponse.redirect(new URL("/", req.url));
		if (session?.sub) {
			// this session only admin can access
			const admin = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/id`, {
				method: "POST", body: JSON.stringify({id: session.sub})
			})
			const data = await admin.json() as string
			if (session.sub != data) return NextResponse.redirect(new URL("/", req.url));
		}
	}

	// if (isProtectedRoute()) {

	return NextResponse.next();
}
