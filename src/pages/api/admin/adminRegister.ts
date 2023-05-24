// import {Data3} from "@/components/auth/register/payment";
// import {Data2} from "@/components/auth/register/address";
import prisma from "@/lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {hash} from "bcrypt";
// import {Data1} from "@/components/auth/register/userprofile";

interface ExtendedNextApiRequest extends NextApiRequest {
	query: {};
	body: {
		usernames: string;
		password: string;
		first_name: string;
		last_name: string;
	};
}

export default async function handler(
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) {
	const {password, usernames, first_name, last_name} = req.body;

	if (
		req.headers.authorization != `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
	) {
		return res.status(401).send("un-authorization");
	}

	const exists = await prisma.admin_User.findUnique({
		where: {
			usernames
		},
	});
	if (exists) {
		res.status(400).send("User already exists");
	} else {
		const user = await prisma.admin_User.create({
			data: {
				usernames,
				password: await hash(password, 10),
				first_name,
				last_name,
				create_at: new Date(),
				last_login: new Date()
			},
		});
		res.status(200).json(user);
	}
}
