import React, { MutableRefObject, RefObject, useState } from 'react';
import { useComboBoxState } from 'react-stately';
import { Node } from "@react-types/shared";
import { DismissButton, Overlay, useComboBox, useListBox, useOption, useFilter, usePopover, useButton } from 'react-aria';
import type {AriaButtonOptions, AriaComboBoxOptions, AriaListBoxOptions, AriaPopoverProps} from 'react-aria';
import type {OverlayTriggerState, ComboBoxState} from 'react-stately';


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
  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(props, state);

  return (
    <div className="relative inline-block w-64">
      <label {...labelProps} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <input
        {...inputProps}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ref={props.inputRef}
      />
      {props.buttonRef && <Button
        {...buttonProps}
        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        buttonRef={props.buttonRef}
      >
        <span
          aria-hidden="true"
          className="pb-0.5 pr-0.5"
        >
          ▼
        </span>
      </Button>}
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={props.inputRef}
          popoverRef={props.popoverRef}
          isNonModal
          placement="bottom start"
        >
          <ListBox
            {...listBoxProps}
            state={state}
            // className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto"
            listBoxRef={props.listBoxRef}
          />
        </Popover>
      )}
    </div>
  );
}

function ListBox({ state, className, ...props }: AriaListBoxOptions<Item> & { className?: string, state: ComboBoxState<Item>, listBoxRef: RefObject<HTMLElement | null> }) {
  const { listBoxRef } = props;
  const { listBoxProps } = useListBox(props, state, props.listBoxRef);
  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef as React.MutableRefObject<HTMLUListElement>}
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
      ref={ref}
      className={`cursor-default select-none relative py-2 pl-3 pr-9 ${
        isFocused ? 'text-white bg-indigo-600' : 'text-gray-900'
      } ${isSelected ? 'font-semibold' : 'font-normal'}`}
    >
      {item.rendered}
    </li>
  );
}

function Popover({ children, state, offset = 8, ...props }: AriaPopoverProps & { children: React.ReactNode;
  state: OverlayTriggerState;} ) {
  const { popoverProps, underlayProps, arrowProps, placement } = usePopover({
    ...props,
    offset,
  }, state);
  return (
    <Overlay>
      <div {...underlayProps} className="underlay" />
      <div
        {...popoverProps}
        ref={props.popoverRef as React.MutableRefObject<HTMLDivElement>}
        className="popover"
      >
        <svg
          {...arrowProps}
          className="arrow"
          data-placement={placement}
          viewBox="0 0 12 12"
        >
          <path d="M0 0 L6 6 L12 0" />
        </svg>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

function Button(props: AriaButtonOptions<"button"> & { className: string, children: React.ReactNode, buttonRef: RefObject<Element | null> }) {
  const { buttonProps } = useButton(props, props.buttonRef);
  const { children } = props;
  return (
    <button {...buttonProps} ref={props.buttonRef as MutableRefObject<HTMLButtonElement>}>
      {children}
    </button>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);
  const listBoxRef = React.useRef<HTMLUListElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
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
