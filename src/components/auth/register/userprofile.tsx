import { Dispatch, SetStateAction } from "react";
import "dayjs/locale/th";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import { UsernameType } from "@/pages/auth/register";
import { GenderType } from "@prisma/client";
import { useErrorNotification } from "@/components/errornoification";

type Data1 = {
	email: string;
	password: string;
	repetePassword: string;
	firstname: string;
	lastname: string;
	username: string;
	telephone: string;
	dob: string;
	gender: GenderType;
};

const genderOptions = [
	{ label: "female", value: "female" },
	{ label: "male", value: "male" },
];

function UserProfile({
	setData,
	setPages,
	pages,
	username,
}: {
	setData: Dispatch<SetStateAction<Data1 | undefined>>;
	setPages: Dispatch<SetStateAction<number>>;
	pages: number;
	username: UsernameType;
}) {
	const { Option } = Select;

	const { contextHolder, errHandler } = useErrorNotification();
	function firstPageHandler(value: Data1) {
		if (!value.email) {
			return errHandler({
				field: "Email",
				description: "Email is required",
			});
		}
		if (!value.password) {
			return errHandler({
				field: "Password",
				description: "Password is required",
			});
		}
		if (!value.repetePassword) {
			return errHandler({
				field: "Password confirmation",
				description: "Password confirmation is required",
			});
		}
		if (!value.dob) {
			return errHandler({
				field: "Date of Birth",
				description: "Date of Birth is required",
			});
		}
		if (!value.firstname) {
			return errHandler({
				field: "Firstname",
				description: "Firstname is required",
			});
		}
		if (!value.lastname) {
			return errHandler({
				field: "Lastname",
				description: "Lastname is required",
			});
		}
		if (!value.telephone) {
			return errHandler({
				field: "Telephone",
				description: "Telephone is required",
			});
		}
		if (!value.username) {
			return errHandler({
				field: "Username",
				description: "Username is required",
			});
		}
		if (!value.gender) {
			return errHandler({
				field: "Gender",
				description: "Gender is required",
			});
		}
		setData({
			email: value.email,
			password: value.password,
			repetePassword: value.repetePassword,
			firstname: value.firstname,
			lastname: value.lastname,
			username: value.username,
			dob: value.dob,
			gender: value.gender,
			telephone: value.telephone,
		});
		setPages(pages + 1);
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			{contextHolder}
			<Form
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={firstPageHandler}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label={"Email"}
					name={"email"}
					id="email"
					hasFeedback
					rules={[
						{ required: true, message: "Please input your email." },
						() => ({
							validator(_, value: string) {
								const isEmail =
									/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
								if (!value) return Promise.resolve();
								if (!value.match(isEmail)) {
									return Promise.reject(
										new Error("Password didn't match requirements.")
									);
								}
								if (username?.some((user) => user.email === value)) {
									return Promise.reject(
										new Error("This email is already taken.")
									);
								}
								return Promise.resolve();
							},
						}),
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					id="password"
					rules={[
						{ required: true, message: "Please input your password." },
						() => ({
							validator(_, value: string) {
								const strongPassword =
									"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})";
								if (!value) return Promise.resolve();
								if (!value.match(strongPassword)) {
									return Promise.reject(
										new Error("Password didn't match requirements.")
									);
								}
								return Promise.resolve();
							},
						}),
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="repetePassword"
					label="Confirm Password"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error("The two passwords that you entered do not match!")
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="Firstname"
					name="firstname"
					id="firstname"
					rules={[{ required: true, message: "Please input your firstname." }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Lastname"
					name="lastname"
					id="lastname"
					rules={[{ required: true, message: "Please input your lastname." }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Username"
					name="username"
					id="username"
					hasFeedback
					rules={[
						{ required: true, message: "Please input your username." },
						() => ({
							validator(_, value: string) {
								if (!value) return Promise.resolve();
								const usernameCase = `^[a-zA-Z]{3,}$`;
								if (!value.match(usernameCase)) {
									return Promise.reject(
										new Error("Username didn't match requirements.")
									);
								}
								if (username?.some((user) => user.username === value)) {
									return Promise.reject(
										new Error("This username is already taken.")
									);
								}

								return Promise.resolve();
							},
						}),
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Telephone"
					name="telephone"
					id="telephone"
					hasFeedback
					rules={[
						{ required: true, message: "Please input your Telephone." },
						() => ({
							validator(_, value: string) {
								const telPattern = "^[0-9]{10}$";
								if (!value) return Promise.resolve();
								if (!value.match(telPattern)) {
									return Promise.reject(
										new Error("Telephone didn't match requirements.")
									);
								}
								return Promise.resolve();
							},
						}),
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Date Of Birth"
					name="dob"
					id="dob"
					rules={[
						{ required: true, message: "Please input your date of birth." },
					]}
				>
					<DatePicker format={"DD/MM/YYYY"} />
				</Form.Item>
				<Form.Item
					name="gender"
					id="gender"
					label="Gender"
					rules={[{ required: true, message: "Please select gender!" }]}
				>
					<Select placeholder="select your gender">
						{genderOptions.map((gender, key) => {
							return (
								<Option value={gender.value} key={key}>
									{gender.label}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button htmlType="submit">Next</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export { UserProfile };
export type { Data1 };
