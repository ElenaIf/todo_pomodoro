import React, { useState, useEffect } from "react";

import "../style/css/Timer.css";

const Timer = () => {
	const [seconds, setSeconds] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (isRunning) {
			const id = window.setInterval(() => {
				// we use callback here! don't use just seconds + 1. It will not work, because seconds are always 0.
				setSeconds((seconds) => seconds + 1);
			}, 1000);
			// the next time useEffect gets called - stop the interval
			return () => window.clearInterval(id);
		}
	}, [isRunning]);

	let watchMinutes = Math.floor(seconds / 60)
		.toString()
		.padStart(2, "0");
	let watchSeconds = (seconds - Math.floor(seconds / 60) * 60).toString().padStart(2, "0");

	return (
		// <div className="timer">
		<div>
			<p>Timer 2</p>
			<p>
				{watchMinutes}:{watchSeconds}
			</p>
			<p>{seconds}</p>
			{isRunning ? (
				<button
					onClick={() => {
						setIsRunning(false);
					}}
				>
					Stop
				</button>
			) : (
				<button
					onClick={() => {
						setIsRunning(true);
						setSeconds(0);
					}}
				>
					Start from the beginning
				</button>
			)}
			<button
				onClick={() => {
					setIsRunning(false);
					setSeconds(0);
				}}
			>
				Reset
			</button>
		</div>
	);
};

export default Timer;
