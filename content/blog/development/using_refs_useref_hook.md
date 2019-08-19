---
title: '🏷 Using refs with useRef hook'
date: 2019-08-18 07:03:15
category: 'development'
---

In this article you will learn about the `useRef` hook.

If you are not familiar with **refs** in general, refs are primarily a way to **access the DOM** in React.

Think of refs like as a type of _tag_ that you put to a DOM node, in order to be able to track it's particular content.

### ✏️ Basic example of how we used refs before hooks:

```jsx
export default function() {
  //instantiate a new ref
  const myRef = React.createRef()

  const logRef = () => console.log('My ref content:', myRef)

  const addText = () => (myRef.current.innerText = 'Fernando')

  return (
    <>
      <div ref={myRef} />
      <button onClick={logRef}>Log ref!</button>
      <button onClick={addText}>Add value</button>
    </>
  )
}
```

We are passing a ref object to React when we do `<div ref={myRef} />` .

By doing this `myRef` will automatically have a `.current` property holding the content of the DOM node. It a property of the node changes, that change will also be reflected in `myRef`.

If you run the above code and click on _Log ref_ you will get this:

`{ current: div }`

Now, if you click on _Add value_ you will notice that _Fernando_ will be display and if you click _Log ref_ again and you inspect the object, you will notice that the `textContent` property now has the value of `Fernando`.

You can learn more about refs and the DOM in the official react [docs](https://reactjs.org/docs/refs-and-the-dom.html).

### ✍🏻Now let's refactor with hooks

The only thing that we have to do in order to refactor to use useRef is importing it from React and replacing `createRef` with `useRef`.

```jsx
import React, { useRef } from 'react'

export default function() {
  const myRef = useRef()

  const logRef = () => console.log('My ref content:', myRef)

  const addText = () => (myRef.current.innerText = 'Fernando with useRef')

  return (
    <>
      <div ref={myRef} />
      <button onClick={logRef}>Log ref!</button>
      <button onClick={addText}>Add value</button>
    </>
  )
}
```

When you instantiate a new **ref** with useRef, you create a brand new mutable JavaScript `object`.

> Think of **useRef** as a “container” that can store a **mutable** value in its `.current` property.

### 🗒 Using it in on a simple form

```jsx
import React, { useRef } from 'react'

export default function() {
  const nameRef = useRef()
  const emailRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    const {
      current: { value: name },
    } = nameRef
    const {
      current: { value: email },
    } = emailRef

    const data = { name, email }
    console.table(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input ref={nameRef} />
      </label>
      <label>
        Email:
        <input ref={emailRef} />
      </label>
      <button type="submit">Submit data!</button>
    </form>
  )
}
```

In this example we leverage both name and email refs, to get their `.current.value` in order to access the information that a user typed.

> Something to remember: Mutating the .current property from useRef it's not a change neither of the state or props, so this **won't** cause a re-render.

### 📥 Passing _refs_ from parent to child

The previous example of a basic form will work but, what if you want to pass _refs_ from parent to child 🤔. This approach won't work.

**Enter forwardRef**

In order to pass or _forward_ a ref from a parent to one of its children you need to use **forewarRef**.

> React docs note: This is typically not necessary for most components in the application. However, it can be useful for some kinds of components, especially in reusable component libraries.

```jsx
import React, { useRef, forwardRef } from 'react'

//Create a child component usign forewardRef
const StyledInput = forwardRef((props, ref) => (
  <input type="text" className="styled-input" ref={ref} />
))

export default function() {
  const nameRef = useRef()
  const emailRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    const {
      current: { value: name },
    } = nameRef
    const {
      current: { value: email },
    } = emailRef

    const data = { name, email }
    console.table(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name test!:
        <StyledInput ref={nameRef} />
      </label>
      <label>
        Email:
        <StyledInput ref={emailRef} />
      </label>
      <button type="submit">Submit data!</button>
    </form>
  )
}
```

React's forewardRef accepts a _callback_ that takes to arguments: **props** and **ref**.

This feature of react allows a _component_ to take a **ref** they receive, and pass it down to a child.

Hope you enjoyed reading, Happy hacking! 👻

**Read more about hooks:**

- [An introduction to React Hooks and useState](https://madd.dev/development/introduction_react_hooks_usestate/)
- [Let's build a custom hook!](https://madd.dev/development/react_custom_hook/)
- [Understand the useEffect hook](https://madd.dev/development/understand_effect_hook/)
