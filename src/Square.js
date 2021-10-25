import React from "react";
import "./Square.css";

const Square = props => {
  return (
    <button className={props.classes} onClick={props.onClick} key={props.id}>
      {props.value}
    </button>
  );
};

export default Square;
