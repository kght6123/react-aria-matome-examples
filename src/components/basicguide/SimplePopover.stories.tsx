import React from "react";
import SimplePopover from "./SimplePopover";

export default {
  component: SimplePopover,
  title: "第3章 React Aria の基本的なコンポーネント/Popover (ポップオーバー）",
};

const Template = (args) => <SimplePopover {...args} />;

export const Default = Template.bind({});
Default.args = {};
