import React from "react";

import Timer2 from "../components/Timer2";

const MainRight = (todosArray) => {
	return (
		<div className="main-right">
			<Timer2 todosArray={todosArray} />
		</div>
	);
};

export default MainRight;
