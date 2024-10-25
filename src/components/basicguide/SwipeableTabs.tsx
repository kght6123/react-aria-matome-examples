import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";

const tabs = [
	{ id: "home", label: "ホーム" },
	{ id: "news", label: "ニュース" },
	{ id: "contact", label: "コンタクト" },
];

export default function SwipeableTabs() {
	return (
		<Tabs>
			<TabList aria-label="メニュー" className="flex">
				{tabs.map((tab) => (
					<Tab key={tab.id} id={tab.id} className="px-4 py-2 cursor-pointer">
						{tab.label}
					</Tab>
				))}
			</TabList>
			{tabs.map((tab) => (
				<TabPanel key={tab.id} id={tab.id} className="p-4">
					<h2>{tab.label}のコンテンツ</h2>
					<p>ここに{tab.label}の内容が表示されます。</p>
				</TabPanel>
			))}
		</Tabs>
	);
}
