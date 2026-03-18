import { useRef } from 'react';


export function useRendersCount() {
  const ref = useRef(0);
  ref.current++;
  return ref.current;
}
