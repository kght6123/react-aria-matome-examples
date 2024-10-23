import React from "react";
import { CustomButton } from "./CustomButton";

export default {
	component: CustomButton,
	title: "第1章 React Ariaの紹介/CustomButton",
};

const Template = (args) => <CustomButton {...args} />;

export const Default = Template.bind({});
Default.args = {
	onPress: () => alert("Button clicked!"),
	children: "Click me",
};

// export const Pinned = Template.bind({});
// Pinned.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_PINNED',
//   },
// };

// export const Archived = Template.bind({});
// Archived.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_ARCHIVED',
//   },
// };
