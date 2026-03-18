import { useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, map } from 'rxjs';

import { useDistinctObservable } from '../../../src';
import { useRendersCount } from './hooks';
import { Frame, HStack, Input, Text, VStack } from './ui';


const search$ = new BehaviorSubject<string>('');

const isLongSearch$ = search$.pipe(
  map((search) => search.length > 5),
);

isLongSearch$.subscribe(console.log);

export const DistinctObservableDemo = () => {
  return (
    <Frame>
      <VStack>
        <SearchContainer />

        <GeneralInfo />

        <DistinctInfo />
      </VStack>
    </Frame>
  );
};

export const SearchContainer = () => {
  const [search, setSearch] = useObservableState(search$);

  return (
    <Frame>
      <HStack>
        <Input value={search} onChange={setSearch} />
      </HStack>
    </Frame>
  );
};

export const GeneralInfo = () => {
  const isLong = useObservable(isLongSearch$);

  const count = useRendersCount();

  return (
    <HStack>
      <Text>isLongSearch: {String(isLong)}</Text>

      <Text>Renders Count: {count} (Observable)</Text>
    </HStack>
  );
};

export const DistinctInfo = () => {
  const isLong = useDistinctObservable(isLongSearch$);

  const count = useRendersCount();

  return (
    <HStack>
      <Text>isLongSearch: {String(isLong)}</Text>

      <Text>Renders Count: {count} (Distinct Observable)</Text>
    </HStack>
  );
};
