import React from "react";
import SwipeableTabs from "./SwipeableTabs";

export default {
  component: SwipeableTabs,
  title: "第3章 React Aria の基本的なコンポーネント/Tabs（タブナビゲーション）",
};

const Template = (args) => <SwipeableTabs {...args} />;

export const Default = Template.bind({});
Default.args = {};
