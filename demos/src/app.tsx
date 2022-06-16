import React from "react";
import {createRoot} from "react-dom/client";

import Demo from "./Components/Demo";

const render = (Component: React.FC<any>) => {
    const container = document.getElementById("root")!;
    const root = createRoot(container);
	root.render(<Component />);
};

render(Demo);
