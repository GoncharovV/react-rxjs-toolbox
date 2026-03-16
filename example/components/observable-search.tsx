import { FC, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { HStack, VStack } from '@goncharovv/layout';

// TODO: import from dist
import { useObservable, useObservableState } from '../../src';
import { useDerivedValue } from '../../src/use-derived-value';


export const ObservableSearch: FC = () => {
  const [search$] = useState(() => new BehaviorSubject<string>(''));

  return (
    <HStack spacing="medium-m" align="center">
      <SearchInput search$={search$} />

      <SearchPreview search$={search$} />
    </HStack>
  );
};

const SearchInput: FC<{ search$: BehaviorSubject<string>; }> = ({ search$ }) => {
  const [search, setSearch] = useObservableState(search$);

  return (
    <VStack spacing="small-s" centered>
      <p>Search</p>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
    </VStack>
  );
};


const SearchPreview: FC<{ search$: BehaviorSubject<string>; }> = ({ search$ }) => {
  const search = useObservable(search$, search$.value);

  return (
    <VStack
      spacing="small-l"
      centered
      style={{ border: '1px dashed coral' }}
      p="small-s"
      width={300}
      height={300}
    >
      <p>Search Preview</p>

      <h3>{search}</h3>

      <SearchLength search$={search$} />
    </VStack>
  );
};

const SearchLength: FC<{ search$: BehaviorSubject<string>; }> = ({ search$ }) => {
  const length = useDerivedValue(search$, (search) => search.length);

  return (
    <VStack spacing="small-s" centered>
      <p>Search Length (derived): {length}</p>
    </VStack>
  );
};
