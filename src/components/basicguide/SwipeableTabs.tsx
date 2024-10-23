import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";

const tabs = [
	{ id: "home", label: "ホーム" },
	{ id: "news", label: "ニュース" },
	{ id: "contact", label: "コンタクト" },
];

export default function SwipeableTabs() {
	const [selectedTab, setSelectedTab] = useState(tabs[0].id);

	return (
		<Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
			<TabList className="flex">
				{tabs.map((tab) => (
					<Tab key={tab.id} className="px-4 py-2 cursor-pointer">
						{tab.label}
					</Tab>
				))}
			</TabList>
			{tabs.map((tab) => (
				<TabPanel key={tab.id} className="p-4">
					<h2>{tab.label}のコンテンツ</h2>
					<p>ここに{tab.label}の内容が表示されます。</p>
				</TabPanel>
			))}
		</Tabs>
	);
}
