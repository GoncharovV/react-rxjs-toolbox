import { useObservable } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

import { Button, Frame, HStack, Text } from './ui';


const count$ = new BehaviorSubject<number>(0);

const increment = () => {
  count$.next(count$.value + 1);
};

export const ObservableDemo = () => {
  const count = useObservable(count$);

  return (
    <Frame>
      <HStack>
        <Button onClick={increment}>Increment</Button>

        <Text>Count: {count}</Text>
      </HStack>
    </Frame>
  );
};
