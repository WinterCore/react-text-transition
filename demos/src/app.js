import React            from "react";
import ReactDOM         from "react-dom";

import Demo from "./Components/Demo";

const render = (Component) => {
	ReactDOM.render(
		<Component />,
		document.getElementById("root")
	);
};

render(Demo);