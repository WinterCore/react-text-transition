# React-Text-transition

### Animate your text changes

![text-transition](https://raw.githubusercontent.com/WinterCore/react-text-transition/master/example-gifs/example.gif)

[![Edit r03264p26n](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-text-transition-ts-6wp1s7?file=/src/components/App.tsx)

## Installation

`npm install -S react-text-transition`

## Using the demo

`npm run dev`

## How to use

### Example

```javascript
import React from 'react';
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Forest', 'Building', 'Tree', 'Color'];

const App = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <h1>
      <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h1>
  );
};
```

### Props

| Prop         | Type                | Default                                 | Definition                                                                                              |
| ------------ | ------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| direction    | String (enum)       | 0                                       | Used to determine the direction of the transition `"up"` or `"down"` (Must be an all-lowercase string). |
| inline       | Boolean             | false                                   | Makes the wrapper inline (will auto resize based on contents).                                          |
| delay        | Number              | 0                                       | Delay the transition of the text (in milliseconds).                                                     |
| springConfig | Object              | { mass: 1, tension: 170, friction: 26 } | react-spring's spring configuration.                                                                    |
| className    | String              | ""                                      | Any css classes that you might want to send to the wrapper.                                             |
| style        | React.CSSProperties | {}                                      | Any styles that you might want to send to the wrapper.                                                  |
| children     | React.ReactNode     | REQUIRED                                | The react node to be animated                                                                           |
| translateValue     | string     | "100%"                                | Transform value for determine height animation                                                                           |

---

### Detailed Props

#### inline `Boolean`

Will simply make the wrapper an inline element and animate its width based on currently showing
text, this is useful if you want to show some other static text on the same line.

#### delay `Number`

The amount of miliseconds to wait before transitioning.

#### spring `Object`

react-spring's [Spring configuration](https://www.react-spring.io/docs/hooks/api) (Refer to the
configs section) react-spring's spring presets are exposed as `presets`.

```javascript
import TextTransition, { presets } from 'react-text-transition';

// in your render method
<TextTransition springConfig={presets.wobbly}>{this.state.text}</TextTransition>;
```

You have the following presets

- `default` The default.
- `gentle`
- `wobbly`
- `stiff`
- `slow`
- `molasses`

#### className `String`

Any css classes that you might want to provide to the wrapper.

#### style `React.CSSProperties`

Any css styles that you might want to provide to the wrapper.

## NOTE

Feel free to ask any questions about using this component. This plugin requires
[react](https://www.npmjs.com/package/react) +16.8
