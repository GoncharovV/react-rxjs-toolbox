---
sidebar_position: 5
---

import { UseDistinctDerivedValueDemo } from '@site/docs-src/components/demos/UseDistinctDerivedValueDemo';

# useDistinctDerivedValue

Same as [`useDerivedValue`](./use-derived-value), but skips re-renders when the derived value hasn't changed (applies `distinctUntilChanged` internally).

## Signature

```ts
function useDistinctDerivedValue<T, D>(
  observable: Observable<T>,
  producer: (value: T) => D,
  comparator?: (a: D, b: D) => boolean,
): D | undefined;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `observable` | `Observable<T>` | The source observable. |
| `producer` | `(value: T) => D` | A function that transforms each emitted value. |
| `comparator` | `(a: D, b: D) => boolean` | *(optional)* Custom equality check. Defaults to `===`. |

## Returns

`D | undefined` — the latest distinct derived value.

## Example

```tsx
import { useDistinctDerivedValue } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

const search$ = new BehaviorSubject<string>('');

const SearchLength = () => {
  const length = useDistinctDerivedValue(search$, (s) => s.length);
  // only re-renders when the length actually changes

  return <p>Length: {length}</p>;
};
```

## Live demo

Type different text with the same length — notice that `useDistinctDerivedValue` doesn't re-render while `useDerivedValue` does.

<UseDistinctDerivedValueDemo />
