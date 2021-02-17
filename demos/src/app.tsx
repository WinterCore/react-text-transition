import * as React            from "react";
import * as ReactDOM         from "react-dom";

import Demo from "./Components/Demo";

const render = (Component: React.FC<any>) => {
	ReactDOM.render(
		<Component />,
		document.getElementById("root")
	);
};

render(Demo);