import React from "react";
import SimpleModal from "./SimpleModal";

export default {
	component: SimpleModal,
	title: "第3章 React Aria の基本的なコンポーネント/Dialog（ダイアログ）",
};

const Template = (args) => <SimpleModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
