import React from "react";
import { useState } from "react";
import styles from "./InfoPanel.module.css";

interface History {
	squares: number[];
	lastMove: number[];
}

interface Props {
	history: History[];
	status: string;
	step: number;
	jumpTo: (step: number) => void;
}

const InfoPanel = ({ history, status, step, jumpTo }: Props): JSX.Element => {
	const [ascendingOrder, setAscendingOrder] = useState(true);

	const moves = history.map((stepHistory: History, moveIndex: number) => {
		const moveDescription = moveIndex
			? `Go to move #${moveIndex} (${stepHistory.lastMove})`
			: "Go to game start";

		return (
			<li key={moveIndex}>
				<button onClick={() => jumpTo(moveIndex)}>
					{moveIndex === step ? <b>{moveDescription}</b> : moveDescription}
				</button>
			</li>
		);
	});

	return (
		<div className={styles.gameInfo} role="status">
			<div className={styles.status}>{status}</div>
			<ol>{ascendingOrder ? moves : moves.reverse()}</ol>
			<ul>
				<button className={styles.button} onClick={() => setAscendingOrder(!ascendingOrder)}>
					Sort Move List
				</button>
			</ul>
		</div>
	);
};

export default InfoPanel;
