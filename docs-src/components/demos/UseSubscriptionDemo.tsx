import { useReducer } from 'react';
import { useSubscription } from 'react-rxjs-toolbox';
import { Subject } from 'rxjs';

import { DemoFrame } from './DemoFrame';


const click$ = new Subject<string>();

const Logger = () => {
  const [logs, addLog] = useReducer(
    (prev: string[], msg: string) => [...prev, msg],
    [],
  );

  useSubscription(click$, (value) => {
    addLog(`Received: ${value}`);
  });

  return (
    <div>
      <p style={{ margin: '0 0 8px' }}>Log ({logs.length} events):</p>

      <ul style={{ margin: 0, maxHeight: 120, overflow: 'auto' }}>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export const UseSubscriptionDemo = () => {
  const [counter, increment] = useReducer((c: number) => c + 1, 0);

  const emit = () => {
    increment();
    click$.next(`click #${counter + 1}`);
  };

  return (
    <DemoFrame>
      <button type="button" onClick={emit}>Emit value</button>

      <Logger />
    </DemoFrame>
  );
};
