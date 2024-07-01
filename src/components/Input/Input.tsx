import { type InputHTMLAttributes } from "react";

export function Input(props: Readonly<InputHTMLAttributes<HTMLInputElement>>) {
  const { className = "", ...rest } = props;
  return (
    <input
      className={`${className} rounded-md border-2 border-blue-500 p-2`}
      {...rest}
    />
  );
}
