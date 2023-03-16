import { Dispatch, SetStateAction } from "react";
import "dayjs/locale/th";
import { Form, Input, Button, DatePicker, Tooltip, Space } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { User_Payment } from "@prisma/client";
import { useErrorNotification } from "@/components/errornoification";

type Data3 = {
	card_type: User_Payment["card_type"];
	provider: User_Payment["provider"];
	name_on_card: User_Payment["name_on_card"];
	card_number: User_Payment["card_number"];
	cvv: User_Payment["cvv"];
	card_expiry: User_Payment["card_expiry"];
};

const vccExplain = `VCC is a unique number generated automatically during a transaction, allowing vendors to process it without seeing the physical card number.`;

function UserPayment({
	setData,
	setPages,
	pages,
}: {
	setData: Dispatch<SetStateAction<Data3 | undefined>>;
	setPages: Dispatch<SetStateAction<number>>;
	pages: number;
}) {
	const { contextHolder, errHandler } = useErrorNotification();

	function firstPageHandler(value: Data3) {
		if (!value.card_number) {
			return errHandler({
				field: "Card number",
				description: "Card number is required",
			});
		}
		if (!value.card_expiry) {
			return errHandler({
				field: "Card expiration date",
				description: "Card expiration date is required",
			});
		}
		if (!value.cvv) {
			return errHandler({
				field: "CVV",
				description: "CVV is required",
			});
		}
		if (!value.name_on_card) {
			return errHandler({
				field: "Name on card",
				description: "Name on card is required",
			});
		}

		setData({
			card_type: "Debit",
			provider: "KBank",
			name_on_card: value.name_on_card,
			card_number: value.card_number,
			cvv: value.cvv,
			card_expiry: new Date(value.card_expiry),
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
					label={"Name on card"}
					name={"name_on_card"}
					id="name_on_card"
					rules={[
						{ required: true, message: "Please input your name on card." },
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label={"Card number"}
					name={"card_number"}
					id="card_number"
					rules={[
						{ required: true, message: "Please input your card number." },
						() => ({
							validator(_, value: string) {
								if (!value) return Promise.resolve();
								const usernameCase = `^[0-9]{16}$`;
								if (!value.match(usernameCase)) {
									return Promise.reject(
										new Error("card number must be 16 numbers.")
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
					label={"Card expiry"}
					name={"card_expiry"}
					id="card_expiry"
					rules={[
						{ required: true, message: "Please input your card expiry." },
					]}
				>
					<DatePicker format={"MM/YY"} picker="month" />
				</Form.Item>

				<Form.Item
					label={"cvv"}
					name={"cvv"}
					id="cvv"
					rules={[
						{ required: true, message: "Please input your cvv." },
						() => ({
							validator(_, value: string) {
								if (!value) return Promise.resolve();
								const usernameCase = `^[0-9]{3}$`;
								if (!value.match(usernameCase)) {
									return Promise.reject(
										new Error("cvv didn't match requirements.")
									);
								}

								return Promise.resolve();
							},
						}),
					]}
				>
					<Input
						min="3"
						suffix={
							<Tooltip title={vccExplain}>
								<div
									style={{
										display:"flex",
										justifyContent:"center",
										alignItems:"center"
									}}
								>
									<AiOutlineExclamationCircle size={16} />
								</div>
							</Tooltip>
						}
					/>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Space direction="horizontal" size={"small"}>
						<Button onClick={() => setPages(pages - 1)}>Previous</Button>
						<Button htmlType="submit">Next</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
}

export { UserPayment };
export type { Data3 };
