import React from "react";
import style from "./Square.css";

const Square = props => {
  return (
    <button className={props.highlight ? "square highlight" : "square"} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
