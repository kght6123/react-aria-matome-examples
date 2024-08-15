import React, { useState } from 'react';
import { useComboBoxState, ComboBoxState } from 'react-stately';
import { Node } from "@react-types/shared";
import { useComboBox, useListBox, useOption, AriaComboBoxOptions, AriaListBoxOptions } from 'react-aria';

type Item = {
  id: string;
  label: string;
};

const items: Item[] = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'orange', label: 'Orange' },
  { id: 'grape', label: 'Grape' },
  { id: 'melon', label: 'Melon' },
];

function ComboBox(props: AriaComboBoxOptions<Item>) {
  const state = useComboBoxState(props);
  const { inputProps, listBoxProps, labelProps } = useComboBox(props, state);

  return (
    <div className="relative inline-block w-64">
      <label {...labelProps} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <input
        {...inputProps}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      {state.isOpen && (
        <ListBox
          {...listBoxProps}
          state={state}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto"
        />
      )}
    </div>
  );
}

function ListBox({ state, className, ...props }: AriaListBoxOptions<Item> & { className: string, state: ComboBoxState<Item> }) {
  const ref = React.useRef(null);
  const { listBoxProps } = useListBox(props, state, ref);
  return (
    <ul
      {...listBoxProps}
      className={`${className} list-none p-0 m-0`}
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

function Option({ item, state }: { item: Node<Item>, state: ComboBoxState<Item> }) {
  const ref = React.useRef(null);
  const { optionProps, isSelected, isFocused } = useOption(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      className={`cursor-default select-none relative py-2 pl-3 pr-9 ${
        isFocused ? 'text-white bg-indigo-600' : 'text-gray-900'
      } ${isSelected ? 'font-semibold' : 'font-normal'}`}
    >
      {item.rendered}
    </li>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const popoverRef = React.useRef<Element | null>(null);
  const listBoxRef = React.useRef<HTMLElement | null>(null);
  const buttonRef = React.useRef<Element | null>(null);
  return (
    <div className="p-8">
      <ComboBox
        label="Choose a fruit"
        items={items}
        onSelectionChange={(key) => setSelectedItem(items.find((item) => item.id === key) || null)}
        selectedKey={selectedItem ? selectedItem.id : null}
        inputRef={inputRef}
        popoverRef={popoverRef}
        listBoxRef={listBoxRef}
        buttonRef={buttonRef}
      />
      {selectedItem && (
        <p className="mt-4 text-gray-700">
          Selected fruit: <strong>{selectedItem.label}</strong>
        </p>
      )}
    </div>
  );
}
