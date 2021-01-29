import React     from "react";
import PropTypes from "prop-types";

import { useSpring, useTransition, animated, config } from "react-spring";

const newText = (text) => ({ key : `${Date.now()}`, data : text });

const TextTransition = ({
	text,
	direction,
	inline,
	delay,
	className,
	style,
	noOverflow,
	springConfig
}) => {
	const placeholderRef              = React.useRef(null);
	const [content, setContent]       = React.useState(() => newText(text));
	const [timeoutId, setTimeoutId]   = React.useState(0);
	const [isFirstRun, setIsFirstRun] = React.useState(true);
	const [width, setWidth]           = React.useState({ width : inline ? 0 : "auto" });
	const transitions                 = useTransition(content, (item) => item.key, {
		from        : { opacity : 0, transform : `translateY(${direction === "down" ? "-100%" : "100%"})` },
		enter       : { opacity : 1, transform : "translateY(0%)" },
		leave       : { opacity : 0, transform : `translateY(${direction === "down" ? "100%" : "-100%"})` },
		config      : springConfig,
		immediate   : isFirstRun,
		onDestroyed : () => {
			setIsFirstRun(false);
		}
	});
	const { width: animatedWidth } = useSpring({
		to        : width,
		config    : springConfig,
		immediate : isFirstRun
	});
	React.useEffect(() => {
		setTimeoutId(
			setTimeout(() => {
				if (!placeholderRef.current) return;
				placeholderRef.current.innerHTML = text;
				if (inline) setWidth({ width : placeholderRef.current.offsetWidth });
				setContent(newText(text));
			}, delay)
		);
	}, [text]);

	React.useEffect(() => () => clearTimeout(timeoutId), []);

	return (
		<animated.div
			className={ `text-transition ${className}` }
			style={{
				...style,
				width      : animatedWidth,
				whiteSpace : inline ? "nowrap" : "normal",
				display    : inline ? "inline-block" : "block",
				position   : "relative"
			}}
		>
			<span ref={ placeholderRef } style={{ visibility : "hidden" }} className="text-transition_placeholder" />
			<div
				className="text-transition_inner"
				style={{
					overflow : noOverflow ? "hidden" : "visible",
					display  : "block",
					position : "absolute",
					top      : 0,
					left     : 0,
					height   : "100%",
					width    : "100%"
				}}
			>
				{
					transitions.map(({ item, props, key }) => (
						<animated.div key={ key } style={ { ...props, position : "absolute" } }>{ item.data }</animated.div>
					))
				}
			</div>
		</animated.div>
	);
};

TextTransition.propTypes = {
	text         : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	direction    : PropTypes.oneOf(["up", "down"]),
	inline       : PropTypes.bool,
	noOverflow   : PropTypes.bool,
	delay        : PropTypes.number,
	className    : PropTypes.string,
	style        : PropTypes.object,
	springConfig : PropTypes.any
};

TextTransition.defaultProps = {
	direction    : "up",
	noOverflow   : false,
	inline       : false,
	springConfig : config.default,
	delay        : 0,
	className    : "",
	style        : {}
};

export default TextTransition;