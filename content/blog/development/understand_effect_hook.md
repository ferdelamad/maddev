---
title: '🔥 Understand the effect hook'
date: 2019-08-04 12:03:15
category: 'development'
---

If you are new to React Hooks, I would strongly suggest to start first with [An introduction to React Hooks and useState](https://madd.dev/development/introduction_react_hooks_usestate/).

### 💥 Breaking useEffect down

- `useEffect` tells `React` that your component needs to do something **after** render.
- By default `useEffect` will run both after the **first render** and after **every render**.
- `useEffect` takes a function as it's first argument were you provide your custom logic to be executed.
- Think of `useEffect` hook as a combination of `componentDidMount`, `componentDidUpdate` and `componentWillMount` (pretty neat right?).

> In other words **useEffect** it's like a watcher that will be executed on mount/unmount or any change of state/props by default.

### 📙 Basic Example

```jsx
import React, { useState, useEffect, Fragment } from 'react'

export default function() {
  const [name, setName] = useState('')

  useEffect(() => {
    document.title = `Hi my name is: ${name}`
  })

  return (
    <Fragment>
      Name: {name}
      <label>
        Set a new name:
        <input type="text" onChange={e => setName(e.target.value)} />
      </label>
    </Fragment>
  )
}
```

Right now we are calling `useEffect` on **every render**, which if we had more pieces of state or props changing will not be very efficient right? We would be triggering ans effect that it's only needed when `name` changes.
We will talk about _optimization_ so bare with me.

> Something to remember: Effects scheduled with useEffect don’t block the browser from updating the screen.

### 📞 Calling it only once

We can do the same operations that we would normally do inside of `componentDidMount`, like fetching data.

```jsx
import React, { useState, useEffect, Fragment } from 'react'

export default function() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log(`I was called only once!`)

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setUsers(users))
  }, [])

  return (
    <Fragment>
      {users.map(todo => (
        <p>Username: {todo.username}</p>
      ))}
    </Fragment>
  )
}
```

If you look closely you will notice that we passed an **empty array** as a second argument of `useEffect`.
This is how you only execute an effect and clean it up only once (when the component is mounted and unmounted), by passing an empty array [ ] as a second argument.
In the following example shows how to trigger `useEffect` conditionally, only when certain **values** change.

An empty array tells React that your effect doesn’t depend on any values neither from _state_ or _props_, so it never needs to be called again.

### 🕒 Separation of concerns and optimization

In the first article of this series it was shown how `useState` could be called more than once. Well, you can do the same with `useEffect` and use several effects in the same component.

This allows us to separate concerns better by separating logic into different effects.

> _Something to remember:_ Hooks let us split the code based on what it is doing rather than a lifecycle method name. React will apply every effect used by the component, in the order they were specified.

```jsx
export default function() {
  const [count, setCount] = useState(0)

  const [name, setName] = useState('')

  useEffect(() => {
    console.log(`I was called because ${count} changed!`)
    document.title = `You clicked ${count} times`
  }, [count])

  useEffect(() => {
    console.log(`I was called because ${name} changed!`)
  }, [name])

  return (
    <Fragment>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
      <div>
        Name: {name}
        <label>
          Seta a new name:
          <input type="text" onChange={e => setName(e.target.value)} />
        </label>
      </div>
    </Fragment>
  )
}
```

If you run this example, you will notice how the first `useEffect` it's only logged when **count** changes. Same thing with the second one, it will logged until **name** changes.

On the second argument, which is an array, we pass only the values that when changed will trigger the effect.

##### 🤔 How does it work?

Let's say that **count** is 2 and **name** changes causing our component to re-render, **count** will still be 2 so React will compare the _previous count_ [2] vs. the _current count_ [2].
Because the value is the same (5 === 5), React will not execute the effect, it will **skip** the effect, optimizing the execution.

If **count** changes to 3, React will compare the items in the [2] array from the previous render to items in the [3] array from the next render.
Since the values are different (2 !== 3) the effect will be executed.

> If there are multiple items in the array, React will re-run the effect even if just one of them is different.

### 🧹 Clean up (componentWillUnmount)

Before when using a `class` if you wanted to remove/cleanup when a component was unmounted, you needed to use `componentWillUnmount`.
One of the nice things about `useEffect` is that the cleanup can be performed in the same effect.

```jsx
export default function({ handleScroll }) {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return <h1>Example of cleaning up after component unmounts</h1>
}
```

Optionally, `useEffect` returns a function that React **will run** when the component is **unmounted**.
You can use that function to perform any necessary cleanup.

Hope you enjoyed reading, Happy hacking! 👻

**Read more about hooks:**

- [An introduction to React Hooks and useState](https://madd.dev/development/introduction_react_hooks_usestate/)
- [Let's build a custom hook!](https://madd.dev/development/react_custom_hook/)
- [ Official useEffect docs](https://reactjs.org/docs/hooks-effect.html)
