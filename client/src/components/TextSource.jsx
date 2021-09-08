import React from "react";
import TextField from "@material-ui/core/TextField";
import { useContext } from "react";
import { formContext } from "../context/ContextForm";

const TextSource = (props) => {
  const { label, registText } = props;
  const { register } = useContext(formContext);

  return (
    <div>
      <TextField id="standard-basic" label={label} {...register(registText)} />
    </div>
  );
};

export default TextSource;
