---
title: "💅 Styled Components Mixin"
date: 2020-05-25 13:26:12
category: "development"
---

Before the usage of `Styled Components` in web development, chances are that you used some kind of preprocessor like Sass to write the css of your application.
On of the things that Sass is really good, is automating styles and productivity with `mixins`.

Mixins are basically a group of styles that will want to reuse either in the current application that you are building or in future projects.
They can be as simple and as complex as you need them to be.

If right now you are using Styled Components, you may have wonder if and how to have mixins using them.
We'll cover how to make your own custom mixins with Styled Componets and even give you a couple of recipes of useful mixins for most projects.

### 🖌️ Basic usage

We'll start by implementing a mixin for `box-shadow` something that is very likely to get reused.

```jsx
const baseShadow = `
  box-shadow: 0 10px 6px -6px #777;
`;
```

In order to "inject" the needed css we need to use `template strings` which is what you normal use when writing styled components.

Now you can easily implement this in any styled component that you have in your app.

```jsx
const Container = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
  ${baseShadow}
`;
```

And that's pretty much it! Now you have created your first mixin with styled componets.

But is possible to improve this mixin 🤔?

## 🎨 CSS helper

There are multiple enhancements that we can do to this implementation, first right now we will not have the css highlights in the block definition.

For this we will need to use the `css` helper function from styled components and install the [vscode-styled-components]([https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)) extension.

Now we can refactor our code like this:

```jsx
import { css } from 'styled-components';

const baseShadow = css`
  box-shadow: 0 10px 6px -6px #777;
`;
```

**CSS - Styled Components docs:**
*A helper function to generate CSS from a template literal with interpolations.
You need to use this if you return a template literal with functions inside an interpolation due to how tagged template literals work in JavaScript.
If you're interpolating a string you do not need to use this, only if you're interpolating a function.*

But we are not interpolating our string, so why should we use the `css` helper?
The answer is `props` 🎉.

We can make this mixin a little bit more flexible by taking a color prop in order make the color of the box-shadow dynamic:

```jsx
const baseShadow = css`
  box-shadow: ${({ color }) => `0 10px 6px -6px ${color || "#777"}`};
`;
```

This may seem a little funky at first, but this is how you access `props` in styled components. Also color is being destructured for better readability.
Is the same as doing:

```jsx
const baseShadow = css`
  box-shadow: ${props => `0 10px 6px -6px ${props.color || "red"}`};
`;
```

Now when you use the `baseShadow` mixin in a styled component, it will automatically have access to the component props:

```jsx
const Container = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
  ${baseShadow}
`

const App = () => (
  <Container color="purple">
   <h1>Using box shadow mixin! 🧙</h1>
  </Container>
);
```

If you want to explicitly set the props the mixin will have to  become a regular JavaScript function returning a `template string`:

```jsx
const font = ({ color, size, family }) => `
  color: ${color || "red"};
  font-size: ${size || "1rem"};
  font-family: ${family || "Helvetica neue"};
`;
```

Then the final product will look like this:

```jsx
import React from "react";
import styled, { css } from "styled-components";

// inheriting props
const baseShadow = css`
  box-shadow: ${({ color }) => `0 10px 6px -6px ${color || "#777"}`};
`;

// explicitly setting props
const font = ({ color, size, family }) => `
  color: ${color || "red"};
  font-size: ${size || "1rem"};
  font-family: ${family || "Helvetica neue"};
`;

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
  ${baseShadow}
  ${font({ color: "green", size: "2rem" })};
`;

export default function App() {
  return (
    <Container color="purple">
      <h1>Using box shadow mixin! 🧙</h1>
    </Container>
  );
}
```
You play around with the live version of the code **[here](https://codesandbox.io/s/styled-components-mixins-cloyi)**.


# 🍳 Mixin recipes

There are some common `css` recipes that you can reuse in your apps:

### Font in rem units

```jsx
const rem = (size, base = 16) => `
  font-size: ${size}px; // older browsers fallback
  font-size: calc(${size / base} * 1rem);
`;
```

### Center block

```jsx
const centerBlock = `
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
```

### Dimensions

```jsx
const wh = (w, h = w) => `
  width: ${w};
  height: ${h};
`;
```

Hope you enjoyed learning about mixins and the css helper in Styled Components.
Happy hacking! 👻
