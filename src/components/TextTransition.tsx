import React from "react";
import PropTypes from "prop-types";

import {useSpring, useTransition, animated, config, SpringConfig} from "react-spring";

const TextTransition: React.FC<TextTransitionProps> = (props) => {
    const {
        direction = "up",
        inline = false,
        springConfig = config.default,
		delay = 0,
        className,
        style,
        children,
    } = props;

    const initialRun = React.useRef(true);

	const transitions = useTransition([children], {
		from: { opacity : 0, transform : `translateY(${direction === "down" ? "-100%" : "100%"})` },
		enter: { opacity : 1, transform : "translateY(0%)" },
		leave: { opacity : 0, transform : `translateY(${direction === "down" ? "100%" : "-100%"})`, position: "absolute" },
		config: springConfig,
        immediate: initialRun.current,
		delay: ! initialRun.current ? delay : undefined,
	});

    const [width, setWidth] = React.useState<number | string>("auto");
    const currentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        initialRun.current = false;
    }, []);

    React.useEffect(() => {
        const elem = currentRef.current;

        if (! elem) {
            return;
        }
        
        const { width } = elem.getBoundingClientRect();
        setWidth(width);
    }, [children, setWidth, currentRef]);

    const widthTransition = useSpring({
		to: { width },
		config: springConfig,
        immediate: initialRun.current,
		delay,
    });

	return (
		<animated.div
			className={`text-transition ${className}`}
			style={{
                ...widthTransition,
				whiteSpace: inline ? "nowrap" : "normal",
				display: inline ? "inline-flex" : "flex",
				...style,
			}}
		>
            {transitions((styles, item) =>
                <animated.div style={{ ...styles }}
                              ref={item === children ? currentRef : undefined}
                              children={item} />
            )}
		</animated.div>
	);
};

interface TextTransitionProps {
	readonly direction?: "up" | "down";
	readonly inline?: boolean;
	readonly delay?: number;
	readonly springConfig?: SpringConfig;
	readonly className?: string;
	readonly style?: React.CSSProperties;
    readonly children: React.ReactNode;
}

TextTransition.propTypes = {
	direction: PropTypes.oneOf(["up", "down"]),
	inline: PropTypes.bool,
	delay: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object,
	springConfig: PropTypes.any,
};

export default TextTransition;
