import React from "react";
import ComboBox from "./CustomComboBox";

export default {
  component: ComboBox,
  title: "第1章 React Ariaの紹介/CustomComboBox",
};

const Template = (args) => <ComboBox {...args} />;

export const Default = Template.bind({});
Default.args = {};
