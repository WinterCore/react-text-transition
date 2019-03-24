import React, {
	Component,
	Fragment
}              from "react";
import { hot } from "react-hot-loader";

import TextTransition from "../../../src/components/TextTransition";

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

class Demo extends Component {
	state = {
		index : 0
	};

	textInterval = 0;

	componentDidMount() {
		this.textInterval = setInterval(() => this.setState({ index : this.state.index + 1 }), 200);
	}

	componentWillUnmount() {
		clearInterval(this.textInterval);
	}

	render() {
		return (
			<Fragment>
				<div className="center">
					<div>
						<TextTransition
							text={ WORDS[this.state.index % WORDS.length] }
							className="transition-text"
							overflow
							inline
						/> What is this
					</div>
				</div>
			</Fragment>
		);
	}
}

export default hot(module)(Demo);