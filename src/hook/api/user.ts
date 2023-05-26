import prisma from "@/lib/prisma";
import axios from "axios";

export async function getId(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });
}

export interface userUpdateProps {
  id: string,
  dob: string,
  email: string,
  first_name: string,
  last_name: string,
  telephone: string,
}

export function userUpdateHandler(props: userUpdateProps) {
  return axios({
    url: "/api/user/updateinfo",
    method: "PATCH",
    headers: {
      Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    data: {
      id: props.id,
      dob: props.dob,
      email: props.email,
      first_name: props.first_name,
      last_name: props.last_name,
      telephone: props.telephone,
    }
  })
}

export async function userUpdateApi(props: userUpdateProps) {
  console.log(props)
  return prisma.user.update({
    where: {
      id: props.id,
    },
    data: {
      first_name: props.first_name,
      last_name: props.last_name,
      telephone: props.telephone,
      dob: new Date(String(props.dob).split(" / ").reverse().join("-")).toISOString(),
    }
  })
}