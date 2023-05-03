import {Button, Checkbox, Form, Input} from "antd";
import {useRouter} from "next/router";
import axios from "axios";

function AdminRegister() {
	type FormSuccess = {
		username: string;
		password: string;
		passwordConf: string;
		first_name: string;
		last_name: string;
	};
	const router = useRouter();

	async function onRegister(values: FormSuccess) {
		if (values.password != values.passwordConf) return
		const user = await axios({
			method: "POST",
			url: "/api/admin/adminRegister",
			headers: {
				Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
			},
			data: {
				usernames: values.username,
				password: values.password,
				first_name: values.first_name,
				last_name: values.last_name,
			},
		});
		return user.data
	}

	const onFinish = async (values: FormSuccess) => {
		if (values.password != values.passwordConf) return
		await onRegister(values)
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			<div>
				<Form
					labelCol={{span: 8}}
					wrapperCol={{span: 16}}
					style={{maxWidth: 600}}
					initialValues={{remember: true}}
					onFinish={onRegister}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label={"Username"}
						name={"username"}
						rules={[{required: true, message: "Please input your username."}]}
					>
						<Input/>
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						id="password"
						rules={[
							{required: true, message: "Please input your password."},
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
						<Input.Password/>
					</Form.Item>
					<Form.Item
						name="passwordConf"
						label="Confirm Password"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Please confirm your password!",
							},
							({getFieldValue}) => ({
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
						<Input.Password/>
					</Form.Item>

					<Form.Item
						label={"Firstname"}
						name={"first_name"}
						rules={[{required: true, message: "Please input your firstname."}]}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						label={"Lastname"}
						name={"last_name"}
						rules={[{required: true, message: "Please input your lastname."}]}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{offset: 8, span: 16}}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{offset: 8, span: 16}}>
						<Button htmlType="submit">Login</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}

export default AdminRegister;
