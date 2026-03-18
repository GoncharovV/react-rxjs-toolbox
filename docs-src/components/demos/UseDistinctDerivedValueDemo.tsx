import { useRef } from 'react';
import { useDerivedValue, useDistinctDerivedValue, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

import { DemoFrame } from './DemoFrame';

const text$ = new BehaviorSubject<string>('hello');

const WithDistinct = () => {
  const length = useDistinctDerivedValue(text$, (v) => v.length);
  const renders = useRef(0);
  renders.current++;

  return (
    <p style={{ margin: 0 }}>
      <strong>useDistinctDerivedValue</strong> — length: {length}, renders: {renders.current}
    </p>
  );
};

const WithoutDistinct = () => {
  const length = useDerivedValue(text$, (v) => v.length);
  const renders = useRef(0);
  renders.current++;

  return (
    <p style={{ margin: 0 }}>
      <strong>useDerivedValue</strong> — length: {length}, renders: {renders.current}
    </p>
  );
};

export const UseDistinctDerivedValueDemo = () => {
  const [text, setText] = useObservableState(text$);

  return (
    <DemoFrame>
      <p style={{ margin: '0 0 8px', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)' }}>
        Type text with the same length — notice the render count difference.
      </p>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{ fontSize: '1rem', padding: '4px 8px' }}
      />

      <div style={{ marginTop: 8 }}>
        <WithDistinct />
        <WithoutDistinct />
      </div>
    </DemoFrame>
  );
};
