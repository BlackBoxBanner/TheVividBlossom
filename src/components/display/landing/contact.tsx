import styles from "@/styles/components/display/landing/contact.module.scss"
import {Cardo} from "@next/font/google";
import Link from "next/link";
import {ComponentProps} from "react";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin", "greek"]})

interface ContactProps extends ComponentProps<"div"> {
}

export function Contact(props: ContactProps) {
	return (
		<>
			<div className={`${styles.main} ${cardo.className}`}>
				<div className={styles.contactContainer}>
					<div className={styles.heading}>
						<p>
							Contact Us
						</p>
					</div>
					<div className={styles.items}>
						<p>
							E-Mail : <Link
							href={"mailto:mail@thevividblossom.com"}
							style={{color: "unset", textDecoration: "unset"}}
						>mail@thevividblossom.com</Link>
						</p>
						<p>
							Phone Call : <Link
							href={"tel:+669-123-4567"}
							style={{color: "unset", textDecoration: "unset"}}
						>+66 93 123 4567</Link>
						</p>
						<p>
							(MON to FRI 8am-4pm)
						</p>
					</div>
				</div>
			</div>
		</>
	)
}