import { Button, Checkbox, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function CredentialsLogin() {
	type FormSuccess = {
		email: string;
		password: string;
	};
	const router = useRouter();
	const onFinish = (values: FormSuccess) => {
		signIn("credentials", {
			redirect: false,
			email: values.email,
			password: values.password,
			// @ts-ignore
		}).then(({ ok, error }) => {
			// setLoading(false)
			if (ok) {
				router.push("/");
			} else {
				console.error(error);
			}
		});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			<div>
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label={"Email"}
						name={"email"}
						rules={[{ required: true, message: "Please input your email." }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button htmlType="submit">Login</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}

export default CredentialsLogin;
