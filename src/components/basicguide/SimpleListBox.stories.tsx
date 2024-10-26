import React from "react";
import SimpleListBox from "./SimpleListBox";

export default {
  component: SimpleListBox,
  title: "第3章 React Aria の基本的なコンポーネント/ListBox (リストボックス）",
};

const Template = (args) => <SimpleListBox {...args} />;

export const Default = Template.bind({});
Default.args = {};
