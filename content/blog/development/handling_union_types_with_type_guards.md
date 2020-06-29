---
title: "🐕 Handling Union Types with Type Guards in TypeScript"
date: 2020-06-14 13:06:12
category: "development"
---

This is going to be a quick post that hopefully will safe you some time and headaches.
One thing that I struggled when I started to use TypeScript was dealing with Union types.

Unions can be very helpful when dealing with data that might change depending on different scenarios or unreliable data from any API.

It can be tricky to get them right in TypeScript, but **Type Guards** are here to make the use of Unions smooth and easy.
Be definition a Type Guard is just a helper method that checks if its argument is of some type.

We will use again **Pets**, like in the previous [TS Utilities article](https://madd.dev/development/typescript_utilities/), to illustrate this, because who doesn't love pets?

```tsx
type Cat = {
  name: string;
  hasKittens: boolean;
  meow: () => void;
};

type Dog = {
  name: string;
  hasPuppies: boolean;
  bark: () => void;
};

type Pet = Cat | Dog;
```

Both `Cat` and `Dog` are very similar, but they have different hold different properties.

In order to *tell* TypeScript when the type is actually a Cat or Dog we will need our Type Guard , in order to define a type guard, we will need to define a function that returns a `type predicate`:

```tsx
function isDog(kind: Pet): kind is Dog {
  return (type as any).bark !== undefined;
}
```

### Enter the 'is' operator

In our `isDog` function the type predicate is `kind is Dog`. This is basically stating `parameterName is Type`.

Bottom line the purpose of our function is to test that our argument `kind` is of type `Dog` .

How doest this works?

By returning a `boolean` we are *telling* TypeScript whether or not we have a type of Dog. Returning `true` means that in fact we have a `Dog`.

This becomes helpful when you have to deal with either a `Cat` or a `Dog`:

```tsx
function usePet(pet: Pet) {
  if (isDog(pet)) {
    pet.bark();
  } else {
    pet.meow();
  }
}
```

Because we are using `isDog` in the if block, TypeScript *knows* it's dealing with a Dog inside that block.
That's why calling **pet.bark** is not giving us an error, but trying to call **pet.meow** in the same block would.

Now we can confidently use our function:

```tsx
const Husky: Pet = {
  name: "Rocky",
  hasPuppies: false,
  bark: () => console.log("woof!"),
};

const Persian: Pet = {
  name: "Blacky",
  hasKittens: true,
  meow: () => console.log("grrr!"),
};

usePet(Husky);
// "woof!"
usePet(Persian);
// "grrr!"
```

You can play with the full version of the code **[here](https://codesandbox.io/s/type-guards-gg0lk?file=/src/index.ts)**.

Happy hacking! 👻
