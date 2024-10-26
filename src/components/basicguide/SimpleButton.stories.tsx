import React from "react";
import SimpleButton from "./SimpleButton";

export default {
  component: SimpleButton,
  title: "第3章 React Aria の基本的なコンポーネント/Button（ボタン）",
};

const Template = (args) => <SimpleButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
