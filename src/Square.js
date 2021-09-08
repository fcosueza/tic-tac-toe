import React from "react";
import "./";

const Square = props => {
  return (
    <button className={props.classes} onClick={props.onClick} key={props.key}>
      {props.value}
    </button>
  );
};

export default Square;
