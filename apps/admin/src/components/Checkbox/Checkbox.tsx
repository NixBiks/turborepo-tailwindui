import React from "react";

export type CheckboxProps = {
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  indeterminate,
  ...rest
}) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    ref.current.indeterminate = indeterminate || false;
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
      ref={ref}
      {...rest}
    />
  );
};
