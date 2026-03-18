import { useDerivedValue, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject } from 'rxjs';

import { DemoFrame } from './DemoFrame';

const text$ = new BehaviorSubject<string>('hello');

export const UseDerivedValueDemo = () => {
  const [text, setText] = useObservableState(text$);
  const reversed = useDerivedValue(text$, (v) => v.split('').reverse().join(''));

  return (
    <DemoFrame>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{ fontSize: '1rem', padding: '4px 8px' }}
      />

      <p style={{ margin: '8px 0 0' }}>Reversed: <strong>{reversed}</strong></p>
    </DemoFrame>
  );
};
