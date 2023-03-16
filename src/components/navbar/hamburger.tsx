import { Button } from "antd";
import { Session } from "next-auth";
import style from "@/styles/components/nevbar/hamburger.module.css";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

export type HamburderBtn = {
	label: string;
	onClick: () => void;
}[];

interface HamburderProps {
	session: Session | null;
	hasSession: HamburderBtn;
	hasNoSession: HamburderBtn;
}

const ShowBtn = ({ btn }: { btn: HamburderBtn }) => {
	return (
		<>
			{btn.map((btn, key) => (
				<Button
					key={key}
					onClick={btn.onClick}
					style={{
						width: "100%",
					}}
				>
					{btn.label}
				</Button>
			))}
		</>
	);
};

export default function Hamburder(props: HamburderProps) {
	const [show, setShow] = useState(true);
	const toggle = () => setShow(!show);
	return (
		<>
			{/* on mobile */}
			<div className={style.onMobile}>
				{show && <AiOutlineMenu onClick={toggle} size={"1.25rem"} />}
			</div>
			{/* on desktop */}
			<div className={style.onDesktop}>
				{props.session ? (
					<ShowBtn btn={props.hasSession} />
				) : (
					<ShowBtn btn={props.hasNoSession} />
				)}
			</div>
			{/* on mobile menu */}
			{!show && (
				<div className={style.menu}>
					<div className={style.menuContent}>
						{props.session ? (
							<ShowBtn btn={props.hasSession} />
						) : (
							<ShowBtn btn={props.hasNoSession} />
						)}
					</div>
					<div>
						<AiOutlineClose onClick={toggle} size={"2rem"} fill="white" />
					</div>
				</div>
			)}
		</>
	);
}
