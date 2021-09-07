import React from "react";
import Button from "@material-ui/core/Button";

export default function ButtonSource(props) {
  const { classes, color } = props;

  return (
    <Button className={classes} variant="contained" color={color} type="submit">
      送信
    </Button>
  );
}
