import React from "react";
import Button from "@material-ui/core/Button";

export default function ButtonSource(props) {
  const { classes, color, children } = props;

  return (
    <Button className={classes} variant="contained" color={color} type="submit">
      {children}
    </Button>
  );
}
