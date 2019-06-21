import React from "react";

const Button = props => {
  return (
    <input type="button" value={props.label} className="ui primary button" />
  );
};

export default Button;
