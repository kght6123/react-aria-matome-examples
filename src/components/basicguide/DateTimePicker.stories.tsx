import React from "react";
import DateTimePicker from "./DateTimePicker";

export default {
  component: DateTimePicker,
  title:
    "第3章 React Aria の基本的なコンポーネント/Date and Time (日付・時刻選択)",
};

const Template = (args) => <DateTimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {};
