import styles from "@/styles/components/display/landing/overlaymenu.module.scss"
import {ComponentProps} from "react";
import {AiOutlineClose} from "react-icons/ai";

interface OverMenuProps extends ComponentProps<"div"> {
	onClose: () => void
}

export default function OverMenu(props: OverMenuProps) {
	return (
		<>
			<div
				className={styles.container}
				style={props.style}
			>
				<div className={styles.btn}>
					<button
						onClick={props.onClose}
						className={styles.closeButton}
					>
						<svg
							width="58"
							height="59"
							viewBox="0 0 58 59"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className={styles.closeIcon}
						>
							<path
								d="M0.646484 57.215L57.215 0.646484M57.2151 57.9221L0.646546 1.35359"
								stroke="#FDFCF5"
							/>
						</svg>
					</button>
				</div>
				<div
					className={props.className}
					style={{width: "100%", height: "100%"}}
				>
					{props.children}
				</div>
			</div>
		</>
	)
}