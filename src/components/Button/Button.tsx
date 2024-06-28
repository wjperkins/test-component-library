import { type ButtonHTMLAttributes } from "react";

export function Button(props: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { className = '', ...rest } = props
  return <button className={`${className} rounded-md bg-blue-500 hover:bg-blue-200 p-2 px-3`} {...rest} />
}
