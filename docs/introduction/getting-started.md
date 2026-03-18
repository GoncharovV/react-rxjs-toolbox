---
sidebar_position: 1
---

# Getting Started

## Installation

:::info
You should have rxjs (and React) installed.

```bash
npm install rxjs
```
:::

### npm

```bash
npm install react-rxjs-toolbox
```

### yarn

```bash
yarn add react-rxjs-toolbox
```

### pnpm

```
pnpm add react-rxjs-toolbox
```


## Usage

Import hooks from `'react-rxjs-toolbox'`

```tsx
import { useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, map } from 'rxjs';

const text$ = new BehaviorSubject<string>('');

const upperText$ = text$.pipe(
  map((search) => search.toUpperCase()),
);

const UsageExample = () => {
  const [text, setText] = useObservableState(text$);

  const upperText = useObservable(upperText$);

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

      <p>result: {upperText}</p>
    </div>
  );
}
```
