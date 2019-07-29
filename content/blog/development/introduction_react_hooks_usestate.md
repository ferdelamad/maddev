---
title: '⚡ An introduction to React Hooks and useState'
date: 2019-07-22 07:32:13
category: 'development'
---

###📌 The Basics

Hooks are available in React since v16.8. It's a new and different way of using state and other React features without the need of class. Also, you may share this state/logic by writing custom and reusable hooks.

> We will call `useState` inside a function component to add some local state to it.

React will know about this state and it will preserve this state between re-renders.

```jsx
import React, { useState } from 'react'

const MyFunctionalComponent = () => {
  const myState = useState('')
}
```

When calling **useState** it's better to use array destructuring.

> useState only takes one argument, the initial state. useState returns an array,

- First element is the current state
- Second element is a function to update the state

```jsx
import React, { useState } from 'react'

const MyFunctionalComponent = () => {
  const [name, updateName] = useState('')
}
```

You can also use other arguments to initialize your state, like booleans, even an object or array.

```jsx
const MyFunctionalComponent = () => {
  const [isPlaying, updatePlaying] = useState(false)

  const [userSettings, updateUserSettings] = useState({
    userName: 'fermaddev',
    race: 'human',
    items: ['potion', 'blade', 'shield'],
  })
}
```

If `updatePlaying` or `updateUserSettings` gets called, React will know about the new state an will re-render the component.

### 📐 Rules

There are two main rules you should pay attention when using hooks:

- Hooks need to be call at the **top level**. Can't be call inside conditionals (if/else), loops or inside of nested functions.
- Used them **only** in functional components. Not on regular functions nor class components

> Read more about [React Hook Rules](https://reactjs.org/docs/hooks-rules.html)

###Tradional Class Component

```jsx
import React, { Component } from 'react'

export default class extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }

  handleClick = () =>
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))

  render() {
    return (
      <div>
        Class Count: {this.state.count}
        <button onClick={this.handleClick}>Increment!</button>
      </div>
    )
  }
}
```

### Functional Component Using Hooks

```jsx
import React, { useState } from 'react'

export default function() {
  //create initial state for count
  const [count, setCount] = useState(0)

  //you can pass an updater function to setCount (like in setState)
  //the updater function will have access to the previous state
  const handleClick = () => setCount(prevCount => prevCount + 1)

  return (
    <div>
      Count: {count}
      <button onClick={handleClick}>Increment!</button>
    </div>
  )
}
```

### 🤔 What if I want to use an Object or Array for my state?

The beauty of `useState` it can also accept an object or array as it's argument.

The only gotcha is that everytime that you call the updater function (in this example `setState`), the whole state wil be wiped out.
So we have to explicitly set the previous state and merge it with the new piece of state that has changed.

Let's re-build the React Class `setState` functionality using hooks!

```jsx
import React, { useState } from 'react'

export default function() {
  const [state, setState] = useState({})

  function handleChange(e) {
    e.persist()
    const { name, value } = e.target

    mergeState({ name: value })
  }

  function mergeState(newState) {
    setState(prevState => ({
      ...prevState,
      ...newState,
    }))
  }

  const { name, twitter, age } = state

  return (
    <div>
      <h3>Name: {name}</h3>
      <input type="text" name="name" onChange={e => handleChange(e)} />
      <h3>Twitter: {twitter}</h3>
      <input type="text" name="twitter" onChange={e => handleChange(e)} />
      <h3>Age: {age}</h3>
      <input type="number" name="age" onChange={e => handleChange(e)} />
    </div>
  )
}
```

Then, should I use an object to store all my state or have small pieces of space using `useState` multiple times?
**Answer:** It's up to you, whatever makes more sense for the component that you are building!

You can read more about React Hooks **[here](https://reactjs.org/docs/hooks-intro.html)**.

Hope you enjoyed reading, Happy hacking! 👻
