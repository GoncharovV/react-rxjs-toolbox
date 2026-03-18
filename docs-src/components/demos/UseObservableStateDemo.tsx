import { useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, map } from 'rxjs';

import { DemoFrame } from './DemoFrame';

const text$ = new BehaviorSubject<string>('');
const upper$ = text$.pipe(map((t) => t.toUpperCase()));

const TextInput = () => {
  const [text, setText] = useObservableState(text$);

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something..."
      style={{ fontSize: '1rem', padding: '4px 8px' }}
    />
  );
};

const Preview = () => {
  const upper = useObservable(upper$, '');

  return <p style={{ margin: 0 }}>Uppercase: <strong>{upper}</strong></p>;
};

export const UseObservableStateDemo = () => (
  <DemoFrame>
    <TextInput />
    <Preview />
  </DemoFrame>
);
