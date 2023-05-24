import {NextApiRequest, NextApiResponse} from "next";
import {updateImage} from "@/hook/api/image";
import {hash} from "bcrypt";

interface ExtendedNextApiRequest extends NextApiRequest {
  // query: {
  //   email?: string
  // };
  body: {
    username: string,
    password: string,
    first_name: string,
    last_name: string
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404).send("Not found!")
  console.log(req.query)
  const {username, password, first_name, last_name} = req.body

  if (!username) return res.status(404).send("No username provided!");
  if (!password) return res.status(404).send("No password provided!");
  if (!first_name) return res.status(404).send("No firstname provided!");
  if (!last_name) return res.status(404).send("No lastname provided!");

  await prisma?.admin_User.create({
    data: {
      first_name,
      last_name,
      usernames: username,
      password: await hash(password, 10),
      create_at: new Date().toISOString(),
    }
  })

  res.status(200).json({status: "done"});
}

