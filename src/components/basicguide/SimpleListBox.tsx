import { ListBox, ListBoxItem, Text } from "react-aria-components";

export default function SimpleListBox() {
  return (
    <ListBox
      className="w-64 space-y-3"
      aria-label="アイテムリスト"
      selectionMode="single"
    >
      <ListBoxItem
        key="item1"
        className="p-2 border border-solid border-gray-700 rounded-8 flex flex-col"
      >
        <Text slot="label">アイテム1</Text>
        <Text slot="description" className="text-sm">
          アイテム1の詳細
        </Text>
      </ListBoxItem>
      <ListBoxItem
        key="item2"
        className="p-2 border border-solid border-gray-700 rounded-8 flex flex-col"
      >
        アイテム2
      </ListBoxItem>
      <ListBoxItem
        key="item3"
        className="p-2 border border-solid border-gray-700 rounded-8 flex flex-col"
      >
        アイテム3
      </ListBoxItem>
    </ListBox>
  );
}
