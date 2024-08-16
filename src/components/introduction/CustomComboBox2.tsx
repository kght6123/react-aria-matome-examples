import {useButton, useComboBox, useFilter} from 'react-aria';
import {Item, useComboBoxState} from 'react-stately';

import {DismissButton, Overlay, usePopover} from 'react-aria';
import type {AriaPopoverProps, AriaComboBoxProps, AriaListBoxOptions, AriaButtonProps} from 'react-aria';
import type {OverlayTriggerState, ComboBoxState, Node} from 'react-stately';

import {useListBox, useOption} from 'react-aria';
import React, { RefObject } from 'react';

type Item = {
  id: string;
  label: string;
};

function ComboBox(props: AriaComboBoxProps<Item>) {
  // Setup filter function and state.
  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  // Setup refs and get props for child elements.
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
      popoverRef
    },
    state
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <label {...labelProps}>{props.label}</label>
      <div>
        <input
          {...inputProps}
          ref={inputRef}
          style={{
            height: 24,
            boxSizing: 'border-box',
            marginRight: 0,
            fontSize: 16
          }}
        />
        <Button
          {...buttonProps}
          buttonRef={buttonRef}
          style={{
            height: 24,
            marginLeft: 0
          }}
        >
          <span
            aria-hidden="true"
            style={{ padding: '0 2px' }}
          >
            ▼
          </span>
        </Button>
        {state.isOpen &&
          (
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
              />
            </Popover>
          )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ComboBox label="Favorite Animal">
      <Item key="red panda">Red Panda</Item>
      <Item key="cat">Cat</Item>
      <Item key="dog">Dog</Item>
      <Item key="aardvark">Aardvark</Item>
      <Item key="kangaroo">Kangaroo</Item>
      <Item key="snake">Snake</Item>
    </ComboBox>
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
        style={{
          ...popoverProps.style,
          background: 'lightgray',
          border: '1px solid gray'
        }}
      >
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

function ListBox(props: AriaListBoxOptions<Item> & { className?: string, state: ComboBoxState<Item>, listBoxRef: RefObject<HTMLUListElement> }) {
  const ref = React.useRef(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        maxHeight: 150,
        overflow: 'auto',
        minWidth: 200
      }}
    >
      {[...state.collection].map((item) => (
        <Option
          key={item.key}
          item={item}
          state={state}
        />
      ))}
    </ul>
  );
}

function Option({ item, state }: { item: Node<Item>, state: ComboBoxState<Item> }) {
  const ref = React.useRef(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  let backgroundColor;
  let color = 'black';

  if (isSelected) {
    backgroundColor = 'blueviolet';
    color = 'white';
  } else if (isFocused) {
    backgroundColor = 'gray';
  } else if (isDisabled) {
    backgroundColor = 'transparent';
    color = 'gray';
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      style={{
        background: backgroundColor,
        color: color,
        padding: '2px 5px',
        outline: 'none',
        cursor: 'pointer'
      }}
    >
      {item.rendered}
    </li>
  );
}

function Button(props: AriaButtonProps<"button"> & { className?: string, children: React.ReactNode, buttonRef: RefObject<HTMLButtonElement>, style?: React.CSSProperties }) {
  const ref = props.buttonRef;
  const { buttonProps } = useButton(props, ref);
  return (
    <button {...buttonProps} ref={ref} style={props.style}>
      {props.children}
    </button>
  );
}
