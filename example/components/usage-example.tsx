import { createRoot } from 'react-dom/client';
import { useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, map } from 'rxjs';

import { Frame } from './ui/frame';
import { Input } from './ui/input';


const text$ = new BehaviorSubject<string>('');

const upperText$ = text$.pipe(
  map((search) => search.toUpperCase()),
);

const UsageExample = () => {
  const [text, setText] = useObservableState(text$);

  const upperText = useObservable(upperText$);

  return (
    <Frame>
      <Input
        value={text}
        onChange={setText}
        placeholder="Text..."
      />

      <p style={{ fontSize: '1.5rem' }}>Transformed: {upperText}</p>
    </Frame>
  );
};

export function renderUsageExample(element: Element) {
  createRoot(element).render(<UsageExample />);
}
