import React from "react";
import TextField from "@material-ui/core/TextField";

const TextSource = (props) => {
  const { label, register } = props;
  return (
    <div>
      <TextField id="standard-basic" label={label} {...register("todo")} />
    </div>
  );
};

export default TextSource;
