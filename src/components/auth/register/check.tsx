import { Dispatch, SetStateAction } from "react";
import { Data2 } from "./address";
import { Data3 } from "./payment";
import { Data1 } from "./userprofile";
import { Button, Card, Descriptions, Space } from "antd";

type CheckDataProps = {
	setPages: Dispatch<SetStateAction<number>>;
	pages: number;
	userProfile?: Data1;
	userAddress?: Data2;
	userPayment?: Data3;
	onRegister: () => void;
};

function CheckData(props: CheckDataProps) {
	const dob = new Date(String(props.userProfile?.dob));
	return (
		<>
			<div>
				<Space direction="vertical" size="middle" style={{ display: "flex" }}>
					<Card size="small" about="User information.">
						<Descriptions title="User Info">
							<Descriptions.Item label="email">
								{props.userProfile?.email}
							</Descriptions.Item>
							<Descriptions.Item label="firstname">
								{props.userProfile?.firstname}
							</Descriptions.Item>
							<Descriptions.Item label="lastname">
								{props.userProfile?.lastname}
							</Descriptions.Item>
							<Descriptions.Item label="username">
								{props.userProfile?.username}
							</Descriptions.Item>
							<Descriptions.Item label="telephone">
								{props.userProfile?.telephone}
							</Descriptions.Item>
							<Descriptions.Item label="date of birth">
								{dob.getDate() +
									" / " +
									dob.getMonth() +
									" / " +
									dob.getFullYear()}
							</Descriptions.Item>
							<Descriptions.Item label="gender">
								{props.userProfile?.gender}
							</Descriptions.Item>
						</Descriptions>
					</Card>
					<Card size="small" about="User address information.">
						<Descriptions title="User address">
							<Descriptions.Item label="address line 1">
								{props.userAddress?.address_line1}
							</Descriptions.Item>
							<Descriptions.Item label="address line 2">
								{props.userAddress?.address_line2}
							</Descriptions.Item>
							<Descriptions.Item label="sub district">
								{props.userAddress?.subDistrict}
							</Descriptions.Item>
							<Descriptions.Item label="district">
								{props.userAddress?.district}
							</Descriptions.Item>
							<Descriptions.Item label="province">
								{props.userAddress?.province}
							</Descriptions.Item>
							<Descriptions.Item label="zip code">
								{props.userAddress?.zipcode}
							</Descriptions.Item>
						</Descriptions>
					</Card>
					<Card size="small" about="User payment information.">
						<Descriptions title="User payment">
							<Descriptions.Item label="name on card">
								{props.userPayment?.name_on_card}
							</Descriptions.Item>
							<Descriptions.Item label="card number">
								{props.userPayment?.card_number}
							</Descriptions.Item>
							<Descriptions.Item label="card expiry date">
								{props.userPayment?.card_expiry.getMonth() +
									"/" +
									props.userPayment?.card_expiry
										.getFullYear()
										.toString()
										.substring(2)}
							</Descriptions.Item>
							<Descriptions.Item label="CVV">
								{props.userPayment?.cvv}
							</Descriptions.Item>
							<Descriptions.Item label="card type">
								{props.userPayment?.card_type}
							</Descriptions.Item>
							<Descriptions.Item label="bank provider">
								{props.userPayment?.provider}
							</Descriptions.Item>
						</Descriptions>
					</Card>
					<Space direction="horizontal" size={"small"}>
						<Button onClick={() => props.setPages(props.pages - 1)}>
							Previous
						</Button>
						<Button onClick={props.onRegister}>Register</Button>
					</Space>
				</Space>
			</div>
		</>
	);
}

export { CheckData };
