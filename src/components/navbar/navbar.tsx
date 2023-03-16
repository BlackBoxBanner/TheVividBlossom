import { Button } from "antd";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import style from "@/styles/components/nevbar/navbar.module.css";
import Hamburder, { HamburderBtn } from "./hamburger";

export default function NavBar() {
	const router = useRouter();
	const { data: session } = useSession();

	const hasSession = [
		{ label: "Dashboard", onClick: () => alert("dashboard") },
		{ label: "Logout", onClick: () => signOut() },
	] satisfies HamburderBtn;

	const hasNoSession = [
		{ label: "Login", onClick: () => router.push("/auth/login") },
		{ label: "Register", onClick: () => router.push("/auth/register") },
	] satisfies HamburderBtn;

	return (
		<>
			<nav className={style.nav}>
				<div className="">
					<h2>Flower Shop</h2>
				</div>
				<Hamburder
					session={session}
					hasSession={hasSession}
					hasNoSession={hasNoSession}
				/>
			</nav>
		</>
	);
}
