---
title: '🧨 ES2019 features you can use now'
date: 2019-08-26 07:03:12
category: 'development'
---

Since we are already a little over the second half of the year, I thought it was a good time to do a quick recap of some of the new features that [\*\*ECMAscript](<**[https://en.wikipedia.org/wiki/ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)**>)\*\* brought us for 2019.
All of the following features are already on Stage 4 (Finished/Approved). You can go ahead a test them in the latest versions of Chrome and Firefox.

## ✅ Array.prototype. flat( ) & .flatMap( )

Without question `.flat` is my favorite addition to ES2019, no more using underscore or lodash for ~~.flatten~~ 🥳 🎉.

It takes an Array of arrays and it returns a new flattened Array.

**Example**

```js
const playMe = ['Will', 'Smith', ['gettin', 'jiggy'], 'with it'].flat()
// ['Will', 'Smith', 'gettin', 'jiggy', 'with it']
```

**Deep flattening**

By default `.flat` has a default deep level of 1, meaning it will only flatten the provided array going down 1 level.

It takes an optional `number` as an argument to specify how many levels you want to go deeper when flattening an Array.

```js
const someNums = [1, 2, [3, 4], [6, [7, 8, [9]]], 10]

const twoLevelsDeep = someNums.flat(2)
// [1, 2, 3, 4, 6, 7, 8, [9], 10]
const threeLevelsDeep = someNums.flat(3)
// [1, 2, 3, 4, 6, 7, 8, 9, 10]
```

**Using .flatMap( )**

The functionality of `.flatMap` it's a little bit different. First, It maps every element using the provided callback (mapping function) and afterwards, it will `flat` the result array with a depth of 1.

> In other words: It first maps, then flattens.

**Let's compare it with .map:**

```js
const awesomeGuys = [
  { firstName: 'Peter', lastName: 'Parker' },
  { firstName: 'Tony', lastName: 'Stark' },
  { firstName: 'Steven', lastName: 'Strange' },
  { firstName: 'Stan', lastName: 'Lee' },
]

const mapNames = awesomeGuys.map(user => Object.values(user))
// [["Peter", "Parker"], ["Tony", "Stark"], ["Stephen", "Strange"], ["Stan", "Lee"]]

const names = awesomeGuys.flatMap(user => Object.values(user))
// ["Peter", "Parker", "Tony", "Stark", "Stephen", "Strange", "Stan", "Lee"]
```

You may argue that you can chain `.map` and `.flat` to achieve the same functionally, but `.flatMap` is slightly more efficient when it comes to performance and cleaner implementation.

## ✅ Object.fromEntries

On previous releases of ECMAscript, a couple of new methods were added to objects.
Object.entries( ) was one of them, which takes an Object as an argument and returns and Array of arrays of the key-value pairs of the passed object.

**Using Object.entries( )**

```js
const coolDev = { name: 'Fernando', age: 33 }

const entriesOfCoolDev = Object.entries(coolDev)
// [['name', 'fernando'], ['age', 33]];
```

Based on that, you can think of **Object.fromEntries** as the "**_reverse_**" of Object.entries( ).

**Example**

```js
const norrisArray = [
  ['firstName', 'Chuck'],
  ['lastName', 'Norris'],
  ['twitter', '@chucknorris'],
]

const norrisObj = Object.fromEntries(norrisArray)
// { firstName: 'Chuck', lastName: 'Norris', twitter: '@nchucknorris' }
```

Object.fromEntries( ) takes an Array of arrays of key-value pairs and returns an object based on that.

**Passing other iterables**

It can also take an `iterable` as an argument. With that said it an `Array` , `Map` or any other object that implements the iterable protocol could be passed as an argument.

```js
const jobPosting = new Map()
jobPosting.set('title', '10x Engineer')
jobPosting.set('languages', 'All')
jobPosting.set('socialLife', null)
jobPosting.set('salary', '$10/hr')

const myDreamJob = Object.fromEntries(jobPosting)
// { title: "10x Engineer", languages: "All", socialLife: null, salary: "$10/hr" }
```

Learn more about [iterable protocol](<[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)>).

## ✅ String.prototype.trimStart( ) & .trimEnd( )

The `.trimStart( )` method removes all whitespace from the beginning of a string.
On the other hand `.trimEnd( )` will remove all the whitespace from the end of a string.

```js
const leftWhitespace = '                  L👀k at my left'
const righWhitespace = 'L👀k at my Right                 '

const noLeftWhitespace = leftNoise.trimStart()
// 'L👀k at my left'

const noRigtWhitespace = rightNoise.trimEnd()
// 'L👀k at my Right'
```

Something to remember is that both methods have an alias, `trimStart` is the same as `trimLeft`, the same with `trimEnd` and `trimRight`.

## ✅ Optional catch binding

Now you do not have to bind an `exception` variable to a catch (before it cased a `SyntaxError`).
This helps avoid linting issues with unused variables when you are not actually using the exception, either because you are using your own custom one or simply because you are executing a specific task that doesn't necessarily involve using it.

```js
// Before you needed to specify an error
try {
  ...
} catch(exception) {
  ...
}

// New optional way
try {
  ...
} catch {
  ...
}
```

Just as a side note, it is still considered the best practice to handle exceptions/errors properly in a try-catch block.

## ✅ Description for symbols (Symbol.prototype.description)

Symbols got some love as well, now they accept an optional description as an argument. A very quick refresh just in case you are not familiar with them, symbols are primitives in JavaScript. The `Symbol()` function guarantees to return a unique symbol value.
It's purpose it's to be used as an identifier for `Object` properties.

```js
const newSymbol = Symbol('ES2019 rules')
const regularSymbol = Symbol()

console.log(newSymbol.description)
// 'ES2019 rules'

console.log(regularSymbol.description)
// undefined
```

The only catch it's that the description it's only for debugging purposes.

**Comparing symbols**

```js
const mySym1 = Symbol('unique')
const mySym2 = Symbol('unique')
// Let's create two symbols with the same description

console.log(Sym1 == Sym2)
// returns 'false'
```

Like it was mentioned before, Symbols are guaranteed to be unique. Even if we create different symbols using the same description, they will be different values always.

If you are interested you read more about Symbols [here](<[https://developer.mozilla.org/en-US/docs/Glossary/Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol)>).

And that's it! I'm always curious about how people are using these new methods to solve real-world problems.
So, if you have any examples of how you are using them don't hesitate to tag me at Twitter [@fermaddev](<notion://www.notion.so/maddev/%5B%3Chttps://twitter.com/fermaddev%3E%5D(%3Chttps://twitter.com/fermaddev%3E)>) 👀.

Looking forward to the ES2020 updates 🔜!

Hope you enjoyed reading, Happy hacking! 👻
