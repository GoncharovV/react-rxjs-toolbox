---
sidebar_position: 4
---

import { UseDerivedValueDemo } from '@site/docs-src/components/demos/UseDerivedValueDemo';

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
import { useDerivedValue, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

const text$ = new BehaviorSubject<string>('hello');

const Component = () => {
  const [text, setText] = useObservableState(text$);
  const reversed = useDerivedValue(text$, (v) => v.split('').reverse().join(''));

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Reversed: {reversed}</p>
    </div>
  );
};
```

## Live demo

<UseDerivedValueDemo />
