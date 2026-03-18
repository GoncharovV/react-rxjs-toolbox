import { useState } from 'react';
import { useDerivedValue, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

import { DemoFrame } from './DemoFrame';
import { HStack, Input, Text, VStack } from './ui';


const text$ = new BehaviorSubject<string>('hello');

export const DerivedValueDemo = () => {
  const [text, setText] = useObservableState(text$);
  const [reactText, setReactText] = useState('react');

  const result = useDerivedValue(text$, (storeText) => {
    return `Store: ${storeText} & React State: ${reactText}`;
  });

  return (
    <DemoFrame>
      <VStack>
        <HStack>
          <Text>Store</Text>

          <Input
            value={text}
            onChange={setText}
            placeholder="Type something..."
          />
        </HStack>

        <HStack>
          <Text>React</Text>

          <Input
            value={reactText}
            onChange={setReactText}
            placeholder="Type something..."
          />
        </HStack>

        <Text>Result: {result}</Text>
      </VStack>
    </DemoFrame>
  );
};
