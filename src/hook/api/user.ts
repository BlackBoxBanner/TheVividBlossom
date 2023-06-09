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

export async function userGetPayment(props: { id: string }) {
  return prisma.user.findUnique({
    where: {
      id: props.id
    },
    select: {
      User_Payment: {
        select: {
          id: true,
          name_on_card: true,
          card_number: true,
          card_expiry: true,
          provider: true
        }
      },
      DefaultPayment: {
        select: {
          paymentId: true
        }
      }
    }
  })
}

export async function userGetAddress(props: { id: string }) {
  return prisma.user.findUnique({
    where: {
      id: props.id
    },
    select: {
      telephone: true,
      first_name: true,
      last_name: true,
      Address: {
        select: {
          id: true,
          address_line1: true,
          address_line2: true,
          subDistrict: true,
          district: true,
          province: true,
          zipcode: true,
        }
      },
      DefaultAddress: {
        select: {
          addressId: true
        }
      }
    }
  })
}