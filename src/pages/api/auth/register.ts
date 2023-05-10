// import {Data3} from "@/components/auth/register/payment";
// import {Data2} from "@/components/auth/register/address";
import prisma from "@/lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {hash} from "bcrypt";

// import {Data1} from "@/components/auth/register/userprofile";

interface ExtendedNextApiRequest extends NextApiRequest {
    query: {};
    body: {
        // userInfo: Data1;
        // userAddress: Data2;
        // userPayment: Data3;
    };
}

export default async function handler(
    req: ExtendedNextApiRequest,
    res: NextApiResponse
) {
    // const {userInfo, userAddress, userPayment} = req.body;

    // if (
    // 	req.headers.authorization != `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
    // ) {
    // 	return res.status(401).send("un-authorization");
    // }
    //
    // const exists = await prisma.user.findUnique({
    // 	where: {
    // 		email: userInfo.email,
    // 	},
    // });
    // if (exists) {
    // 	res.status(400).send("User already exists");
    // } else {
    // 	const user = await prisma.user.create({
    // 		data: {
    // 			register_on: new Date(),
    // 			last_login: new Date(),
    // 			first_name: userInfo.firstname,
    // 			last_name: userInfo.lastname,
    // 			username: userInfo.username,
    // 			telephone: userInfo.telephone,
    // 			dob: new Date(userInfo.dob),
    // 			gender: userInfo.gender,
    // 			email: userInfo.email,
    // 			password: await hash(userInfo.password, 10),
    // 			Address: {
    // 				create: {
    // 					address_line1: userAddress.address_line1,
    // 					address_line2: userAddress.address_line2,
    // 					zipcode: userAddress.zipcode,
    // 					create_at: new Date(),
    // 					district: userAddress.district,
    // 					province: userAddress.province,
    // 					subDistrict: userAddress.subDistrict,
    // 				},
    // 			},
    // 			User_Payment: {
    // 				create: {
    // 					card_expiry: userPayment.card_expiry,
    // 					card_number: userPayment.card_number,
    // 					card_type: userPayment.card_type,
    // 					create_at: new Date(),
    // 					cvv: userPayment.cvv,
    // 					name_on_card: userPayment.name_on_card,
    // 					provider: userPayment.provider,
    // 				},
    // 			},
    // 		},
    // 	});
    // 	res.status(200).json(user);
    // }
    res.status(200).json("done");

}
