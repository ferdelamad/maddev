---
title: "🧬 Iterators and Iterables in JavaScript"
date: 2019-09-23 08:33:17
category: 'development'
---

After a couple of weeks of diving deep into `Iterators`, I realized about all the other surrounding topics that needed to be refreshed/learned in order to get a really good grasp of them.
That why I decided to write about iterators because in order for you to fully understand them you have to learn other key concepts of JavaScript as a language.

Things that you will learn about on this post:
* Iterators
* Iterables
* Iterator protocol
* Iterable protocol
* For… of loops
* Create your own iterator
* How destructuring works

## 🤷🏻‍ What are iterators in JavaScript?

You can think about **iterators** as a loop that it’s being contained within a JavaScript **object** and that only goes to the next iteration when you specifically decide to do so by calling it’s `.next( )` method and every time that you call this method it will return an object with the following properties:
```js
{ value: 'current iteration value', done: false }
```

You can keep calling the iterator .next( ) method until you exhausted all it’s values, only then it’s return value will look like this:
```js
{ value: undefined, done: true }
```

We say that we exhausted or consumed the iterator because it is generally only possible to do it once. This is one of the main caveats about iterators.

The following example illustrates how iterators work under the hood. This might seem confusing at first but I think it’s important to quickly visualize the core structure behind them and what a better way than creating our own first basic iterator:

```js
function helloWorldIterator() {
  let step = 0;
  const iterator = {
    next() {
      if (step === 0) {
        step++;
        return { value: 'Hello', done: false };
      } else if (step === 1) {
        step++;
        return { value: 'world! ', done: false };
      } else if (step === 2) {
        step++;
        return { value: 'Just built my first iterator', done: false };
      }

      return { value: undefined, done: true }
    }
  }
  return iterator;
}
```

To summarize the code, `helloWordIterator` it’s a function that returns an object (iterator), that object has a .next( ) method which can generate 3 different values, after all, values have been exhausted then the return value would be an object with the properties of value `undefined` and done `false`.

Now let’s use our brand new iterator:

```js
const iterator = helloWorldIterator();

iterator.next() //first return value
{ value: "Hello", done: false }

iterator.next()
{ value: "world! ", done: false }

iterator.next()
{ value: "Just built my first iterator", done: false }

iterator.next() //undefined when done it’s true
{ value: undefined, done: true }
```

## 🤦🏻‍ Being an Iterable and the Iterable protocol, what!?

First of all let's start with the basics: **What are iterables?**
There are some types of `objects` built-in in JavaScript that by default are  `iterables` which means that those objects have an `iterator` accessible via the [Symbol.iterator] property.

**⁉️ Since not all objects are iterables, which ones are?**
* Arrays and other array-like objects like `arguments`
* Strings
* Maps
* Sets

**🔂 What about the iterable protocol?**
ES2015 added the iterable protocol to the language. It simply allows `iterable` objects the ability to customize their iteration behavior, this can be achieved using the new `for ..of` loop.

Basic example of the **for of** loop:
```js
const myIterable = [1, 2, 3, 4, 5];

for (let number of myIterable) {
  number *= 2
  console.log(`The double of the current number is: ${number}`)
}
```
Now you know **why** this new kind of loop works it Arrays, since ES2015 Arrays are built-in iterables in JavaScript they are part of the new `iterable` protocol as well.

**But… where is the customization part of it?**
😎 Glad you asked! Insert cool customization example:
```js
const avengers = ['Tony Stark', 'Steve Rogers', 'Bruce Banner', 'Peter Parker'];

for (const [index, name] of Object.entries(avengers)) {
  console.log(`${name} has position ${index} in the array.`);
}
// Tony Stark has position 0 in the array.
// Steve Rogers has position 1 in the array.
// Bruce Banner has position 2 in the array.
// Peter Parker has position 3 in the array.
```

I don't know about you but I really love that pattern. Let’s break the code down:
The first thing that you may notice is that we are **destructuring** the index the value (name) from the result of calling Object.entries from our **avengers array**.
Why can we able to do this? Simple, Arrays are objects in JavaScript that's why we can use Object.entries on them and the result will be an array of arrays of the key value pairs, in this case the index and the element's value:

