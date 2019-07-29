---
title: "⚓ Let's build a custom hook!"
date: 2019-07-23 07:21:45
category: 'development'
---

React give us some built-in hooks out of the box, like `useEffect`, `useRef` and `useContext`.
One of the reasons why Hooks became so popular, it's because it allows you to share a specific state,logic and functionality by creating your own set of customs hooks.

This post assumes you have a basic understanding of React Hooks. Otherwise I would strongly suggest to read my previous post: [An introduction to React Hooks and useState](https://madd.dev/development/introduction_react_hooks_usestate/)


### 💪 Let's create our own reusable custom hook!

I'm going to use a `form` as example which is something that most web apps have and use multiple times, which is a great example for reusing state and logic.

### Regular implemantation
This it how we can create a `Form` component using hooks. But, instead of having all of the state and logic in here, we can extract those pieces to create a custom hook for ourselves that we can reuse in the future.
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

### useForm hook
First, let's start by extractoing the state and the functionality that we want to reuse.
```jsx
import React, { useState } from 'react'

const useForm = callback => {
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

### Using the custom hook
Now we can import our custom hook and call it at the top level of our Form component.
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
Now do the same with any form that you want to build that matches these characteristics. This is a one of the best things about `hooks`.

Hope you enjoyed reading, Happy hacking! 👻

Learn more about how to build your own [custom hooks](https://reactjs.org/docs/hooks-custom.html).
