import { useDistinctObservable, useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, map } from 'rxjs';

import { useRendersCount } from './hooks';
import { Frame, HStack, Input, Text, VStack } from './ui';


const search$ = new BehaviorSubject<string>('');

const filters$ = search$.pipe(
  map((search) => ({ active: search.length > 5 })),
);


export const DistinctObservableDemo = () => {
  return (
    <Frame>
      <VStack>
        <SearchContainer />

        <Text>active – search.length {'>'} 5</Text>

        <GeneralInfo />

        <DistinctInfo />
      </VStack>
    </Frame>
  );
};

export const SearchContainer = () => {
  const [search, setSearch] = useObservableState(search$);

  return <Input value={search} onChange={setSearch} />;
};

export const GeneralInfo = () => {
  const filters = useObservable(filters$);

  const count = useRendersCount();

  return (
    <HStack>
      <Text>Active: {String(filters?.active)}</Text>

      <Text>Renders Count: {count} (Observable)</Text>
    </HStack>
  );
};

export const DistinctInfo = () => {
  const filters = useDistinctObservable(filters$, undefined, (a, b) => a.active === b.active);

  const count = useRendersCount();

  return (
    <HStack>
      <Text>Active: {String(filters?.active)}</Text>

      <Text>Renders Count: {count} (Distinct Observable)</Text>
    </HStack>
  );
};