```js
Object.entries(avengers);
// [ ["0", "Tony Stark"],["1", "Steve Rogers"],["2", "Bruce Banner"],["3", "Peter Parker"] ]
```

By this point you already know that we can’t use the **for of** loops in regular objects since they are not iterables.
But, we can do a little trick to change that:

```js
const fer = {
  twitter: '@fermaddev',
  loves: 'Reading',
  hates: 'Not sleeping enough'
}

for (const prop of Object.keys(fer)) {
  const value = fer[prop];
  console.log(prop, value);
}

// twitter @fermaddev
// loves Reading
// hates Not sleeping enough
```
You can reuse and change this pattern to use `Object.values` as well.

**🤔 Tell me more about the Iterator protocol**
The iterator protocol is how we are able to produce or get the sequence of values contain within any iterable object.
This sequence may be either finite or infinite meaning that we could potentially have a return value when all vales have been generated by calling the `.next( )` method:
```js
{ value: undefined done: true }
```

## 💆🏻‍ Back to iterators
Have you ever asked yourself how destructing works?

In case you guess it, yes it's functionally depends on `iterables`. Let’s try to replicate the same behavior of destructuring in the following example:

```js
const nums = [1, 2, 3, 4, 5];

const [first, second, , fourth, , sixth] = nums;
```
Quick tip: You can commit values when destructuring from an Array by skipping them with an empty space followed by a comma.

Now let's try to do it using `iterators`, we can start by instantiating one:

```js
const iterator = nums[Symbol.iterator]();
```

Like we mentioned before `Arrays` are iterables in JavaScript, so in this line of code we are accessing it’s **Symbol.iterator** property and **calling it** right away.

This may seem odd at first but this is the same as doing:

```js
nums['filter'](num => num > 2);
// [3, 4, 5, 6]
```
> Something to remember: The JavaScript Array object is a global object that is used in the construction of arrays; which are high-level, list-like objects.

Now that we have our **iterator** let's invoke it's **.next( )** method and start capturing the values that we want in variables.
```js
const nums = [1, 2, 3, 4, 5];
const iterator = nums[Symbol.iterator]();

const one = iterator.next().value

iterator.next() //skip number 2
{value: 2, done: false} //return value

iterator.next() //skip number 3
{value: 3, done: false}

const four = iterator.next().value

iterator.next() //skip number 5
{value: 5, done: false}

const six = iterator.next().value
```

We are only storing the values that we care about and skipping the ones we don’t by simply calling the next method and "exhausting" that specific value.

**What do we have left?**
```js
iterator.next()
// {value: undefined, done: true}

iterator.next().value
// undefined

iterator.next()
// {value: undefined, done: true}
```
No matter how many times you keep calling `iterator.next( )` it will return the same. As you can notice it’s `done` properties value is now `true`, that means that we have exhausted all values available so there are no more elements to iterate over.

A quick reminder, this is why you can only use an iterator only **once**, because once you exhausted all of its values, they can't be accessed again.

This is a perfect example that allows us to understand how `iterators` work on a very basic level, as well on how they are implemented “under the hood” to compose features like destructuring.

**We can do the same thing with strings**
Because `Strings` are iterables as well, now we can create arrays of strings without calling the `.split( )` method:

```js
const name = 'Fernando';

const nameArr = [...name];
// [“F", "e", "r", "n", "a", "n", "d", "o"]
```

Again we can replicate this behavior using iterators:
```js
const name = 'Fernando';

const iterator = name[Symbol.iterator]();

const nameArr = [iterator.next().value]
// ['F’]

let nextValue = iterator.next()

while (!nextValue.done) {
  nameArr.push(nextValue.value)
  nextValue = iterator.next()
}

console.log(nameArr)
// ["F", "e", "r", "n", "a", "n", "d", "o"]
```
At this point, you should be able to understand why and how this code works 😬.

I really hope you enjoyed learning about these new features of JavaScript, which I personally think are foundational topics that may solidify your understanding of the language overall and help you understand other more complex features.

Happy hacking! 👻

Learn more about how iterators and iterables [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Built-in_iterables).
