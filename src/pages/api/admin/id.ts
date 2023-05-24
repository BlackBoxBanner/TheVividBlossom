// import {Data3} from "@/components/auth/register/payment";
// import {Data2} from "@/components/auth/register/address";
import prisma from "@/lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
// import {hash} from "bcrypt";
// import {Data1} from "@/components/auth/register/userprofile";

interface ExtendedNextApiRequest extends NextApiRequest {
	// query: {};
	// body: {
	// 	id: string
	// };
}

export default async function handler(
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) {
	const {id} = JSON.parse(req.body)

	// if (
	// 	req.headers.authorization != `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
	// ) {
	// 	return res.status(401).send("un-authorization");
	// }

	const admin = await prisma.admin_User.findUnique({
		where: {
			id
		},
		select: {
			id: true
		}
	})
	res.status(200).json(admin?.id);
}

