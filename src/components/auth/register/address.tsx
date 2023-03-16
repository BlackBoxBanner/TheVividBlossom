import { Form, Input, Button, AutoComplete, Space } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { location } from "./th-address/location";
import { DefaultOptionType } from "antd/es/select";
import { useErrorNotification } from "@/components/errornoification";

type Data2 = {
	address_line1: string;
	address_line2: string;
	subDistrict: string;
	district: string;
	province: string;
	zipcode: string;
};

type SearchType = {
	district: string;
	amphoe: string;
	province: string;
	zipcode: number;
	district_code: number;
	amphoe_code: number;
	province_code: number;
};

function Address({
	setData,
	setPages,
	pages,
}: {
	setData: Dispatch<SetStateAction<Data2 | undefined>>;
	setPages: Dispatch<SetStateAction<number>>;
	pages: number;
}) {
	const [locationForm, setLocationForm] = useState<typeof location>();
	const [form] = Form.useForm();
	const { Option: OptionAuto } = AutoComplete;
	const onSearch = (type: keyof SearchType, value: string) => {
		if (!value) {
			setLocationForm([]);
		} else {
			setLocationForm(
				location.filter((loc) =>
					loc[type].toString().startsWith(value.toString())
				)
			);
		}
	};

	const onSelect = (option: DefaultOptionType, type: keyof SearchType) => {
		if (!locationForm) return;
		const select = locationForm[option.key as number];
		form.setFieldsValue({
			subDistrict: select.district,
			district: select.amphoe,
			province: select.province,
			zipcode: select.zipcode.toString(),
		});
	};
	const { contextHolder, errHandler } = useErrorNotification();
	function secondPageHandler(value: Data2) {
		if (!value.address_line1) {
			return errHandler({
				field: "Address Line 1",
				description: "GeAddress Line 1nder is required",
			});
		}
		if (!value.subDistrict) {
			return errHandler({
				field: "Sub district",
				description: "Sub district is required",
			});
		}
		if (!value.district) {
			return errHandler({
				field: "District",
				description: "District is required",
			});
		}
		if (!value.zipcode) {
			return errHandler({
				field: "Zipcode",
				description: "Zipcode is required",
			});
		}

		setData({
			address_line1: value.address_line1,
			address_line2: value.address_line2,
			subDistrict: value.subDistrict,
			district: value.district,
			province: value.province,
			zipcode: value.zipcode,
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
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={secondPageHandler}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label={"Address line 1"}
					name={"address_line1"}
					id="address_line1"
					rules={[{ required: true, message: "Please input your address." }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={"Address line 2"}
					name={"address_line2"}
					id="address_line2"
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={"Sub district"}
					name={"subDistrict"}
					id="subDistrict"
					rules={[
						{ required: true, message: "Please input your sub district." },
					]}
				>
					<AutoComplete
						onSearch={(txt) => onSearch("district", txt)}
						onSelect={(e, option) => onSelect(option, "district")}
					>
						{locationForm?.map((loc, index) => (
							<OptionAuto
								key={index}
								value={`${loc.district} > ${loc.amphoe} > ${loc.province} > ${loc.zipcode}`}
							>
								{`${loc.district} > ${loc.amphoe} > ${loc.province} > ${loc.zipcode}`}
							</OptionAuto>
						))}
					</AutoComplete>
				</Form.Item>
				<Form.Item
					label={"District"}
					name={"district"}
					id="district"
					rules={[{ required: true, message: "Please input your district." }]}
				>
					<AutoComplete
						onSearch={(txt) => onSearch("amphoe", txt)}
						onSelect={(e, option) => onSelect(option, "amphoe")}
					>
						{locationForm?.map((loc, index) => (
							<OptionAuto
								key={index}
								value={`${loc.district} > ${loc.amphoe} > ${loc.province} > ${loc.zipcode}`}
							>
								{`${loc.district} > ${loc.amphoe} > ${loc.province} > ${loc.zipcode}`}
							</OptionAuto>
						))}
					</AutoComplete>
				</Form.Item>
				<Form.Item
					label={"Province"}
					name={"province"}
					id="province"
					rules={[{ required: true, message: "Please input your province." }]}
				>
					<AutoComplete
						className="md:text-lg"
						onSearch={(txt) => onSearch("province", txt)}
						onSelect={(e, option) => onSelect(option, "province")}
					>
						{locationForm?.map((loc, index) => (
							<OptionAuto
								key={index}
								value={`${loc.district} > ${loc.amphoe} > ${loc.province} > ${loc.zipcode}`}
							>
								{`${loc.district} > ${loc.amphoe} > ${loc.province} > ${loc.zipcode}`}
							</OptionAuto>
						))}
					</AutoComplete>
				</Form.Item>
				<Form.Item
					label={"Zipcode"}
					name={"zipcode"}
					id="zipcode"
					rules={[
						{
							required: true,
							message: "Please input your zip-code.",
						},
						() => ({
							validator(_, value) {
								if (!value) return Promise.resolve();
								if (!/^[0-9]+$/.test(value)) {
									return Promise.reject(new Error("Zipcode must be a number."));
								}
								return Promise.resolve();
							},
						}),
					]}
				>
					<AutoComplete
						className="md:text-lg"
						onSelect={(e, option) => onSelect(option, "zipcode")}
						onSearch={(txt) => onSearch("zipcode", txt)}
					>
						{locationForm?.map((loc, index) => (
							<OptionAuto
								key={index}
								value={`${loc.district} > ${loc.amphoe} > ${loc.province} > ${loc.zipcode}`}
								className="font-sans"
							>
								{`${loc.district} > ${loc.amphoe} > ${loc.province} > ${loc.zipcode}`}
							</OptionAuto>
						))}
					</AutoComplete>
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

export { Address };
export type { Data2 };
