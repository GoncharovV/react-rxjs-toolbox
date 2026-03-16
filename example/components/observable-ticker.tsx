import { FC, ReactNode, useState } from 'react';
import { interval, Observable } from 'rxjs';
import { HStack, Stack, VStack } from '@goncharovv/layout';

// TODO: import from dist
import { useObservable } from '../../src/use-observable';


export const ObservableTicker = (): ReactNode => {
  const [ticker] = useState(() => interval(1000));


  return (
    <VStack spacing="medium-m" align="center">
      <h2>Tickers</h2>

      <HStack spacing="large-l">
        <Frame ticker={ticker} />

        <Frame ticker={ticker} />
      </HStack>
    </VStack>
  );
};


const Frame: FC<{ ticker: Observable<number>; }> = ({ ticker }) => {
  const value = useObservable(ticker);

  return (
    <Stack
      centered
      width={300}
      height={300}
      style={{ border: '1px dashed coral' }}
    >
      <p>{value}</p>
    </Stack>
  );
};
