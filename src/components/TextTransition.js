import React, { PureComponent }     from "react";
import PropTypes                    from "prop-types";
import {
	TransitionMotion,
	Motion,
	spring
}                                   from "react-motion";

import "./text-transition.styl";

const newText = text => [{ key : `${Date.now()}`, style : { opacity : 1, top : 0 }, data : text }];

class TextTransition extends PureComponent {
	constructor(props) {
		super();
		this.state = {
			texts : newText(props.text),
			width : 0
		};

		this.timeout       = 0;
		this.initialRender = true;

		this.willLeave     = this.willLeave.bind(this);
		this.willEnter     = this.willEnter.bind(this);

		this.renderStuff   = this.renderStuff.bind(this);
	}

	componentDidMount() {
		this.setWidth(this.props.text);
	}

	componentWillReceiveProps({ order, text }) {
		if (text !== this.props.text) {
			this.direction = order < this.props.order;
			this.timeout = setTimeout(() => {
				this.setWidth(text);
				this.setState({ texts : newText(text) });
			}, this.props.delay);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	setWidth(text) {
		this.placeholder.innerHTML = text;
		if (this.props.inline) this.setState({ width : this.placeholder.offsetWidth });
	}

	willLeave() {
		return {
			opacity : spring(0, this.props.spring),
			top     : spring(this.direction ? 70 : -70, this.props.spring)
		};
	}

	willEnter() {
		return {
			opacity : 0,
			top     : this.direction ? -70 : 70
		};
	}


	renderStuff({ width } = {}) {
		return (
			<span
				className={ `text-transition ${this.props.className}` }
				style={{
					display    : this.props.inline ? "inline-block" : "block",
					width      : width || "100%",
					whiteSpace : this.props.inline ? "nowrap" : "normal",
					height     : this.props.inline ? "auto" : "100%",
					...this.props.style
				}}
			>
				<span ref={ (elem) => { this.placeholder = elem; } } className="placeholder" />
				<TransitionMotion
					willLeave={ this.willLeave }
					willEnter={ this.willEnter }
					styles={
						this.state.texts.map(item => ({
							...item,
							style : {
								opacity : spring(item.style.opacity, this.props.spring),
								top     : spring(item.style.top, this.props.spring)
							}
						}))
					}
				>
					{interpolated => (
						<div
							className="text-transition-inner"
							style={{ overflow : this.props.overflow ? "visible" : "hidden" }}
						>
							{interpolated.map(config => (
								<div
									className="text"
									key={ config.key }
									style={{
										opacity : config.style.opacity,
										top     : `${config.style.top}%`
									}}
								>
									{ config.data }
								</div>
							))}
						</div>
					)}
				</TransitionMotion>
			</span>
		);
	}

	render() {
		return this.props.inline ? (
			<Motion style={{ width : spring(this.state.width, this.props.spring) }}>
				{ this.renderStuff }
			</Motion>
		) : this.renderStuff();
	}
}


TextTransition.propTypes = {
	text      : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	order     : PropTypes.number,
	inline    : PropTypes.bool,
	delay     : PropTypes.number,
	className : PropTypes.string,
	style     : PropTypes.object,
	overflow  : PropTypes.bool,
	spring    : PropTypes.shape({
		stiffness : PropTypes.number,
		damping   : PropTypes.number
	})
};

TextTransition.defaultProps = {
	order     : 0,
	inline    : false,
	spring    : { stiffness : 170, damping : 26 },
	overflow  : false,
	delay     : 0,
	className : "",
	style     : {}
};

export default TextTransition;