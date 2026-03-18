---
sidebar_position: 1
slug: /
---

# Getting Started

## Installation

:::info[Prerequisites]
You should have rxjs _(and React)_ installed.

```bash
npm install rxjs
```
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>
    ```bash
    npm install react-rxjs-toolbox
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    yarn add react-rxjs-toolbox
    ```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```
    pnpm add react-rxjs-toolbox
    ```
  </TabItem>
</Tabs>


## Usage

Import hooks from `'react-rxjs-toolbox'`

```tsx
// highlight-next-line
import { useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, map } from 'rxjs';

const text$ = new BehaviorSubject<string>('');

const upperText$ = text$.pipe(
  map((search) => search.toUpperCase()),
);

const UsageExample = () => {
  // highlight-next-line
  const [text, setText] = useObservableState(text$);

  // highlight-next-line
  const upperText = useObservable(upperText$);

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

      <p>result: {upperText}</p>
    </div>
  );
}
```
