---
sidebar_position: 6
---

# useDistinctObservable 🚧

:::danger
Experimental
:::

```tsx
import { useDistinctObservable, useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, map } from 'rxjs';

import { useRendersCount } from './hooks';


const search$ = new BehaviorSubject<string>('');

const filters$ = search$.pipe(
  map((search) => ({ active: search.length > 5 })),
);

export const DistinctObservableDemo = () => {
  return <>
    <SearchContainer />

    <GeneralInfo />

    <DistinctInfo />
  </>
};

export const SearchContainer = () => {
  const [search, setSearch] = useObservableState(search$);

  return <Input value={search} onChange={setSearch} />
};

export const GeneralInfo = () => {
  const filters = useObservable(filters$);

  return <Text>Active: {String(filters?.active)}</Text>
};

export const DistinctInfo = () => {
  const filters = useDistinctObservable(filters$, undefined, (a, b) => a.active === b.active);

  return <Text>Active: {String(filters?.active)}</Text>
};

```

import { DistinctObservableDemo } from '@site/docs-src/components/demos/distinct-observable-demo';

<DistinctObservableDemo />

