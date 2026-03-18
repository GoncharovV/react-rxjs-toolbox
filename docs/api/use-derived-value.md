---
sidebar_position: 4
---



# useDerivedValue

Subscribes to an observable and returns a derived (mapped) value. Equivalent to `observable.pipe(map(producer))` inside a component.

## Signature

```ts
function useDerivedValue<T, D>(
  observable: Observable<T>,
  producer: (value: T) => D,
): D | undefined;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `observable` | `Observable<T>` | The source observable. |
| `producer` | `(value: T) => D` | A function that transforms each emitted value. |

## Returns

`D | undefined` — the latest derived value, or `undefined` before the first emission.

:::warning
The derived value is **only** updated when the observable emits. Changing the `producer` function alone will not trigger an update.
:::

## Example

```tsx
import { useState } from 'react';
import { useDerivedValue, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

const text$ = new BehaviorSubject<string>('hello');

const Component = () => {
  const [text, setText] = useObservableState(text$);
  const [reactText, setReactText] = useState('react');

  const result = useDerivedValue(text$, (storeText) => {
    // this is uncommon to access react state inside producer
    // only for demonstration purposes.
    return `Store: ${storeText} & React State: ${reactText}`;
  });

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <input value={reactText} onChange={(e) => setReactText(e.target.value)} />

      <p>Result: {result}</p>
    </div>
  );
};
```

## Live demo

import { DerivedValueDemo } from '@site/docs-src/components/demos/derived-value-demo.tsx';

<DerivedValueDemo />
