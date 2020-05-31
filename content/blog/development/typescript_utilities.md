---
title: "🐶 TypeScript Utilities explained with dogs"
date: 2020-05-30 17:37:46
category: "development"
---

TypeScript provides a set of utilities which you can use to create a `type` which is based on `another` type, this `new` type will be transform in some way.

Each utility provides a unique way of transforming a type.

In this post we will learn about the following ones (and some doggos 🐕too!):

- **Partial<T>**
- **Pick<T, K>**
- **Omit<T, K>**
- **Record<K, T>**

### 🦮 Partial<T>

Partial creates a type with all properties of `T` as optional properties.
This can be very handy in situations where you are constructing or updating an entity.
Let's illustrate the use of `partial` with an example:

```tsx
enum Kind {
  DOG,
  CAT
}

type Pet = {
  name: string
  kind: keyof typeof Kind
  hasOwner: boolean
};

const 🐶= {
  name: 'Bolt',
  kind: Kind.DOG,
  hasOwner: false
}
```

On a side note, `keyof typeof Kind` is equivalent to:

```tsx
type Kind = 'DOG' | 'CAT'
```

If you need a function to update pets but you also want to be sure that the used properties are valid for pets, the use of partial will ensure this:

```tsx
const updatePet = (properties: Partial<Pet>, pet: Pet) => {
  return {
    ...pet,
    ...properties
  }
};

updatePet({ hasOwner: true }, 🐶);
// ✅ { name: 'Bolt', kind: 'DOG', hasOwner: true }

updatePet({ hasPuppies: true }, 🐶);
// ❌ Argument of type '{ hasPuppies: boolean; }' is not assignable to parameter of type 'Partial<Pet>'.
```

### 🦮 Pick<T, K>

Pick creates a type by 'picking' a set of properties `K` from `T`.
Personally, this is one of TypeScript utilities that I use the most.
Let's create a Husky by picking what we need from Pet  🐶!

```tsx
type Husky = Pick<Pet, 'name' | 'hasOwner'>;

// new type { name: string, hasOwner: boolean }
```

If we wanted to pick and enhance a type we can use this nifty trick:

```tsx
type Husky = Pick<Pet, 'name' | 'hasOwner'> & {
  kind: Kind.DOG,
  breed: 'Husky',
  hasPuppies: boolean,
};
```

Now we can declare a typed husky:

```tsx
const 🐕: Husky = {
  name: 'Rocky',
  kind: Kind.DOG,
  hasOwner: true,
  breed: 'Husky',
  hasPuppies: true,
};
```

### 🦮 Omit<T, K>

Omit creates a type with all of the properties from `T` omitting  `K`.

An old dog usually can't have puppies anymore, let's create a type for old huskies 🐕:

```tsx

type OldHusky = Omit<Husky, 'hasPuppies'>;

const r🐾ster = {
  name: 'Rooster',
  kind: Kind.DOG,
  hasOwner: true,
  breed: 'Husky',
};
```

### 🦮 Record<K, T>

Creates a type with the properties `K` of type `T`.

You can think about Record like a map of types.

Enter more doggos 🐶example:

```tsx
type Dog = {
  name: string;
  hasOwner: boolean;
};

type Doggos = 'bolt' | 'rocky' | 'rooster';

const x: Record<Doggos, Dog> = {
  bolt: { name: 'bolt', hasOwner: true, }
  rocky: { name: 'rocky', hasOwner: true },
  rooster: { name: 'rooster', hasOwner: false },
};
```

That's it for dogs and utilities in TypeScript.
There are more utilities available for you in the language, these ones are the ones that I find myself using the most in TS projects.

Happy hacking! 👻
