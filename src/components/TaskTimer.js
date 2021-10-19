import React, { useState, useEffect } from "react";

import "../style/css/TaskTimer.css";

import timerIsReadyAudio from "../assets/sounds/mixkit-happy-bell-alert-601.wav";

import { useAuth } from "../contexts/AuthContext";

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
	setSelectedTodo,
	setshowSecondTimer,
	saveTimeIntoTodoUnregistered,
}) => {
	const [newTimeTodo, setnewTimeTodo] = useState(selectedTodo.timeSpent);
	const [runBreakTimer, setRunBreakTimer] = useState(false);
	const { currentUser } = useAuth();

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
		if (seconds === 0 && !runBreakTimer) {
			setRenderReadyTimer(true);
			totalTime = newTimeTodo + (timer - seconds);
			if (currentUser) {
				saveTimeIntoTodo(selectedTodo, totalTime);
			} else if (!currentUser) {
				saveTimeIntoTodoUnregistered(selectedTodo, totalTime);
			}
			timerIsReadySound.play();
		} else if (seconds === 0 && runBreakTimer) {
			setRenderReadyTimer(true);
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
				<>
					<div className="full-screen-timer-ready">
						<div className="timer-round-div">
							<div className="timer-text">Done</div>
							<button
								className="timer-close-button"
								onClick={() => {
									setIsRunning(false);
									setRenderReadyTimer(false);
									setshowSecondTimer(false);
									setRunBreakTimer(false);
								}}
							>
								Close
							</button>
							<button
								onClick={() => {
									setIsRunning(true);
									setSeconds(6);
									setRenderReadyTimer(false);
									setRunBreakTimer(true);
									setSelectedTodo({
										title: "5 minutes break",
									});
								}}
							>
								5 minutes break
							</button>
							<button
								onClick={() => {
									setIsRunning(true);
									setSeconds(8);
									setRenderReadyTimer(false);
									setRunBreakTimer(true);
									setSelectedTodo({
										title: "5 minutes break",
									});
								}}
							>
								20 minutes break
							</button>
						</div>
						<div className="timer-task-name-area">
							<h2>Timer ready for: </h2>
							<h2>{selectedTodo.title}</h2>
						</div>
					</div>
				</>
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
								setshowSecondTimer(false);
								if (currentUser) {
									saveTimeIntoTodo(selectedTodo, totalTime);
								} else {
									saveTimeIntoTodoUnregistered(selectedTodo, totalTime);
								}
							}}
						>
							Stop
						</button>
						{/* these spans are for making circle waves when times is counting */}
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
