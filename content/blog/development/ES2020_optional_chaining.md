---
title: "⛓️ ES2020: Optional chaining"
date: 2020-02-24 07:21:32
category: "development"
---


If you like clean, readable, simple code, probably you are tired of doing of writing lines of code like this one:
```js
data.account && data.account.users && data.account.users.admins
```

What if you could express the same behavior like this:
```js
data.account?.users?.admins?
```
Welcome optional chaining to ES2020 🎉!

The goal of this post is to get you up to speed with understanding and using the optional chaining operator, which will come to the language in the new release of ES2020.

We’ll cover the following:

* Concept definition
* Basic usage (Stacking)
* Optional methods - ?.( )
* Dynamic property access - ?.[ ]
* Start using it today!

##❔Concept definition

The optional chaining operator `?.` allow you to access or read a value of a property located deep within a chain of connected objects, without the need of validating that every reference of the chain is valid.

If any of the properties in the `chain` is null or undefined, the expression short-circuits with a return value of `undefined` instead of throwing an error.
Same thing will happen with `functions`, if you invoke a function that is not available it will still return undefined.

This results in shorter and simpler expressions when accessing chained properties when the possibility exists that a reference may be missing. It can also be helpful while exploring the content of an object when there's no known guarantee as to which properties are required.

## 📚Basic usage (Stacking)

When you have nested structures it is possible to use the optional chaining operator multiple times, this is referred as `stacking`.

Let’s take a look to a simple yet common example to better understand how to use the optional chaining operator.

If you are dealing with a response where you know that you may or may not have a user coming back, but if you do then you want to get the user’s name.

```js
const goodResponse = {
  meta: {
    pages: 1
  },
  users: {
    admin: {
      id: 'jh342351fs',
      name: 'Fernando'
    }
  }
}

const badResponse = {
  meta: {
    pages: 0
  },
  users: undefined
}

const unsafePasses = goofResponse.users.admin.name
// ‘Fernando'

const unsafeFails = badResponse.users.admin.name
// Uncaught TypeError: Cannot read property 'name' of undefined
```

Let’s fix the above implementation:
```js
const safe = badResponse.users && badResponse.users.admin && badResponse.users.admin.name
// undefined
```

Now let’s refactor to use the optional chaining operator:
```js
const safe = badResponse.users?.admin?.name?
// undefined
```
Cleaner, shorter, less repeated code, less typing (less typos), much more simpler isn’t it 😉.

## 🔗 Optional methods - ?.( )
Additionally to the optional chaining operator `?.`  the new syntax will include another operator  `?.( )` to optionally call methods that may or may not be present.

This feature will make it so much easier access methods avoiding errors when using API’s where methods are either deprecated or not available yet because either because async loading or failure in the request of external CDN's.

Before 😔:
```js
window.stripe && window.stripe.createToken && window.stripe.createToken(element, tokenInfo)
```

Now 🎉:
```js
window.stripe?.createToken?.(element, tokenInfo)
```

If the method is not present the expression will automatically return `undefined` instead of throwing an exception if the method isn’t found.

Another example were this feature shines is when dealing with optional callbacks that might exist or not.
Error handling can be a very common use case when using optional callbacks to execute on a fetch request:

```js
function fetchData(onSuccess, onError) {
  try {
    // fetch some data...
    onSuccess?.(data)
  } catch(err) {
    onError?.(err.message)
  }
}
```

## 🧪 Dynamic property access - .?[ ]

Whenever you have to dynamically access a property of an object (from an object that may or may not exist) using the `?.[ ]` operator is a safe way to ensure that our application won’t throw an error.
It will return the value referenced in the object using the variable in the brackets or `undefined` if the object (or any nested object in the expression) does not exist.

Let’s create a very basic getter function to illustrate this, let’s pretend that we only have admin users for this account and no super admins.

```js
function getUsersByCategory(data, category) {
  return data?.users?.[category]
}

const admins = getUsersByCategory(data, ‘admins’);
// returns all the admins

const superAdmins = getUsersByCategory(data, ’super_admins’);
// returns undefined since we do not have any super admins yet
```

##⌛️ Start using it today
It is very easy to start using it now since [version v3.3.0](https://github.com/facebook/create-react-app/releases/tag/v3.3.0) of create react app supports this new feature of the language.
If you already have a create-react app project you can update react-scripts@3.3.0 in order to get this benefits.
Finally if you are a TypeScript fan, [version 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html) also supports optional chaining.

Hope you enjoyed reading, Happy hacking! 👻

##### Learn more about [ES2019 features](https://madd.dev/development/ES2019_features_you_can_use_now/) that you can start using now!
