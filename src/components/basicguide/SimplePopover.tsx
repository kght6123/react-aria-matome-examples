import { Button, Popover, PopoverTrigger } from "react-aria-components";

export default function SimplePopover() {
	return (
		<PopoverTrigger>
			<Button className="px-4 py-2 bg-blue-500 text-white rounded">
				ポップオーバーを開く
			</Button>
			<Popover className="p-4 bg-white shadow-lg rounded">
				これはポップオーバーのコンテンツです。
			</Popover>
		</PopoverTrigger>
	);
}
