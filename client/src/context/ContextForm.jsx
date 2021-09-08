import React from "react";
import { useForm } from "react-hook-form";
import { createContext } from "react";

export const formContext = createContext();

const ContextForm = (props) => {
  const { children } = props;
  const { register, handleSubmit, reset } = useForm();
  return (
    <formContext.Provider
      value={{ register: register, handleSubmit: handleSubmit, reset: reset }}
    >
      {children}
    </formContext.Provider>
  );
};

export default ContextForm;
