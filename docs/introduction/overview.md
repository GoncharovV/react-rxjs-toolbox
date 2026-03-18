---
sidebar_position: 2
---

# Overview

## `useObservable`

Used to read observable values inside React components

```tsx
import { useObservable } from 'react-rxjs-toolbox';
import { interval } from 'rxjs'

// any observable
const observable$ = interval(1000)

const Component = () => {
  // use value of observable
  const value = useObservable(observable$);
  // value: number | undefined

  // pass default value
  const value = useObservable(observable$, 0); 
  // value: number
}
```

## `useObservableState`

Used with `BehaviorSubject` for useState-like manipulations

```tsx
import { useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

// any observable
const search$ = new BehaviorSubject('')

const Component = () => {
  const [search, setSearch] = useObservableState(search$)

  setSearch('14')
  // or pass updater function
  setSearch(current => current.toLowerCase())
}
```

## `useSubscription`

```tsx
const search$ = new BehaviorSubject('')

const Component = () => {
  // short form (only next)
  useSubscription(search$, (search) => console.log(search))

  // all callbacks
  useSubscription(search$, {
    next: (search) => console.log('next': search),
    complete: () => console.log('complete'),
    error: (err) => console.log('error', err),
  })
}
```

## `useDerivedValue`

```tsx
const search$ = new BehaviorSubject('search')

const Component = () => {

  const upper = useDerivedValue(search$, (search) => search.toUpperCase())

  // ================================   

  const [count, increment] = useReducer((count) => count + 1, 0)

  // This will updates only when new observable value is emitted
  // producer function with actual `count` will be used
  const searchWithCount = useDerivedValue(search$, (search) => {
    return search + " " + count
  })
}
```

:::warning
Derived value **WILL ONLY** be updated when new observable value is emitted.  
Changing the producer function **will not** affect derived value immediately.
:::


## `useDistinctDerivedValue`

The same as `useDerivedValue` but with `distinctUntilChanged` rxjs operator.

```tsx
const search$ = new BehaviorSubject('')

const Component = () => {
  const length = useDerivedValue(search$, (search) => search.length)

  // @example
  // search$.next('123') => new value (3) will be emitted
  // search$.next('1234') => new value (4) will be emitted
  // search$.next('4321') => new value WILL NOT be emitted. 
  // Length did not change.
}
```
