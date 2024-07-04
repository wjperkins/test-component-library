import { type ButtonHTMLAttributes } from "react";

export function Button(
  props: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>,
) {
  const { className = "", ...rest } = props;
  return (
    <button
      className={`${className} rounded-md bg-blue-700 p-2 px-3 text-white hover:bg-blue-500 dark:bg-blue-300 dark:text-gray-900 dark:hover:bg-blue-100`}
      {...rest}
    />
  );
}
