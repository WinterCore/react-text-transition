import React from "react";

import TextTransition, { presets } from "../../../src";

const WORDS = [
	"React",
	"Webpack",
	"Babel",
	"ReactDOM",
	"Vue",
	"Angular",
	"jQuery",
	"ESLint"
];

const Demo: React.FC = () => {
	const [number, setNumber]       = React.useState(0);
	const [oldNumber, setOldNumber] = React.useState(0);
	const [index, setIndex]         = React.useState(0);

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setNumber((oNumber) => {
				setOldNumber(oNumber);
				return Math.round(Math.random() * 100000);
			});
			setIndex((i) => i + 1);
		}, 2000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="center">
			<div>
				<TextTransition
					inline
					className="transition-text"
					springConfig={presets.wobbly}
				>
                    {WORDS[index % WORDS.length]}
                </TextTransition>
				&nbsp;is awesome
			</div>
			<p />
			<p />
			<TextTransition
				inline
				className="transition-text"
				delay={200}
				direction={number > oldNumber ? "up" : "down"}
				springConfig={{ mass: 1, tension: 280, friction: 5 }}
			>
                {number}
            </TextTransition>
		</div>
	);
};

export default Demo;
