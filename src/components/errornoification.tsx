import { Button, notification, Space } from "antd";

export const useErrorNotification = () => {
	const [api, contextHolder] = notification.useNotification();

	type ErrHandlerProps = { field: string; description: string };
	function errHandler({ field, description }: ErrHandlerProps) {
		api.error({
			message: `${field}`,
			description,
		});
	}

	return { errHandler, contextHolder };
};
