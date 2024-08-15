import React, { RefObject } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

type CustomButtonProps = AriaButtonProps<'button'> & {
  children: React.ReactNode;
};

function CustomButton(props: CustomButtonProps) {
  const ref: RefObject<HTMLButtonElement> = React.useRef(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    >
      {props.children}
    </button>
  );
}

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <CustomButton onPress={() => alert('Button clicked!')}>
        Click me
      </CustomButton>
    </div>
  );
}
