import { ListBox, ListBoxItem } from "react-aria-components";

export default function SimpleListBox() {
	return (
		<ListBox className="w-64">
			<ListBoxItem key="item1">アイテム1</ListBoxItem>
			<ListBoxItem key="item2">アイテム2</ListBoxItem>
			<ListBoxItem key="item3">アイテム3</ListBoxItem>
		</ListBox>
	);
}
