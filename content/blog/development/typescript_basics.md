---
title: "🍄 TypeScript Basics"
date: 2020-03-06 20:38:12
category: "development"
---

I wanted to learn TypeScript during 2019 and failed due to a lack of commitment. That’s why I’m starting 2020 with an actual plan on learning it and even better, implement it on my daily job so I can actually immerse myself in it.

As an additional goal I want to document my journey with TypeScript, this is why you might starting seeing more TS posts regularly.
Feel free to join me in my new adventure with TypeScript 🤓!

Having familiarity with JavaScript is a must to fully comprehend this article.

We’ll cover the following:

* Declarations
* Basic Types

## Declarations
First, let's start with how we implement TypeScript at it’s most basic level. Starting with types of declarations will give you a better sense of the whole picture when learning basic types (next topic).

### Declaring variables
```js
let greeting: string = 'Hello world!';
let isOpen: boolean = false;
let counter: number = 1;
```
That was pretty straightforward right?
Just by adding a simple `:` after the name of the variable, followed by the `type` you have declared a typed variable.

Now if you try to any of these assignments you will get a TypeScript error:
```js
  greeting = 123;
  // Type '123' is not assignable to type 'string'
  isOpen = 'true';
  //  Type '"true"' is not assignable to type 'boolean'
  counter = '4';
  //  Type '"true"' is not assignable to type 'boolean'
```
This is a very small taste of how TypeScript starts to improve your developer experience helping you catch bugs before you even run the code.

### Declaring functions

The overall logic when declaring functions is very similar to declaring variables.
There are only two places that you can add types to a regular JavaScript function:
* In its parameters
* After defining its parameters to specify a return type

```js
function greet(name: string): string {
  return `Hello 👋 ${name}!`;
}

function incrementByOne(count: number): number {
  return count + 1;
}

// optional return type
function add(a: number, b: number) {
  return a + b;
}
```

In function `greet` we add the type string to the name parameter, after we add another `:` to specify the return type of this function.
We do the exact same thing with `incrementByOne`.

But what about the function `add`?
TypeScript is smart enough to `infer` the return type of this function 🤯.

## Basic Types

### any
Any make’s TypeScript really easy to transition to. Using any means that something can be any kind of type:

```js
let notSure: any = true;
notSure = 'Maybe I’m a string 🤔'
notSure = 235
```

This is possible because we stated that way, notSure can hold `any` type without throwing an error.
Using `any` is a great way to slowly migrate an existing JavaScript application into TypeScript since you can decide to opt-in and opt-out of type checking.

The more that you invest in TypeScript, the less that you want to use `any`, mainly because this takes the benefit of type checking and all other perks that come with the language.

### void

Void is almost the opposite of  `any`, you can think of void as `the absence go having any type at all`.
Usually, you will just void mostly for functions that do not return a value.

```js
function greet(name: string): void {
  console.log(`Hi 👋 ${name}!`);
}
```
>> Note: functions that do not have a explicit return will return undefined, void can only represent undefined or null.

### never

The never type as stated in its name is used when something is never going to occur. This is probably a type that you will not be used on an everyday basis, so don’t worry too much about it, still is always good to know and be aware of the basic of a language.

A clear example of the type never is a function that executes a loop that will never end:
```js
function neverEnds( ) : never {
  while(true) console.log('I will never finish executing');
}
```
You may think that this is similar to `void`, but the main difference is that void can hold undefined or null as its value, while never can not have any value at all.

### boolean
Very straight forward, the value should be a boolean either true or false:
```js
let isOpen: boolean = true;
```

### number
Any value considerer as number in JavaScript is considerer a number in TypeScript as well:
```js
let decimal: number = 17;
let hex: number = 0xf01c;
```

### string
Strings have the same support as in JavaScript:
```js
let name: string = 'Fernando'
let doubleQuotes = "I'm loving 🥰 TypeScript"
```

### array
Arrays work the same as any variable declaration with a small difference, you have to include `[ ]`:
```js
let arrayOfNums: number[ ] = [1, 2, 3, 4];
let arrayOfStrings: string[ ] = ['hello', 'hola'];
```
There is another way of declaring arrays in TypeScript, using a generic array type:
```js
let nums: Array<Number> = [1, 2, 3, 4]
let strings: Array<String> = ['using', 'typescript', 'is', 'cool']
```
If you don’t know what are the types of the values that an array will hold, you can do something like this:
```js
let response: any[ ] = [ ];

response.push(17);
response.push(true);

// [17, true]
```

What if you actually know that an array will contain multiple types and you know those types 🤔…
```js
let arrayOfBoolsOrNums: (boolean | number)[ ] = [true, 17, 21, false, 128, 14, false];
```
This is called a `union` in TypeScript, don’t worry we will cover them later on.

### tuple - [ number, string ]

If you are not familiar with tuples in computer science terms in basically means an array of `two` elements. In TypeScript it’s a little bit more different, tuples are used to declare an array with a fixed number of typed elements. The elements can be of any type:

```js
// Basic example
const strNumTuple: [string, number] = ['😊', 1];

// Declare the tuple
let boolTuple: [boolean, boolean, boolean, boolean];

// Initialize it
boolTuple = [true, true, true, false];    // ✅
// Initialize it incorrectly
boolTuple = [true, true, true, 'false'];  // ❌
```

### union - number | string
We already cover unions briefly when we talked about the Array type. A simple way of thinking about `unions` is to think of them as a set of possibles types that value may have.
A common example of this can be a response from an API that you are not familiar with, maybe a field can be a `string` | string[ ]`.

```js
let response: string | string[ ] = await fetch( );

function addTwo(num: number): number | string {
  if (!num) {
    return "Sorry please provide a number!"
  }
  return num + 2;
}
```
The `|` vertical bar is used to separate each possible type that value can hold.

That's it for this post, I will cover more "advanced" TypeScript functionalities in the next one.

Happy hacking! 👻
