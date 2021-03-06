import React, { useState, useEffect } from "react";

import { Pie } from "react-chartjs-2";

const PieChart = ({ todosArray }) => {
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
		<Pie
			data={chartData}
			options={{
				responsive: true,
				// title: { text: "Time chart", display: true },
				plugins: {
					tooltip: {
						enabled: true,
						callbacks: {
							label: function (tooltipItems) {
								let chartHours = Math.floor(tooltipItems.raw / 3600)
									.toString()
									.padStart(2, "0");

								let chartMinutes = Math.floor(
									(tooltipItems.raw - Math.floor(tooltipItems.raw / 3600) * 3600) / 60
								)
									.toString()
									.padStart(2, "0");

								let chartSeconds = (tooltipItems.raw - Math.floor(tooltipItems.raw / 60) * 60)
									.toString()
									.padStart(2, "0");

								return ` ${tooltipItems.label} - ${chartHours}:${chartMinutes}:${chartSeconds}`;
							},
						},
					},
					legend: {
						display: false,
					},
				},
			}}
		/>
	);
};

export default PieChart;
