---
title: "⚓ Let's build a custom hook!"
date: 2019-07-23 07:21:45
category: 'development'
---

React give us some built-in hooks out of the box, like `useEffect`, `useRef` and `useContext`.
One of the reasons why **hooks** became so popular, it's because it allows you to share a specific state, logic, and functionality by creating your own set of customs hooks.

This post assumes you have a basic understanding of React Hooks. Otherwise, I would strongly suggest reading my previous post: [An introduction to React Hooks and useState](https://madd.dev/development/introduction_react_hooks_usestate/)

### 💪 Let's create our own reusable custom hook!

I'm going to use an `form` as example which is something that most web apps have and use multiple times, this translates into a great candidate for reusing state and logic.

### Regular implementation
First we are going to start by building our `Form` component by implementing the it's state and functionality from scratch.
```jsx
export default function() {
  const [ values, setValues ] = useState({})

  function postData(values) {
    //logic to post data
    console.table(values)
  }

  function handleChange(event) {
    const { name, value } = event.target
    event.persist()
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  function handleSubmit(){
    event.preventDefault()
    postData(values)
    //reset form values
    setValues({})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email || ''}
        required
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={values.password || ''}
        required
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```
We instantiated a new state object and it's updater function by calling `useState` with an empty object.

The functions `postData`, `handleSubmit` and `handleChange` is something would not be different from a class-based implementation that does not use `hook`. The only thing to note is that in `handleChange` we need to merge our `previousState` with the new state, something that was covered on the [previous post]((https://madd.dev/development/introduction_react_hooks_usestate/)).

This works and it's totally fine, but instead of having all of the state and functionality in here, we can extract those pieces to create a custom hook for ourselves that we can reuse in the future.

### useForm hook
Let's start by moving the state and the functions that we want to reuse to a new file. You can call this hook `useForm` or any other name that you want, just remember to use the word `use` at the beginning of the name, like: `useMyAwesomeHook`.

>This is a best practice suggested by the react team.

```jsx
import React, { useState } from 'react'

export const useForm = callback => {
  const [values, setValues] = useState({})

  const handleSubmit = event => {
    event.preventDefault()
    callback()
    setValues({})
  }

  const handleChange = event => {
    const { name, value } = event.target
    event.persist()
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  return {
    values,
    handleSubmit,
    handleChange,
  }
}
```
The result from calling `useForm` will return an object with the state (values), as well as the needed functions: `handleSubmit` and `handleChange`.

Notice that `useForm` takes a callback as an argument. With this, we can use any function that we want to execute on submitting just by passing it to `useForm`.

### Using the custom hook
Now we can import our custom hook and call it at the top level of our `Form` component, passing `postData` as a callback.
```jsx

import { useForm } from 'components/customHooks'

export default function() {
  const { values, handleSubmit, handleChange } = useForm(postData)

  function postData() {
    //my custom function to post the data
    console.table(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email || ''}
        required
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={values.password || ''}
        required
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```
Now you can do the same with any form that you want to build that matches these characteristics. Reusing `state` and `functionality` is a one of the most powerful thing about `hooks`, it enables you to write less code and  more modular code.

Hope you enjoyed reading, Happy hacking! 👻

Learn more about how to build your own [custom hooks](https://reactjs.org/docs/hooks-custom.html).
