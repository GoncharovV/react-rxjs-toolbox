import React from 'react';
import { BehaviorSubject, map } from 'rxjs';

import { useDistinctObservable, useObservableState } from '../../src';
import { Input } from './ui/input';


const text$ = new BehaviorSubject<string>('');

const isLongText$ = text$.pipe(
  map((text) => text.length > 10),
);

export const DistinctObservable = () => {
  const [text, setText] = useObservableState(text$);


  return (
    <div>
      <h1>Distinct Observable</h1>

      <Input
        value={text}
        onChange={setText}
        placeholder="Text..."
      />

      <LongValueContainer />
    </div>
  );
};

const LongValueContainer = React.memo(() => {
  const isLongText = useDistinctObservable(isLongText$, undefined, (a, b) => a === b);

  return (
    <div>
      <p>Is more 10 symbols: {isLongText ? 'Yes' : 'No'}</p>
    </div>
  );
});
