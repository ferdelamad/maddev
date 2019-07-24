---
title: 'React useRef Hook'
date: 2019-07-23 07:21:45
category: 'development'
---

### ⚓ Let's build a custom hook!

### useForm hook
```jsx
import React, { useState } from 'react';

const useForm = callback => {

  const [values, setValues] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    callback();
    //reset form values
    setValues({});
  }

  const handleChange = event => {
    const { name, value } = event.target;
    event.persist();
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  return {
    values,
    handleSubmit,
    handleChange
  }
};
```

### Using the custom hook
```jsx
  export default function() {
  const { values, handleSubmit, handleChange } = useForm(postData);

  function postData() {
    console.table(values);
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
