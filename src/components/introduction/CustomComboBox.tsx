import { useButton, useComboBox, useFilter } from "react-aria";
import { Item, useComboBoxState } from "react-stately";

import { DismissButton, Overlay, usePopover } from "react-aria";
import type {
	AriaButtonProps,
	AriaComboBoxProps,
	AriaListBoxOptions,
	AriaPopoverProps,
} from "react-aria";
import type { ComboBoxState, Node, OverlayTriggerState } from "react-stately";

import React, { type RefObject } from "react";
import { useListBox, useOption } from "react-aria";

type ItemProps = {
	id: string;
	label: string;
};

export function ComboBox(props: AriaComboBoxProps<ItemProps>) {
	const { contains } = useFilter({ sensitivity: "base" });
	const state = useComboBoxState({ ...props, defaultFilter: contains });

	const buttonRef = React.useRef(null);
	const inputRef = React.useRef(null);
	const listBoxRef = React.useRef(null);
	const popoverRef = React.useRef(null);

	const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
		{
			...props,
			inputRef,
			buttonRef,
			listBoxRef,
			popoverRef,
		},
		state,
	);

	return (
		<div className="relative inline-block w-64">
			{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
			<label
				{...labelProps}
				className="block text-sm font-medium text-gray-700"
			>
				{props.label}
			</label>
			<div className="relative">
				<input
					{...inputProps}
					ref={inputRef}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
				/>
				<Button
					{...buttonProps}
					buttonRef={buttonRef}
					className="absolute inset-y-0 right-0 flex items-center content-center justify-center px-2 text-gray-700"
				>
					<span aria-hidden="true">▼</span>
				</Button>
			</div>
			{state.isOpen && (
				<Popover
					state={state}
					triggerRef={inputRef}
					popoverRef={popoverRef}
					isNonModal
					placement="bottom start"
				>
					<ListBox
						{...listBoxProps}
						listBoxRef={listBoxRef}
						state={state}
						className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-gray-300 ring-opacity-5 overflow-auto"
					/>
				</Popover>
			)}
		</div>
	);
}

interface PopoverProps extends AriaPopoverProps {
	children: React.ReactNode;
	state: OverlayTriggerState;
}

function Popover({ children, state, ...props }: PopoverProps) {
	const { popoverProps } = usePopover(props, state);

	return (
		<Overlay>
			<div
				{...popoverProps}
				ref={props.popoverRef as React.RefObject<HTMLDivElement>}
				className="bg-gray-300 border border-gray-500 rounded-md shadow-lg"
			>
				{children}
				<DismissButton onDismiss={state.close} />
			</div>
		</Overlay>
	);
}

function ListBox(
	props: AriaListBoxOptions<ItemProps> & {
		className?: string;
		state: ComboBoxState<ItemProps>;
		listBoxRef: RefObject<HTMLUListElement>;
	},
) {
	const ref = React.useRef(null);
	const { listBoxRef = ref, state } = props;
	const { listBoxProps } = useListBox(props, state, listBoxRef);

	return (
		<ul
			{...listBoxProps}
			ref={listBoxRef}
			className={`${props.className} list-none p-0 m-0 max-h-40 overflow-auto min-w-52`}
		>
			{[...state.collection].map((item) => (
				<Option key={item.key} item={item} state={state} />
			))}
		</ul>
	);
}

function Option({
	item,
	state,
}: {
	item: Node<ItemProps>;
	state: ComboBoxState<ItemProps>;
}) {
	const ref = React.useRef(null);
	const { optionProps, isSelected, isFocused, isDisabled } = useOption(
		{ key: item.key },
		state,
		ref,
	);
	return (
		<li
			{...optionProps}
			ref={ref}
			className={`cursor-default select-none relative py-2 pl-3 pr-9 ${
				isFocused ? "text-white bg-indigo-600" : "text-gray-900"
			} ${isSelected ? "font-semibold" : "font-normal"} ${isDisabled ? "opacity-50" : ""}`}
		>
			{item.rendered}
		</li>
	);
}

function Button(
	props: AriaButtonProps<"button"> & {
		className?: string;
		children: React.ReactNode;
		buttonRef: RefObject<HTMLButtonElement>;
		style?: React.CSSProperties;
	},
) {
	const ref = props.buttonRef;
	const { buttonProps } = useButton(props, ref);
	return (
		<button {...buttonProps} ref={ref} className={props.className}>
			{props.children}
		</button>
	);
}

export default function App() {
	return (
		<ComboBox label="Choose a fruit">
			<Item key="apple">Apple</Item>
			<Item key="banana">Banana</Item>
			<Item key="orange">Orange</Item>
			<Item key="grape">Grape</Item>
			<Item key="melon">Melon</Item>
		</ComboBox>
	);
}
