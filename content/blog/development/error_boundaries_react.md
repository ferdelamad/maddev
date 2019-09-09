---
title: '❌ Error Boundaries in React'
date: 2019-09-09 07:23:49
category: 'development'
---

Among all of the new and great features that React has introduced since version 16, the concept of error boundaries could improve both our developer and user experience when handling errors of our React applications.
I’m pretty sure that most developers are familiar with this wonderful JavaScript error:

```text
Cannot read property ‘length' of undefined
// or
Cannot read property ‘full_name' of null
```

These types of errors are usually caused by an earlier error in our app before React 16 did not provide a way to handle them in our components. Also, These errors could be hard to debug and if not handled properly could potentially break parts of our application. Having these errors present in some parts of our UI should not break entire sections or even the whole application.
That's why React 16 introduced the concept of having error boundary components.

## 🚫 Breaking the concept down
Think about **error boundaries** like high-order components that wrap all its children in a **try-catch** block.
The component will try to render any given children and if it catches  an error during a life-cycle method or render, the error will “bubble up” causing two side effects:
* The Error boundary component will display the provided fallback UI
* React will unmount the whole component tree, meaning that if the Error boundary component is wrapping 3 independent components, and only of them throws an error, it will unmount all 3 of them.

## ⚠️ What’s unique about an Error Boundary component?
First of all, an EB component must be a class-based component, which will have two unique life-cycle methods:
* static getDerivedStateFromError: takes an error as a parameter and can return a new state object.
* componentDidCatch: takes two parameters, `error` which contains the error message and `errorInfo` which has one property  `componentStack`, you can use errorInfo.componentStack to inspect the stack trace that caused the error!

Let’s look at a simple example:

```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    //return the new state to trigger a re-render with the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    //log the catched error and save the errorInfo in the state
    this.setState({ errorInfo })
    console.warn(error)
  }

  render() {
    const { state: { hasError, errorInfo }, props: { children } } = this
    if (hasError && errorInfo) {
      return (
        <>
         <p>
           Ooops, something happened please try again
           <br/><br/>
           <details style={{ whiteSpace: 'pre-wrap' }}>{errorInfo.componentStack}</details>
         </p>
        </>
      )
    }
    return children
  }
}
```

For demonstration purposes, I’m using both methods, but that doesn’t mean that need to use both, to build an EB component and handle the error properly.
In this simple EB, `getDerivedStateFromError`  is being used to update the state in case of an error. Finally `componentDidCatch` in case of catching an error it will report it to a third party provider like sentry, as well as logging the error.

Now, how do we use it 🤔?

Simply wrap the desired children components with EB component:
```jsx
<>
  // first set
  <ErrorBoundary>
    <CustomerForm />
  </ErrorBoundary>

  // second set
  <ErrorBoundary>
    <ProviderWidget />
    <CustomAnimation />
    <AnalyticsInfo />
  </ErrorBoundary>
</>
```

EB components are meant to be reused through your application, notice how it’s being reused here to `wrap` two different sets of components.
Something to consider here is that if the `CustomerForm` causes an error when rendering or in any of its lifecycle methods (I’m repeating **when** EB would be triggered so you get used to it), this component will be unmounted and EB will display the fallback UI that we previously defined.

On the other hand if and error happens on any component of the second set, the **complete component tree** will be unmounted meaning that `ProviderWidget`, `CustomAnimation` and `AnalyticsInfo` will disappear and only the fallback UI would be rendered.
This means you have to be very thoughtful on your error handling strategy using error boundaries.

The complete source code this example is available **[here](https://github.com/ferdelamad/blog-examples/tree/master/src/ErrorBounderies/Example01)** 👀.
I strongly suggest to play a little bit with this example and get your hands dirty, that’s always the best way to learn
> Something to remember: error boundaries can only catch errors within its children, NOT errors that happened within itself.

## 🙄 So, how do I use EB?
There is not best practiced on how to use, so basically is up to you. Some parts of your applications will work even if some components cause an `error`, so you should definitely avoid wrapping a large tree of components.

My advice is to balance the use of **error boundaries** between wrapping groups of components that you have already identify have a higher potential of causing an error, a very good example for this is wrapping top-level routes components to display a fallback UI like: `Oops, something happened please try again`.

On the other hand, you individually wrap components in case of an error you do not want to display them anymore, a great example of this can be third party widgets.

## 🐛 What errors can’t be caught?
EB are not meant to catch every type of error. React docs are very specific and straight forward on the different scenarios where EB won’t catch the error:
* Event handlers
* Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
* Server side rendering
* Errors thrown in the error boundary itself (rather than its children)

## 👣 Taking it one step forward
Probably you saw that I’ve being using class based components so far, but EB can also wrap regular functional components, meaning you can use React **hooks** with them 😎.

Let’s try catching an error with error boundaries using hooks:
```jsx
// buggy hook
const useTryToCrashHook = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  const checkForBug = shouldCrash => {
    if (shouldCrash) {
      setShouldCrash(() => {
        throw new Error("Error!");
      });
    }
  };

  useEffect(() => {
    checkForBug(shouldCrash);
  }, [shouldCrash]);

  return setShouldCrash;
}


// page to render
const Page = () => {
  const hasBug = useTryToCrashHook();
  return (
    <button onClick={() => hasBug(true)}>Crash me!</button>
  );
}

// our error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    return this.state.error ? <p>Ooops, something happened please try again!</p> : <Page />
  }
}
```

Now you know that you can also integrate EB with hooks in your React application.
You can find the source code for this example **[here](https://github.com/ferdelamad/blog-examples/blob/master/src/ErrorBoundaries/Example02/index.js)** 👀.

That’s it! I hope you enjoyed learning this new concept of how to handle JavaScript error inside of our React components.

Happy hacking! 👻

Lear more about [React Hooks](https://madd.dev/development/introduction_react_hooks_usestate/).
Learn more about what’s new on [React v16.0](https://reactjs.org/blog/2017/09/26/react-v16.0.html).
