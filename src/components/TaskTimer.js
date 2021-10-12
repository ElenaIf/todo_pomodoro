import React, { useState, useEffect } from "react";

import "../style/css/TaskTimer.css";

import timerIsReadyAudio from "../assets/sounds/mixkit-happy-bell-alert-601.wav";

const TaskTimer = ({
	saveTimeIntoTodo,
	isRunning,
	setIsRunning,
	seconds,
	setSeconds,
	timer,
	renderReadyTimer,
	setRenderReadyTimer,
	selectedTodo,
	setshowSecondTimer,
}) => {
	const [newTimeTodo, setnewTimeTodo] = useState(selectedTodo.timeSpent);

	let totalTime;
	let timerIsReadySound = new Audio(timerIsReadyAudio);

	useEffect(() => {
		if (isRunning) {
			const id = window.setInterval(() => {
				// we use callback here! don't use just seconds + 1. It will not work, because seconds are always 0.
				setSeconds((seconds) => seconds - 1);
			}, 1000);

			// the next time useEffect gets called - stop the interval
			return () => window.clearInterval(id);
		}
	}, [isRunning]);

	useEffect(() => {
		if (seconds === 0) {
			setRenderReadyTimer(true);
			// setIsRunning(false);
			totalTime = newTimeTodo + (timer - seconds);
			// setnewTimeTodo(totalTime);
			saveTimeIntoTodo(selectedTodo, totalTime);
			timerIsReadySound.play();
		}
	}, [seconds]);

	let watchMinutes = Math.floor(seconds / 60)
		.toString()
		.padStart(2, "0");
	let watchSeconds = (seconds - Math.floor(seconds / 60) * 60).toString().padStart(2, "0");

	return (
		<div className="timers">
			{renderReadyTimer ? (
				<div className="full-screen-timer-ready">
					<div className="timer-round-div">
						<div className="timer-text">Done</div>
						<button
							className="timer-close-button"
							onClick={() => {
								setIsRunning(false);
								setRenderReadyTimer(false);
								setshowSecondTimer(false);
							}}
						>
							Close
						</button>
					</div>
					<div className="timer-task-name-area">
						<h2>Timer ready for: </h2>
						<h2>{selectedTodo.title}</h2>
					</div>
				</div>
			) : (
				<div className="full-screen-timer">
					<div className="timer-round-div">
						<h1 className="timer-text">
							{watchMinutes}:{watchSeconds}
						</h1>
						<button
							className="timer-stop-button"
							onClick={() => {
								setIsRunning(false);
								totalTime = newTimeTodo + (timer - seconds);
								setnewTimeTodo(totalTime);
								saveTimeIntoTodo(selectedTodo, totalTime);
								setshowSecondTimer(false);
							}}
						>
							Stop
						</button>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>

					<div className="timer-task-name-area">
						<h2>Timer started for: </h2>
						<h2>{selectedTodo.title}</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default TaskTimer;
