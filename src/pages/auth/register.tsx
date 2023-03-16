import { useState } from "react";
import axios from "axios";
import { Data1, UserProfile } from "@/components/auth/register/userprofile";
import { Data2, Address } from "@/components/auth/register/address";
import { Button, Space, Steps } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import prisma from "@/lib/prisma";
import { Data3, UserPayment } from "@/components/auth/register/payment";
import { CheckData } from "@/components/auth/register/check";
import { useRouter } from "next/router";

const steps = [
	{
		title: "Personal",
		content: "Personal Information",
	},
	{
		title: "Address",
		content: "Address information",
	},
	{
		title: "Payment",
		content: "Payment information",
	},
	{
		title: "Check",
		content: "Check that all content is correct",
	},
	{
		title: "Conplete",
		content: "Conplete",
	},
];

function PageDisplay({
	pages,
	page,
	children,
}: {
	pages: number;
	page: number;
	children: JSX.Element;
}) {
	return (
		<div
			style={{
				display: pages == page ? "block" : "none",
				padding: "1rem",
			}}
		>
			{children}
		</div>
	);
}

function RegisterPage({
	username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [data1, setData1] = useState<Data1>();
	const [data2, setData2] = useState<Data2>();
	const [data3, setData3] = useState<Data3>();

	const [pages, setPages] = useState(0);
	const [registerError, setRegisterError] = useState(false);

	async function onRegister() {
		const data = await axios({
			method: "POST",
			url: "/api/auth/register",
			headers: {
				Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
			},
			data: {
				userAddress: {
					address_line1: data2?.address_line1,
					address_line2: data2?.address_line2,
					district: data2?.district,
					province: data2?.province,
					subDistrict: data2?.subDistrict,
					zipcode: data2?.zipcode,
				},
				userInfo: {
					email: data1?.email,
					dob: data1?.dob,
					firstname: data1?.firstname,
					lastname: data1?.lastname,
					password: data1?.password,
					repetePassword: data1?.repetePassword,
					gender: data1?.gender,
					telephone: data1?.telephone,
					username: data1?.username,
				},
				userPayment: {
					card_expiry: data3?.card_expiry,
					card_number: data3?.card_number,
					card_type: data3?.card_type,
					name_on_card: data3?.name_on_card,
					provider: data3?.provider,
					cvv: data3?.cvv,
				},
			},
		});
		setRegisterError(data.status == 400);
		setPages(pages + 1);
	}

	return (
		<>
			<div>
				{pages}
				<Steps current={pages} items={steps} />
				<PageDisplay pages={pages} page={0}>
					<UserProfile
						setData={setData1}
						setPages={setPages}
						pages={pages}
						username={username}
					/>
				</PageDisplay>
				<PageDisplay pages={pages} page={1}>
					<Address setData={setData2} setPages={setPages} pages={pages} />
				</PageDisplay>
				<PageDisplay pages={pages} page={2}>
					<UserPayment setData={setData3} setPages={setPages} pages={pages} />
				</PageDisplay>
				<PageDisplay pages={pages} page={3}>
					<CheckData
						setPages={setPages}
						pages={pages}
						userProfile={data1!}
						userAddress={data2!}
						userPayment={data3!}
						onRegister={onRegister}
					/>
				</PageDisplay>
				<PageDisplay pages={pages} page={4}>
					<CompleteRegister isError={registerError} />
				</PageDisplay>
			</div>
		</>
	);
}

export default RegisterPage;
export type UsernameType =
	| {
			username: string;
			email: string | null;
	  }[]
	| undefined;

export const getServerSideProps: GetServerSideProps<{
	username: UsernameType;
}> = async (context) => {
	const username = await prisma?.user.findMany({
		select: {
			username: true,
			email: true,
		},
	});

	return {
		props: {
			username,
		},
	};
};

type CompleteRegisterProps = {
	isError: boolean;
};
function CompleteRegister(props: CompleteRegisterProps) {
	const router = useRouter();
	return (
		<Space direction="vertical">
			{props.isError ? "Unable to register" : "Complete registration"}
			<Space direction="horizontal" size={"small"}>
				<Button onClick={() => router.push("/auth/login")}>Login</Button>
				<Button onClick={() => router.push("/")}>Return to homepage</Button>
			</Space>
		</Space>
	);
}
