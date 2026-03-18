import { useState } from 'react';
import { useObservable } from 'react-rxjs-toolbox';
import { interval } from 'rxjs';

import { DemoFrame } from './DemoFrame';

const ticker$ = interval(1000);

const TickerDisplay = () => {
  const value = useObservable(ticker$);

  return <p style={{ fontSize: '1.25rem', margin: 0 }}>Ticks: <strong>{value ?? '—'}</strong></p>;
};

export const UseObservableDemo = () => {
  const [mounted, setMounted] = useState(true);

  return (
    <DemoFrame>
      <button type="button" onClick={() => setMounted((v) => !v)}>
        {mounted ? 'Unmount' : 'Mount'}
      </button>

      {mounted && <TickerDisplay />}
    </DemoFrame>
  );
};
