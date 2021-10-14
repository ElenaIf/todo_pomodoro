import React, { useState, useEffect } from "react";

import { Pie } from "react-chartjs-2";

import "../style/css/PieChart.css";

const PieChart = ({ setTodosArray, todosArray }) => {
	const [chartData, setChartData] = useState({});
	let secondsArray = [];
	let labelsArray = [];
	let colorsArray = [];

	todosArray.forEach((todo) => {
		secondsArray.push(todo.timeSpent);
	});

	todosArray.forEach((todo) => {
		labelsArray.push(todo.title);
	});

	todosArray.forEach((todo) => {
		colorsArray.push(todo.color);
	});

	const chart = () => {
		setChartData({
			labels: labelsArray,
			datasets: [
				{
					label: "level of smth",
					data: secondsArray,
					backgroundColor: colorsArray,
					borderWidth: 0,
				},
			],
		});
	};

	useEffect(() => {
		chart();
	}, [todosArray]);

	return (
		<div className="pie-area">
			<Pie
				data={chartData}
				options={{
					responsive: true,
					title: { text: "Time chart", display: false },
					plugins: {
						legend: {
							display: false,
						},
					},
				}}
			/>
		</div>
	);
};

export default PieChart;
