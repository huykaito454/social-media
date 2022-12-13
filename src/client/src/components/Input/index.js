import React from "react";
import { useController } from "react-hook-form";

const Input = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <>
      <input className="input" type="text" {...field} {...props} />
    </>
  );
};

export default Input;
