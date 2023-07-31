import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';

import { SpringConfig, animated, config, useSpring, useTransition } from '@react-spring/web';
import { useDebouncedCallback } from 'use-debounce';

export interface TextTransitionProps {
  className?: string;
  delay?: number;
  direction?: 'up' | 'down';
  inline?: boolean;
  resizeDebounceMs?: number;
  springConfig?: SpringConfig;
  style?: CSSProperties;
  translateValue?: string;
}

function TextTransition(props: PropsWithChildren<TextTransitionProps>) {
  const {
    direction = 'up',
    inline = false,
    resizeDebounceMs = 50,
    springConfig = config.default,
    delay = 0,
    className,
    style,
    translateValue: tv = '100%',
    children,
  } = props;

  const initialRun = useRef(true);
  const fromTransform = direction === 'down' ? `-${tv}` : tv;
  const leaveTransform = direction === 'down' ? tv : `-${tv}`;

  const transitions = useTransition([children], {
    enter: { opacity: 1, transform: 'translateY(0%)' },
    from: { opacity: 0, transform: `translateY(${fromTransform})` },
    leave: {
      opacity: 0,
      transform: `translateY(${leaveTransform})`,
      position: 'absolute',
    },
    config: springConfig,
    immediate: initialRun.current,
    delay: !initialRun.current ? delay : undefined,
  });

  const [width, setWidth] = useState<number>(0);
  const currentRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<number | string>('auto');

  const onResize = useCallback(() => {
    const element = currentRef.current;

    // If element doesn't exist, then do nothing
    if (!element) return;

    const { width, height } = element.getBoundingClientRect();

    setWidth(width);
    heightRef.current = height;
  }, [setWidth, currentRef]);

  useEffect(() => {
    initialRun.current = false;
    onResize();
  }, [children, onResize]);

  const resizeHandler = useDebouncedCallback(onResize, resizeDebounceMs);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  const widthTransition = useSpring({
    to: { width },
    config: springConfig,
    immediate: initialRun.current,
    delay: !initialRun.current ? delay : undefined,
  });

  return (
    <animated.div
      className={`text-transition ${className}`}
      style={{
        ...(inline && !initialRun.current ? widthTransition : undefined),
        ...style,
        whiteSpace: inline ? 'nowrap' : 'normal',
        display: inline ? 'inline-flex' : 'flex',
        height: heightRef.current,
      }}
    >
      {transitions((styles, item) => (
        <animated.div
          style={{ ...styles }}
          ref={item === children ? currentRef : undefined}
          children={item}
        />
      ))}
    </animated.div>
  );
}

export default TextTransition;
