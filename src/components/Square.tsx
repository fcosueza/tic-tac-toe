import React from "react";
import styles from "./Square.module.css";

interface Props {
	highlight: boolean;
	value: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Square = ({ highlight, onClick, value }: Props) => {
	return (
		<button
			className={highlight ? `${styles.square} ${styles.highlight}` : styles.square}
			onClick={onClick}>
			{value}
		</button>
	);
};

export default Square;
