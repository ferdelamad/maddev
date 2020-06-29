---
title: '🐺 TypeScript Generics explained with pets'
date: 2020-06-28 13:58:32
category: 'development'
---

### What is a generic type?

Generic types in TypeScript give the developer more flexibility to create reusable components that can work over a **different variety** of types rather than a **single one**.

Think about generics as a type that you can **specify** when declaring a type, this will change what the end type looks like.

One of the most basic representation of a generic type in TypeScript is an array:

```tsx
type NumArray = Array<number>;
```

Generic is any type that you specify inside the angle brackets <>.

### How is this helpful?

Image you need a function to get the **last** element of an array of numbers:

```tsx
const getLast = const getLast = (arr: Array<number>) => {
  return arr[arr.length - 1];
};

const lastNum = getLast([1, 2, 3]);
```

This will work, however how can you make this function work with strings as well?

With `generic types` of course!

Let's refactor our implementation:

```tsx
const getLast = <T>(arr: Array<T>) => {
  return arr[arr.length - 1];
};
```

In this case `T` stands for the **generic** type that can be passed to the function, that way we can specify the type of the input array when we call the function.

Now you can use `getLast` successfully with different kinds of arrays:

```tsx
const lastNum = getLast([1, 2, 3]);

const lastStr = getLast(['a', 'b', 'c']);
```

TypeScript is smart enough to **infer** the type of the array so you don't have to specify the generic type.

Let's use our `Pets` example to exemplify how you could specify the generic type:

```tsx
type Cat = {
  name: string;
  hasKittens: boolean;
  owner?: string;
};

type Dog = {
  name: string;
  hasPuppies: boolean;
  owner?: string;
};

const lastCat = getLast<Cat>([
  { name: 'Furry', hasKittens: false },
  { name: 'Oreo', hasKittens: true },
]);
// type Cat

const lastDog = getLast<Dog>([
  { name: 'Rambo', hasPuppies: true },
  { name: 'Rocky', hasPuppies: false },
]);
// type Dog
```

Now when ever you use the output of `getLast` you will actually have the correct type, in this case **lastCat** has the type of **Cat** and **lastDog** the type of **Dog**.

### Using more than one type

You are not constraint on the amount of types to use when adding a generic. If you want to create function that creates an **array** of two elements but you want to specify those types as well by just including them inside the angle brackets:

```tsx
const makePetArray = <A, B>(a: A, b: B): [A, B] => {
  return [a, b];
};
```

In this case the return type was specified as well in order to have tell TS that a **tuple** is the outcome of **makePetArray**.

Finally it can be implementing like this:

```tsx
const furry: Cat = { name: 'Furry', hasKittens: false };
const rocky: Dog = { name: 'Rocky', hasPuppies: false };

const dogAndCatArr = makePetArray<Dog, Cat>(rocky, furry);
// type [Dog, Cat]
```

### Using Default types

If you want to make the generic types optional, you can specify default values for them:

```tsx
const makePetArray = <A = Dog, B = Cat>(a: A, b: B): [A, B] => {
  return [a, b];
};
```

Now the implementation will be simpler:

```tsx
const dogAndCatArr = makePetArray(rocky, furry);
```

Usually the default value can be set to `any` if no type is specified.

### Extending Generic Types

Think about the word `extends` as a constraint of what the type should at least include. This helps to restrict an input.
Imagine if you want to add an owner to a **Pet**, then you want to make sure that the input is actually a **pet** in order to perform that operation.

In order to make this work for our **Pets** we will have to `extend` Dog or Cat to tell TS that the input of the our function has to be either a dog or a cat:

```tsx
const addOwner = <T extends Dog | Cat>(pet: T, owner: string): T => {
  return {
    ...pet,
    owner,
  };
};
```

Then we can simple add our owners:

```tsx
const ferDog = addOwner<Dog>(rocky, 'fernando');
// type Dog

const robCat = addOwner<Cat>(furry, 'Rob');
// type Cat
```

However if you try to add an owner to something that is **not** a pet, TS will get mad at you:

```tsx
const teddy = { name: 'teddy' };

const mikeDog = addOwner<Dog>(teddy, 'Mike'); ❌

// Property 'hasPuppies' is missing in type '{ name: string; }' but required in type 'Dog'
```

### Generics in Types

You can also use **generics** when declaring a **type**. This gives you the ability to create a base type and use generics to "create" different type variations. For me, this is very powerful and a great timesaver.

Let's create a new `Dog` type as a base type:

```tsx
type Dog<T> = {
  name: string;
  owner: string;
  info: T;
};
```

Now let's add the type variations:

```tsx
type GermanShepherd = Dog<'German shepherd'>;
type GoldenRetriever = Dog<'Golden retriever'>;
```

Finally let's implement the new types:

```tsx
const rambo: GermanShepherd = {
  name: 'Rambo',
  owner: 'fernando',
  info: 'German shepherd',
};

const max: GoldenRetriever = {
  name: 'Max',
  owner: 'Joe',
  info: 'Golden retriever',
};
```

If you try to assign something different to `info` , TS will tell you that is not allowed:

```tsx
const fluffy: GermanShepherd = {
  name: 'Rambo',
  owner: 'fernando',
  info: 'Golden retriever' ❌
  // Type '"Golden retriever"' is not assignable to type '"German shepherd"'
};
```

You do not have to create new types every time, you can also declare the types when using the `Dog` type:

```tsx
const rambo: Dog<string> = {
  name: 'Rambo',
  owner: 'fernando',
  info: 'German shepherd',
};

const max: Dog<{ age: number; kind: string }> = {
  name: 'Max',
  owner: 'Joe',
  info: {
    age: 2,
    kind: 'Golden retriever',
  },
};
```

As you can see in this implementation, **info** can be a `string` or a `custom object` as well ❤️.

That's it for **Pets** and generics in TypeScript.

Read more about [TypeScript Utilities](https://madd.dev/development/typescript_utilities/).
Read more about [Type Guards in TypeScript](https://madd.dev/development/handling_union_types_with_type_guards/).

Happy hacking! 👻
