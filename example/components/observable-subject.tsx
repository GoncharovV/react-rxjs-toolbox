import React, { FC, useReducer, useState } from 'react';
import { Subject } from 'rxjs';
import { HStack, VStack } from '@goncharovv/layout';

import { useObservable } from '../../src';


export const ObservableSubject = () => {
  const [key, increment] = useReducer((key) => key + 1, 0);

  // reset whole internal value by updating key and remounting component as new

  return (
    <InternalContainer key={key} onReset={increment} />
  );
};

const InternalContainer: FC<{ onReset: () => void; }> = ({ onReset }) => {
  const [subject$] = useState(() => new Subject<string>());
  const [count, increment] = useReducer((count) => count + 1, 0);
  const [listeners, addListener] = useReducer((listeners, listener) => [...listeners, listener], [{}]);

  const emitNext = () => {
    increment();

    subject$.next(`${count}`);
  };

  return (
    <VStack spacing="medium-m" centered>
      <HStack spacing="medium-m" centered>
        <button type="button" onClick={emitNext}>emit next</button>

        <button type="button" onClick={() => addListener({ })}>add listener</button>
      </HStack>

      <HStack
        spacing="medium-m"
        centered
        wrap
        style={{ maxWidth: 900 }}
      >
        {listeners.map((_, index) => (
          <Listener key={index} subject$={subject$} />
        ))}
      </HStack>

      <button type="button" onClick={onReset} style={{ width: 'fit-content' }}>reset</button>
    </VStack>
  );
};

const Listener: FC<{ subject$: Subject<string>; }> = ({ subject$ }) => {
  const value = useObservable(subject$, 'not emitted yet');

  return (
    <VStack
      centered
      width={200}
      height={200}
      style={{ border: '1px dashed coral' }}
    >
      <p>{value}</p>
    </VStack>
  );
};
