# React-Text-transition
Animate your text changes
![text-transition](https://raw.githubusercontent.com/WinterCore/react-text-transition/master/example-gifs/example.gif)
## Installation
```npm install react-text-transition```
## How to use

### Example
```javascript
import React, { Component } from "react";
import TextTransition       from "react-text-transition";

class App extends Component {
  static texts = [
    "Forest",
    "Building",
    "Tree",
    "Color"
  ];

  state = { active : 0 };

  componentDidMount() {
    setInterval(() => {
      this.setState({ active : this.state.active++ });
    }, 5000);
  }

  render() {
    return (
      <h1>
        <TextTransition
          text={ App.texts[this.state.active % App.texts.length] }
        />
      </h1>
    );
  }
}
```

### Props
| Prop | Type | Default | Definition |
| --- | --- | --- | --- |
| text | String | REQUIRED | The text you want to show. |
| order | Number | 0 | Used to determine the direction of the transition. |
| inline | Boolean | false | Makes the wrapper inline (will auto resize based on contents). |
| delay | Number | 0 | Delay the transition of the text (in milliseconds). |
| spring | Object | { stiffness : 170, damping : 26 } | React-Motion's spring configuration. |
| overflow | Boolean | false | Sets css's overflow property to hidden on the wrapper. |
| className | String | "" | Any css classes that you might want to send to the wrapper. |
| style | Object | {} | Any styles that you might want to send to the wrapper. |

___

### Detailed Props
* #### text ```String```
    Changing this prop is what triggers the transition animation.
* #### order ```Number```
    Used to determine the direction from which the new text is shown.
    if the order of the new text is bigger than the one before it, the transition will be **bottom-to-top**,
    this is the default transition it'll be used if no ```order``` prop was provided,
    and the opposite happens if the order of the new text is less than the one before it, aka **top-to-bottom**.
* #### inline ```Boolean```
    Will simply make the wrapper an inline element and animate its width based on currently showing text, this is useful if you want to show some other static text on the same line.
* #### delay ```Number```
    The amount of miliseconds to wait before transitioning.
* #### spring ```Object```
    React-Motion's [Spring configuration](https://github.com/chenglou/react-motion#helpers), you can also use the [Spring Parameters Chooser](http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser) to help you pick your preferred spring config.
    React-Motion's spring presets for ```{stiffness, damping}``` are provided with the plugin.
    ```javascript
      import TextTransition, { presets } from "react-text-transition";

      // in your render method
      <TextTransition
        text={ this.state.text }
        spring={ presets.wobbly }
      />
    ```
    There're 4 presets
    * ```noWobble``` The default.
    * ```gentle```
    * ```wobbly```
    * ```stiff```
* #### overflow ```Boolean```
    Setting this property to true will make the text appear clipped while the transition happens (takes less area), it will simply set overflow to hidden on the animation wrapper.
* #### className
    Any css classes that you might want to provide to the wrapper.
* #### style
    Any css styles that you might want to provide to the wrapper.

## TODO
  Add demos everywhere (for each one of the props).
  Improve the documentation.
## NOTE
  Feel free to ask any questions about using this plugin.
  This plugin requires [react](https://www.npmjs.com/package/react) to be installed.
