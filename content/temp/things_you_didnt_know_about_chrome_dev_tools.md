---
title: "🔧 Things you didn't know about Chrome Dev Tools"
date: 2019-08-26 07:03:12
category: 'development'
---

As a web developer and especially as front-end, you spend a lot of time on browsers, either debugging, inspecting, editing, trying things, etc.
That's why it is very valuable to know your tools and try to get the most out of them. As engineers, we tend to use keyboard shortcuts and methods to create better processes for our daily tasks.

I've improved my debugging and editing process while in the browser using this simple but yet powerful features of Chrome Dev Tools and I'm sure you will to, let's dive into it!

### 📌 Referencing DOM Nodes

You can store a reference of the last 5 DOM nodes inspected using the `elements` panel.
The `$0` contains the most recent inspected node, `$1` the next most recent and so on.
I end up using all 5 references usually when I am working on a layout, it is truly a very useful feature.

![](./images/cdt/cdt00.gif)

You can also store the reference in a variable and access any property of that node:

```js
const p = $0
// contains <p>...</p>

p.offsetHeight
// 60

p.classList
// ['my-p-class']
```

### 📍 Reference a last inspected React element in the console

You can do something very similar when combining React Dev Tools. The reference to the most recent inspect node in RDT, can be accessed by using `$r`.

![](./images/cdt/cdt01.gif)

Having that reference allows you to inspect the element `props` and `methods`.

### 🔑 Get keys or values of an object

Chrome Dev Tools give us an "alias" for Object.keys( ) and Object.values( ):

- `keys( )` : Returns an array of the names of the properties of the specified object.
- `values( )` : Returns an array of the values of the specified object.

**Example:**

```js
const obj = { name: 'Fernando', twitter: '@fermaddev' }

keys(obj)
// ["name", "twitter"]

values(obj)
// ["Fernando", "@fermaddev"]
```

Pretty neat right? I find this extremely helpful when trying to inspect nested objects from an API response.

> Something to remember: These methods belong to the Chrome console, if you try to use them in your `scripts` it will throw a Syntax error.

**Let's look at another example combining this with React Dev Tools again**

![](./images/cdt/cdt02.gif)

### 🏷 \$\_ Reference the return value of the last expression

Using `$_` will give you access to the value of the last evaluated expression.

**Example:**

```js
4 + 5
// 9
$_ + 1
// 10
```

This feature can be a time saver when testing functions and it's returned values in the console or when inspecting a complex data structure that has many nested levels.

### ✂️ Shortcut for document.querySelector

If you are familiar with jQuery which is very likely, you will recognize the syntax right away. The `$(selector)` is an alias for document.querySelector( ).
It returns the **first** DOM element in the document that has the provided CSS selector.

**Example:**

```js
const firstTitle = console.log($('h3').innerText)
```

You can also `right-click` the element and select **"Reveal in Elements Panel"** to view the element in the DOM tree.

![](./images/cdt/cdt05.gif)

### 🛹 Shortcut for document.querySelectorAll

The `$$(selector)` is an alias for document.querySelectorAll( ). It will return an array of all the elements in the document that have the specified CSS selector.

**Example:**

```js
const titles = $$('h3')

for (each in titles) {
  // log every string of all h3's
  console.log(titles[each].innerText)
}
```

![](./images/cdt/cdt03.gif)

> Something to remember: If you are using jQuery in your project and it's using `$` , this functionality will be overwritten and it will correspond to jQuery's implantation.

### 🧲 Copy from the console

The `copy( )` command takes an `object` and creates a stringified version and adds it to the clipboard.

```js
copy($('img').src)

copy($('h1').innerText)

// get data from your local storage
copy(localStorage.getItem('todos'))
```

Now you can **paste** the result of the last operation anywhere you like.

Quick tip, if you are testing an API and the client is storing the token in `localStorage` you copy that token with `copy(localStorage.getItem('my_token'))` and use its value with tools like Postman to send requests to the API with your token.

### 💁‍ Pretifying code { }

Most of us are probably working with some kind of JavaScript compiler like Webpack that will **minify** your code before shipping your it to production.

> Minification refers to the process of removing unnecessary or redundant data without affecting how the resource is processed by the browser

While this can provide many advantages, it can also lead to your being really hard to read and debug.
If you are looking for something to "transform" that code into something more readable, `Pretty Print` will be one of your most-used features of Chrome Dev Tools.

![](./images/cdt/cdt04.gif)

There are many other interesting and useful features that Chrome Dev Tools provide to us, feel free to comment which other features do you use more often or how do you use the ones mentioned in this article to solve other problems.

To be honest I can't see myself debugging a website without using CDT.

Hope you enjoyed reading, Happy hacking! 👻
