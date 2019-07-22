---
title: 'React useState Hook'
date: 2019-07-29 07:32:13
category: 'development'
---

#React `useState` Hook

###📌 The Basics

> We will call `useState` inside a function component to add some local state to it.

React will know about this state and it will preserve this state between re-renders.

```jsx
  import React, { useState } from 'react';

  const MyFunctionalComponent = () => {
    const myState = useState('');
  }
```

When calling **useState** it's better to use array destructuring.

> useState only takes one argument, the initial state. useState returns an array,
 - First element is the current state
 - Second element is a function to update the state

```jsx
  import React, { useState } from 'react';

  const MyFunctionalComponent = () => {
    const [name, updateName] = useState('');
  }
```

You can also use other arguments to initialize your state, like booleans, even an object or array.
```jsx
  const MyFunctionalComponent = () => {

    const [isPlaying, updatePlaying] = useState(false);

    const [userSettings, updateUserSettings] = useState({
      userName: 'ferdelamad',
      race: 'Human',
      items: ['potion', 'blade', 'shield']
    });

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
import React, { Component } from 'react';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }

  handleClick = () => this.setState(prevState => ({
       count: prevState.count + 1
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
import React, { useState } from 'react';

export default function() {
  //create initial state for count
  const [ count, setCount ] = useState(0);

  //you can pass an updater function to setCount (like on setState)
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
Hope you enjoyed reading, Happy hacking! 👻
