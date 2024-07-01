import { type LabelHTMLAttributes } from "react";

export function Label(props: Readonly<LabelHTMLAttributes<HTMLLabelElement>>) {
  const { className = "", ...rest } = props;
  return <label className={`${className} font-bold`} {...rest} />;
}
